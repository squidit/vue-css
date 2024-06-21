import { mount } from '@vue/test-utils'
import { SqSelector } from '@components/index'
import VueCssPlugin from '@src/vue-css'

describe('SqSelector', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqSelector, { global: { plugins: [VueCssPlugin] } })
    expect(mountLoader).toBeTruthy()
  })
})
