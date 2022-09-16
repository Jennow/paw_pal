import { mount } from '@vue/test-utils'
import EditProfilePage from '@/views/EditProfilePage.vue'

describe('EditProfilePage.vue', () => {
  it('renders profile view', () => {
    const mockRoute = {
      params: {
        id: 'Outbox'
      }
    }
    const wrapper = mount(EditProfilePage, {
      global: {
        mocks: {
          $route: mockRoute
        }
      }
    })
    expect(wrapper.text()).toMatch('Explore UI Components')
  })
})
