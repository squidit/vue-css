import { mount } from '@vue/test-utils'
import { Loader } from '../index'

describe('Loader', () => {
  it('Should Render', () => {
    const mountLoader = mount(Loader)
    expect(mountLoader).toBeTruthy()
  })
})
