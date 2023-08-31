export default class ValidatorHelper {
  xor(x: any, y: any) {
    return (x || y) && !(x && y)
  }

  email(email: string): boolean {
    // eslint-disable-next-line max-len
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      email
    )
  }

  url(url: string): boolean {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locator
    return !!pattern.test(url)
  }

  date(date: string): boolean {
    return !!Date.parse(date)
  }

  expirationDate(date: string) {
    if (date) {
      const [month, year] = date.split('/')
      if (month && year) {
        const objectDate = new Date(`${month}-28-${year}`)
        const today = new Date()
        today.setDate(31)
        return new RegExp('^(0[1-9]|1[0-2])/?([0-9]{4})$').test(date) && parseInt(month, 10) < 13 && objectDate.getTime() > today.getTime()
      }
      return
    }
    return
  }

  cnpj(value: any = '') {
    value = value.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '')
    if (value.length !== 14) {
      return false
    }
    for (const digit of Array.from(Array(10).keys())) {
      if (Array(14).fill(digit).join('') === value) {
        return false
      }
    }

    let size = value.length - 2
    let numbers: any = value.substring(0, size)
    const digits = value.substring(size)
    let sum = 0
    let pos = size - 7
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--
      if (pos < 2) {
        pos = 9
      }
    }
    if (sum % 11 < 2 ? 0 : 11 - (sum % 11) !== parseInt(digits.charAt(0), 10)) {
      return false
    }

    size = size + 1
    numbers = value.substring(0, size)
    sum = 0
    pos = size - 7
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(numbers - i) * pos--
      if (pos < 2) {
        pos = 9
      }
    }
    if (sum % 11 < 2 ? 0 : 11 - (sum % 11) !== parseInt(digits.charAt(1), 10)) {
      return false
    }
    return true
  }

  phone(phone = '') {
    const regex = /(\d{2})(\d{0,1})(\d{4})(\d{4})/
    return phone.match(regex) !== null
  }

  clearPhone(phone = '') {
    return phone.replace('(', '').replace(')', '').replace(/ /g, '').replace('-', '')
  }

  cpf(value: any = '') {
    value = value.replaceAll('.', '').replaceAll('-', '')
    let sum = 0
    let rest
    if (/^(.)\1+$/.test(value)) {
      return false
    }

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(value.substring(i - 1, i), 10) * (11 - i)
    }
    rest = (sum * 10) % 11

    if (rest === 10 || rest === 11) {
      rest = 0
    }
    if (rest !== parseInt(value.substring(9, 10), 10)) {
      return false
    }

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(value.substring(i - 1, i), 10) * (12 - i)
    }
    rest = (sum * 10) % 11

    if (rest === 10 || rest === 11) {
      rest = 0
    }
    if (rest !== parseInt(value.substring(10, 11), 10)) {
      return false
    }
    return true
  }

  recordEmployment(recordEmployment = '') {
    let total = 0
    let residual = 0
    let strResto = ''

    if (recordEmployment === '00000000000') {
      return false
    }

    for (let i = 0, ftap = '3298765432', resultado = 0; i <= 9; i++) {
      resultado = Number(recordEmployment.slice(i, i + 1)) * Number(ftap.slice(i, i + 1))
      total = total + resultado
    }

    residual = total % 11
    if (residual !== 0) {
      residual = 11 - residual
    }

    if (residual === 10 || residual === 11) {
      strResto = residual.toString()
      residual = Number(strResto.slice(1, 2))
    }

    if (residual !== Number(recordEmployment.slice(10, 11))) {
      return false
    }

    return true
  }

  validateCreditCardNumber(cardNumber: string) {
    cardNumber = cardNumber.split(' ').join('')
    if (parseInt(cardNumber) <= 0 || !/\d{15,16}(~\W[a-zA-Z])*$/.test(cardNumber) || cardNumber.length > 16) {
      return false
    }
    const carray: Array<any> = []
    for (let i = 0; i < cardNumber.length; i++) {
      carray[carray.length] = cardNumber.charCodeAt(i) - 48
    }
    carray.reverse()
    let sum = 0
    for (let i = 0; i < carray.length; i++) {
      let tmp = carray[i]
      if (i % 2 != 0) {
        tmp *= 2
        if (tmp > 9) {
          tmp -= 9
        }
      }
      sum += tmp
    }
    return sum % 10 == 0
  }

  cardType(cardNumber: string) {
    if (cardNumber?.length) {
      cardNumber = cardNumber.split(' ').join('')
      const cards: any = {
        visa: new RegExp('^4[0-9]{12}(?:[0-9]{3})?$'),
        mastercard: new RegExp('^5[1-5][0-9]{14}$'),
        amex: new RegExp('^3[47][0-9]{13}$'),
        hipercard: new RegExp('^((606282)|(637095)|(637568)|(637599)|(637609)|(637612))'),
        elo: new RegExp(
          '^((509091)|(636368)|(636297)|(504175)|(438935)|(40117[8-9])|(45763[1-2])|(457393)|(431274)|(50990[0-2])|(5099[7-9][0-9])|(50996[4-9])|(509[1-8][0-9][0-9])|(5090(0[0-2]|0[4-9]|1[2-9]|[24589][0-9]|3[1-9]|6[0-46-9]|7[0-24-9]))|(5067(0[0-24-8]|1[0-24-9]|2[014-9]|3[0-379]|4[0-9]|5[0-3]|6[0-5]|7[0-8]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(6504(8[5-9]|9[0-9])|6505(0[0-9]|1[0-9]|2[0-9]|3[0-8]))|(6505(4[1-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(65072[0-7])|(6509(0[1-9]|1[0-9]|20))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[0-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8])))'
        ),
      }
      for (const c in cards) {
        if (cards[c] && cards[c].test(cardNumber)) {
          return c
        }
      }
      return null
    }
    return null
  }
}
