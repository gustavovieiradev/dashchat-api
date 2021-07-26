import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RoleInterceptor } from '../../../shared/interceptors/role.interceptor';
import { UserService } from '../services/user.service';
import { Guid } from 'guid-typescript';
import { AuthenticateDto } from '../dtos/authenticate.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResultadoDto } from '../../../shared/dtos/resultado.dto';
import { JwtAuthGuard } from '../../../shared/guards/auth.guatd';

@ApiTags('Segurança')
@Controller('users')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  async post(@Body() model: CreateUserDto) {
    try {
      const user = await this.userService.create(model);
      delete user.password;
      const token = await this.authService.createToken(
        user.name,
        user.email,
        '',
        user.roles,
      );
      return new ResultadoDto(
        'Usuário criado com sucesso',
        true,
        { user, token },
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResultadoDto(
          'Não foi possível realizar seu cadastro',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('authenticate')
  @ApiOperation({ summary: 'Autenticação' })
  async authenticate(@Body() model: AuthenticateDto): Promise<any> {
    const user = await this.userService.authenticate(
      model.email,
      model.password,
    );
    if (!user)
      throw new HttpException(
        new ResultadoDto('Usuário ou senha inválidos', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );
    if (!user.active)
      throw new HttpException(
        new ResultadoDto('Usuário inativo', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );
    if (!user.confirmation)
      throw new HttpException(
        new ResultadoDto(
          'Usuário com cadastro sem confirmação',
          false,
          null,
          null,
        ),
        HttpStatus.UNAUTHORIZED,
      );
    // Gera o token
    const token = await this.authService.createToken(
      user.name,
      user.email,
      '',
      user.roles,
    );
    return new ResultadoDto(null, true, token, null);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Resetar Senha' })
  async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
    try {
      const passwordGuid = Guid.create()
        .toString()
        .substring(0, 8)
        .replace('-', '');
      const newPassword = await this.authService.transformPasswordMd5(
        passwordGuid,
      );
      await this.userService.update(model.email, { password: newPassword });
      return new ResultadoDto(
        'Uma nova senha foi enviada para seu E-mail',
        true,
        null,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResultadoDto(
          'Não foi possível restaurar sua senha',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RoleInterceptor(['usuario']))
  @ApiOperation({ summary: 'Trocar Senha' })
  async changePassword(
    @Req() request,
    @Body() model: ChangePasswordDto,
  ): Promise<any> {
    try {
      const newPassword = await this.authService.transformPasswordMd5(
        model.newPassword,
      );
      const user = await this.userService.authenticate(
        request.user.email,
        model.password,
      );
      if (!user)
        throw new HttpException(
          new ResultadoDto('Senha atual inválida', false, null, null),
          HttpStatus.BAD_REQUEST,
        );

      if (user) {
        await this.userService.update(request.user.email, {
          password: newPassword,
        });
        return new ResultadoDto(
          'Sua senha foi alterada com sucesso!',
          true,
          null,
          null,
        );
      }
    } catch (error) {
      throw new HttpException(
        new ResultadoDto(
          'Não foi possível alterar sua senha',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RoleInterceptor(['usuario']))
  @ApiOperation({ summary: 'Refresh Token' })
  async refreshToken(@Req() request): Promise<any> {
    const token = await this.authService.createToken(
      request.user.name,
      request.user.email,
      request.user.image,
      request.user.roles,
    );
    return new ResultadoDto(null, true, token, null);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('registration-confirmation/:id')
  @ApiOperation({ summary: 'Confirmar cadastro' })
  async registrationConfirmation(@Param() params): Promise<any> {
    try {
      const user = await this.userService.findById(params.id);
      if (!user)
        throw new HttpException(
          new ResultadoDto('Usuario não encontrado', false, null, null),
          HttpStatus.BAD_REQUEST,
        );

      if (user.confirmation)
        throw new HttpException(
          new ResultadoDto(
            'Usuario já está com o cadastro confirmado',
            false,
            null,
            null,
          ),
          HttpStatus.BAD_REQUEST,
        );

      if (user) {
        user.confirmation = true;
        user.dateConfirmation = new Date();
        await this.userService.update(user.email, {
          confirmation: true,
          dateConfirmation: user.dateConfirmation,
        });
        return new ResultadoDto(
          'Cadastro do usuário confirmado com sucesso!',
          true,
          null,
          null,
        );
      }
    } catch (error) {
      throw new HttpException(
        new ResultadoDto(
          'Não foi possível confirmar o cadastro',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('deactivate/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RoleInterceptor(['administrador']))
  @ApiOperation({ summary: 'Desativar Usuário' })
  async deactivate(@Param() params): Promise<any> {
    try {
      const user = await this.userService.findById(params.id);
      if (!user)
        throw new HttpException(
          new ResultadoDto('Usuario não encontrado', false, null, null),
          HttpStatus.BAD_REQUEST,
        );

      if (!user.active)
        throw new HttpException(
          new ResultadoDto('Usuario já está desativado', false, null, null),
          HttpStatus.BAD_REQUEST,
        );

      if (user) {
        user.active = false;
        await this.userService.update(user.email, { active: false });
        return new ResultadoDto(
          'Usuário desativado com sucesso!',
          true,
          null,
          null,
        );
      }
    } catch (error) {
      throw new HttpException(
        new ResultadoDto(
          'Não foi possível desativar usuário',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('activate/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RoleInterceptor(['administrador']))
  @ApiOperation({ summary: 'Ativar Usuário' })
  async activate(@Param() params): Promise<any> {
    try {
      const user = await this.userService.findById(params.id);
      if (!user)
        throw new HttpException(
          new ResultadoDto('Usuario não encontrado', false, null, null),
          HttpStatus.BAD_REQUEST,
        );

      if (!user.active)
        throw new HttpException(
          new ResultadoDto('Usuario já está ativado', false, null, null),
          HttpStatus.BAD_REQUEST,
        );

      if (user) {
        user.active = true;
        await this.userService.update(user.email, { active: true });
        return new ResultadoDto(
          'Usuário ativado com sucesso!',
          true,
          null,
          null,
        );
      }
    } catch (error) {
      throw new HttpException(
        new ResultadoDto('Não foi possível ativar usuário', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('select/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RoleInterceptor(['administrador']))
  @ApiOperation({ summary: 'Pegar dados do Usuário por ID' })
  async getUser(@Param() params): Promise<any> {
    try {
      const user = await this.userService.findById(params.id);
      if (!user)
        throw new HttpException(
          new ResultadoDto('Usuario não encontrado', false, null, null),
          HttpStatus.BAD_REQUEST,
        );

      if (user) {
        const usuarioRetorno = JSON.parse(JSON.stringify(user));
        delete usuarioRetorno.password;
        return new ResultadoDto(
          'Usuário recuparado com sucesso!',
          true,
          usuarioRetorno,
          null,
        );
      }
    } catch (error) {
      throw new HttpException(
        new ResultadoDto(
          'Não foi possível recuperar usuário',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RoleInterceptor(['usuario']))
  @ApiOperation({ summary: 'Pegar dados do usuário logado' })
  async me(@Req() request): Promise<any> {
    try {
      const user = await this.userService.findByEmail(request.user.email);
      // console.log('me', request.user, user);
      if (!user)
        throw new HttpException(
          new ResultadoDto('Usuario não encontrado', false, null, null),
          HttpStatus.BAD_REQUEST,
        );

      if (user) {
        const usuarioRetorno = JSON.parse(JSON.stringify(user));
        delete usuarioRetorno.password;
        return new ResultadoDto(
          'Usuário recuparado com sucesso!',
          true,
          usuarioRetorno,
          null,
        );
      }
    } catch (error) {
      throw new HttpException(
        new ResultadoDto(
          'Não foi possível recuperar2 usuário',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
