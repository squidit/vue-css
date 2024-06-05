import { mount } from '@vue/test-utils'
import { SqCollapse } from '@components/index'

describe('SqCollapse', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqCollapse)
    expect(mountLoader).toBeTruthy()
  })
})
