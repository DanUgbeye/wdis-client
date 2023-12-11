export class DateUtils {
  formatDate(inputDate: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      // day: "numeric",
      month: "long",
      year: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-GB", options);
    const formattedDate = formatter.format(inputDate);

    const day = inputDate.getDate();
    const suffix = this.getDaySuffix(day);

    return `${day}${suffix} ${formattedDate}`;
  }

  getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return "th";
    }

    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
}

const dateUtils = new DateUtils();
export default dateUtils;
