import { mount } from '@vue/test-utils'
import { SqTooltip } from '@components/index'

describe('SqTooltip', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqTooltip)
    expect(mountLoader).toBeTruthy()
  })
})
