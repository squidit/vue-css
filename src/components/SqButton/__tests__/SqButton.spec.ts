import { mount } from '@vue/test-utils'
import { SqButton } from '@components/index'

describe('SqButton', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqButton)
    expect(mountLoader).toBeTruthy()
  })
})
