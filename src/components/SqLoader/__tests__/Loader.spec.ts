import { mount } from '@vue/test-utils'
import { SqLoader } from '../index'

describe('SqLoader', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqLoader)
    expect(mountLoader).toBeTruthy()
  })
})
