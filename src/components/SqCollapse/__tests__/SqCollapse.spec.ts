import { mount } from '@vue/test-utils'
import { SqCollapse } from '../index'
import { provide } from 'vue'

describe('SqCollapse', () => {
  it('Should Render', () => {
    const mountLoader = mount(SqCollapse, {
      setup() {
        const registerChild = () => {}
        provide('parentRegister', registerChild)
      },
    })
    expect(mountLoader).toBeTruthy()
  })
})
