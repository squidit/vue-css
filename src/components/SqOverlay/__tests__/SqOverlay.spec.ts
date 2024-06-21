import { mount } from '@vue/test-utils'
import { SqOverlay } from '@components/index'

describe('SqOverlay', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqOverlay)
    expect(mountLoader).toBeTruthy()
  })
})
