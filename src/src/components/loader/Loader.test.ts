import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'
import { Loader } from '../index'

describe('Loader', () => {
  it('Renders Properly', () => {
    const mountLoader = mount(Loader)
    expect(mountLoader).toBeTruthy()
  })
})
