import { mount } from '@vue/test-utils'
import { SqInfinityScroll } from '@components/index'

describe('SqInfinityScroll', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqInfinityScroll)
    expect(mountLoader).toBeTruthy()
  })
})
