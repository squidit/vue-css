import { mount } from '@vue/test-utils'
import { SqSelectMultiTags } from '@components/index'

describe('SqSelectMultiTags', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqSelectMultiTags)
    expect(mountLoader).toBeTruthy()
  })
})
