import { mount } from '@vue/test-utils'
import { SqLoader } from '@components/index'

describe('SqLoader', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqLoader)
    expect(mountLoader).toBeTruthy()
  })
})
