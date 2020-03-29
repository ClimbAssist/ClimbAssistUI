import { createLocalVue, mount, shallowMount, RouterLinkStub  } from '@vue/test-utils'
import Snackbar from '@/components/Snackbar.vue'
import Vuetify from "vuetify"
import Vuex from 'vuex'
import Vue from 'vue'
import VueRouter from 'vue-router'



const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)
Vue.use(Vuetify)
describe('Snackbar', () => {
  let mutations
  let store
  let state
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    state = {
      snackbar: {
        snackbar: true,
        message: "By using this site you agree to the",
        timeout: 10000,
        type: 'dark',
        link: "/terms",
        linkMessage: "terms and conditions"
      }
    }
    store = new Vuex.Store({
      state
    })
  })
  it('is a Vue instance', () => {
    const wrapper = shallowMount(Snackbar, {
      localVue,
      store,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('renders message', () => {
    const wrapper = shallowMount(Snackbar, {
      localVue,
      store,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.find('#message').text()).toEqual('By using this site you agree to the')
  })
  it('renders link', () => {
    const wrapper = shallowMount(Snackbar, {
      localVue,
      store,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.find('#linkMessage').text()).toEqual('terms and conditions')
  })
  // it('links to correct location', () => {
  //   const wrapper = shallowMount(Snackbar, {
  //     localVue,
  //     store,
  //     stubs: {
  //       NuxtLink: RouterLinkStub
  //     }
  //   })
  //   expect(wrapper.find('#linkMessage').attributes().href).toBe("/terms")
  // })
  // it('links to terms', async () => {
  //   const wrapper = shallowMount(Snackbar, {
  //     localVue,
  //     store,
  //     stubs: {
  //       NuxtLink: RouterLinkStub
  //     }
  //   })
  //   router.push("/terms")
  //   await wrapper.vm.$nextTick()
  //
  //   expect(wrapper.find(Terms).exists()).toBe(true)
  // })
})
