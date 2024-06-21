import { mount } from '@vue/test-utils'
import { SqSelectMultiTags } from '@components/index'
import VueCssPlugin from '@src/vue-css'

describe('SqSelectMultiTags', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqSelectMultiTags, { global: { plugins: [VueCssPlugin] } })
    expect(mountLoader).toBeTruthy()
  })
})
