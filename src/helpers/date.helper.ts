export default class DateHelper {
  dateNow = Date.now()
  today = new Date(this.dateNow)

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
  }

  formatDate(date: Date) {
    return [date.getFullYear(), this.padTo2Digits(date.getMonth() + 1), this.padTo2Digits(date.getDate())].join('-')
  }

  addDaysToDate(date: string, days: number, locale: boolean) {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + days)
    if (locale) {
      return newDate.toLocaleDateString()
    } else {
      return newDate
    }
  }

  dateToday() {
    return this.formatDate(this.today)
  }

  dateTodayPlusFive() {
    const date = this.formatDate(this.today)
    const newDate = this.addDaysToDate(date, 7, false)
    return this.formatDate(new Date(newDate))
  }
}
