import { mount } from '@vue/test-utils'
import { SqAccordion } from '@components/index'

describe('SqAccordion', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqAccordion)
    expect(mountLoader).toBeTruthy()
  })
})
