import { mount } from '@vue/test-utils'
import { SqSelector } from '@components/index'

describe('SqSelector', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqSelector)
    expect(mountLoader).toBeTruthy()
  })
})
