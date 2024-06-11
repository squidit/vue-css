import { mount } from '@vue/test-utils'
import { SqInput } from '@components/index'
import i18n from '@src/i18n'

describe('SqInput', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqInput, { global: { plugins: [i18n] } })
    expect(mountLoader).toBeTruthy()
  })
})
