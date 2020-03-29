import { createLocalVue, mount, shallowMount, RouterLinkStub  } from '@vue/test-utils'
import BottomNav from '@/components/BottomNavbar.vue'
import Vuetify from "vuetify"
import Vuex from 'vuex'
import Vue from 'vue'

const localVue = createLocalVue()

localVue.use(Vuex)
Vue.use(Vuetify)
describe('BottomNav', () => {
  let mutations
  let store
  let state
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })
  // it('renders bar on frameV', () => {
  //   state = {
  //     sidebar: {
  //       sidebar: 'frameV'
  //     },
  //     frame: {
  //       frameTabs: 'info'
  //     }
  //   }
  //   store = new Vuex.Store({
  //     state
  //   })
  //   const wrapper = shallowMount(BottomNav, {
  //     localVue,
  //     store,
  //     stubs: {
  //       NuxtLink: RouterLinkStub
  //     }
  //   })
  //   expect(wrapper.find('#infobtn')).toBeTruthy()
  // })
  it('hides bar off frameV', () => {
    state = {
      sidebar: {
        sidebar: 'areaV'
      },
      frame: {
        frameTabs: 'info'
      }
    }
    store = new Vuex.Store({
      state
    })
    const wrapper = shallowMount(BottomNav, {
      localVue,
      store,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.find('#infobtn')).not.toBeTruthy()
  })
})
