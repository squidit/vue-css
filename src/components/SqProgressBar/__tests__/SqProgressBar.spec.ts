import { mount } from '@vue/test-utils'
import { SqProgressBar } from '@components/index'

describe('SqProgressBar', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqProgressBar)
    expect(mountLoader).toBeTruthy()
  })
})
