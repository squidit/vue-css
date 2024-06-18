import { mount } from '@vue/test-utils'
import { SqModal } from '@components/index'

describe('SqModal', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqModal)
    expect(mountLoader).toBeTruthy()
  })
})
