import { SqWindowHelper } from '../index'

export class SqColorsHelper {
  sqWindowHelper = new SqWindowHelper()

  getCssVariableValue(variableName: string): string {
    if (document?.documentElement) {
      const clearVar = variableName?.replace('var(', '')?.replace(')', '')?.trim()
      return this.sqWindowHelper.window()?.getComputedStyle(document?.documentElement).getPropertyValue(clearVar) || variableName
    }
    return variableName
  }

  lightenDarkenColor(color: string, amount: number): string {
    color = color?.trim()
    let colorWithoutHash = color?.replace('var(', '')?.replace(')', '')?.replace('#', '')
    if (colorWithoutHash?.length === 3) {
      colorWithoutHash = colorWithoutHash
        .split('')
        .map((c) => `${c}${c}`)
        .join('')
    }

    const isHexColor = (value: string): boolean => {
      const hexColorRegex = /^([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/
      return hexColorRegex.test(value)
    }

    if (!isHexColor(colorWithoutHash)) {
      return colorWithoutHash
    }

    const getColorChannel = (substring: string): string => {
      let colorChannel = Math.max(Math.min(255, parseInt(substring, 16) + amount), 0).toString(16)
      if (colorChannel?.length < 2) {
        colorChannel = `0${colorChannel}`
      }
      return colorChannel
    }

    const colorChannelRed = getColorChannel(colorWithoutHash?.substring(0, 2))
    const colorChannelGreen = getColorChannel(colorWithoutHash?.substring(2, 4))
    const colorChannelBlue = getColorChannel(colorWithoutHash?.substring(4, 6))

    return `#${colorChannelRed}${colorChannelGreen}${colorChannelBlue}`
  }
}
