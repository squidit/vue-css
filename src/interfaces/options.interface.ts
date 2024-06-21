/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Option {
  value: any
  label: string
  disabled?: boolean
  data?: any
}

export interface OptionMulti {
  label: string
  value: any
  disabled?: boolean
  children?: Array<OptionMulti>
  open?: boolean
  data?: any
}
