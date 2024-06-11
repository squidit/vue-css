import { mount } from '@vue/test-utils'
import { SqInput } from '@components/index'

describe('SqInput', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqInput)
    expect(mountLoader).toBeTruthy()
  })
})
