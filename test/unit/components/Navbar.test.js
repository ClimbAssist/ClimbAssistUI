import { createLocalVue, RouterLinkStub, shallowMount } from "@vue/test-utils";
import Navbar from "@/components/Navbar.vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import Vue from "vue";

const localVue = createLocalVue();

localVue.use(Vuex);
Vue.use(Vuetify);
describe("BottomNav", () => {
  let mutations;
  let store;
  let state;
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });
  it("renders area name on area view", () => {
    state = {
      filter: {
        areaState: {
          name: "sample area"
        }
      },
      sidebar: {
        sidebar: "areaV"
      }
    };
    store = new Vuex.Store({
      state
    });
    const wrapper = shallowMount(Navbar, {
      localVue,
      store,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      mocks: {
        $vuetify: { breakpoint: { mdAndUp: true, smAndDown: false } }
      }
    });
    //desktop
    expect(wrapper.find("[data-testid=area-name]").text()).toEqual(
      "sample area"
    );
    expect(wrapper.find("[data-testid=crag-name]").exists()).toBeFalsy();
    //mobile
    expect(wrapper.find("[data-testid=small-area-name]").text()).toEqual(
      "sample area"
    );

    expect(wrapper.find("[data-testid=small-crag-name]").exists()).toBeFalsy();
    expect(
      wrapper.find("[data-testid=small-company-name]").exists()
    ).toBeFalsy();
    //breakpoints
    expect(
      wrapper.find("[data-testid=small]").attributes("hidden-md-and-up")
    ).toBeDefined();
    expect(
      wrapper.find("[data-testid=area]").attributes("hidden-sm-and-down")
    ).toBeDefined();
  });
  it("renders crag name on crag view", () => {
    state = {
      filter: {
        cragState: {
          name: "sample crag"
        }
      },
      sidebar: {
        sidebar: "frameV"
      },
      frame: {
        frameTabs: "info"
      }
    };
    store = new Vuex.Store({
      state
    });
    const wrapper = shallowMount(Navbar, {
      localVue,
      store,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      mocks: {
        $vuetify: { breakpoint: { mdAndUp: true, smAndDown: false } }
      }
    });
    //desktop
    expect(wrapper.find("[data-testid=crag-name]").text()).toEqual(
      "sample crag"
    );
    expect(wrapper.find("[data-testid=nav-buttons").exists()).toBeTruthy();
    expect(
      wrapper.find("[data-testid=nav-info-button").attributes("color")
    ).toBe("primary");
    expect(
      wrapper.find("[data-testid=nav-model-button").attributes("color")
    ).toBe("grey");
    expect(
      wrapper.find("[data-testid=nav-map-button").attributes("color")
    ).toBe("grey");
    expect(wrapper.find("[data-testid=area-name]").exists()).toBeFalsy();
    //mobile
    expect(wrapper.find("[data-testid=small-crag-name]").text()).toEqual(
      "sample crag"
    );
    expect(wrapper.find("[data-testid=small-area-name]").exists()).toBeFalsy();
    expect(
      wrapper.find("[data-testid=small-company-name]").exists()
    ).toBeFalsy();
    //breakpoints
    expect(
      wrapper.find("[data-testid=small]").attributes("hidden-md-and-up")
    ).toBeDefined();
    expect(
      wrapper.find("[data-testid=crag]").attributes("hidden-sm-and-down")
    ).toBeDefined();
  });
  it("hides on defaultV, Company name on small", () => {
    state = {
      sidebar: {
        sidebar: "defaultV"
      }
    };
    store = new Vuex.Store({
      state
    });
    const wrapper = shallowMount(Navbar, {
      localVue,
      store,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      mocks: {
        $vuetify: { breakpoint: { mdAndUp: true, smAndDown: false } }
      }
    });
    //desktop
    expect(wrapper.find("[data-testid=crag-name]").exists()).toBeFalsy();
    expect(wrapper.find("[data-testid=area-name]").exists()).toBeFalsy();
    expect(wrapper.find("[data-testid=nav-buttons]").exists()).toBeFalsy();
    // mobile
    expect(wrapper.find("[data-testid=small-company-name]").text()).toEqual(
      "Climb Assist (beta)"
    );
    expect(wrapper.find("[data-testid=small-area-name]").exists()).toBeFalsy();
    expect(wrapper.find("[data-testid=small-crag-name]").exists()).toBeFalsy();
  });
});
