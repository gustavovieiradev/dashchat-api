export class DateUtil {

  public static MESES = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]

  /**
   * Data com formato YYYY-MM-DD
   * @param dateString
   */
  public static getDateFromString(dateString: string) {
    const data = new Date(`${dateString}`);
    console.log(data);
    return data;
  }

  /**
   * Data com formato YYYY-MM-DD
   * @param dateString
   */
  public static getDateFromStringFinalDia(dateString: string) {
    const data = new Date(`${dateString}`);
    data.setDate(data.getDate() + 1);
    return data;
  }

  public static getDataPorExtenso(date: Date) {
    return `${date.getDate()} de ${DateUtil.MESES[date.getMonth()]} de ${date.getFullYear()}`
  }

}
