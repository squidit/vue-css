import { mount } from '@vue/test-utils'
import { SqInput } from '@components/index'
import VueCssPlugin from '@src/vue-css'

describe('SqInput', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqInput, { global: { plugins: [VueCssPlugin] } })
    expect(mountLoader).toBeTruthy()
  })
})
