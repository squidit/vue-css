import { mount } from '@vue/test-utils'
import { SqCollapse } from '../index'

describe('SqCollapse', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqCollapse)
    expect(mountLoader).toBeTruthy()
  })
})
