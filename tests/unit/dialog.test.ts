import * as vue from "vue";
import { mount } from "@vue/test-utils";
import VueDialogPlugin, { DialogOptions } from ".@/index";
import { useDialog } from ".@/index";
import { renderDialog } from ".@/dialog";

const clearDocument = () => {
  document.body.innerHTML = "";
};

const TestComponent = {
  name: "test-component",
  setup() {
    const dialog: any = useDialog();
    const show = async () => {
      const ok = await dialog.show("Are you sure?", {
        btnCancel: "No",
        btnOk: "Yes",
      } as DialogOptions);
    };

    return () =>
      vue.h(
        "div",
        {
          class: "component",
        },
        [
          vue.h("button", {
            class: "button",
            onClick: () => show(),
          }),
        ]
      );
  },
};

const App = {
  components: {
    TestComponent,
  },
  setup() {
    return () =>
      vue.h("div", { class: "main" }, [
        vue.h("div", {
          id: "dialog",
        }),
        vue.h(TestComponent),
      ]);
  },
};

describe("exports", () => {
  it("exports", () => {
    expect(typeof renderDialog).toEqual("function");
  });
});

describe("Dialog", () => {
  it("Shows dialog", async () => {
    const root = document.createElement("div");
    document.body.appendChild(root);

    const wrapper = mount(App, {
      attachTo: root,
      global: {
        plugins: [
          [
            VueDialogPlugin,
            {
              root: "#dialog",
            },
          ],
        ],
      },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain('<div id="dialog"></div>');
    await wrapper.vm.$nextTick();
    // show dialog
    wrapper.get(".button").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain(
      '<main class="vd-card__content">Are you sure?</main>'
    );
    expect(wrapper.html()).toContain(
      '<button class="vd-btn vd-btn--outlined"><div class="vd-btn__overlay"></div>No</button>'
    );
    expect(wrapper.html()).toContain(
      '<button class="vd-btn vd-btn--elevated"><div class="vd-btn__overlay"></div>Yes</button>'
    );

    clearDocument();
  });

  it("dialog button", async () => {
    const root = document.createElement("div");
    document.body.appendChild(root);

    const wrapper = mount(App, {
      attachTo: root,
      global: {
        plugins: [
          [
            VueDialogPlugin,
            {
              root: "#dialog",
            },
          ],
        ],
      },
    });
    await wrapper.vm.$nextTick();
    // show dialog
    wrapper.get(".button").trigger("click");
    await wrapper.vm.$nextTick();
    wrapper.get(".button.is-confirm").trigger("click");
    await wrapper.vm.$nextTick();
    // when modal is closed button does not longer exists
    expect(wrapper.find(".vd-modal").exists()).toBe(false);
    expect(wrapper.find(".button.is-confirm").exists()).toBe(false);

    clearDocument();
  });

  it("Discard button", async () => {
    const root = document.createElement("div");
    document.body.appendChild(root);

    const wrapper = mount(App, {
      attachTo: root,
      global: {
        plugins: [
          [
            VueDialogPlugin,
            {
              root: "#dialog",
            },
          ],
        ],
      },
    });
    await wrapper.vm.$nextTick();
    // show dialog
    wrapper.get(".button").trigger("click");
    await wrapper.vm.$nextTick();
    wrapper.get(".button.is-discard").trigger("click");
    await wrapper.vm.$nextTick();
    // when modal is closed button does not longer exists
    expect(wrapper.find(".vd-modal").exists()).toBe(false);
    expect(wrapper.find(".button.is-discard").exists()).toBe(false);

    clearDocument();
  });

  it("Close by click on the button", async () => {
    const root = document.createElement("div");
    document.body.appendChild(root);

    const wrapper = mount(App, {
      attachTo: root,
      global: {
        plugins: [
          [
            VueDialogPlugin,
            {
              root: "#dialog",
            },
          ],
        ],
      },
    });
    await wrapper.vm.$nextTick();
    // show dialog
    wrapper.get(".button").trigger("click");
    await wrapper.vm.$nextTick();
    wrapper.get(".vd-modal__close").trigger("click");
    await wrapper.vm.$nextTick();
    // when modal is closed button does not longer exists
    expect(wrapper.find(".vd-modal").exists()).toBe(false);

    clearDocument();
  });

  it("Close by click on the background", async () => {
    const root = document.createElement("div");
    document.body.appendChild(root);

    const wrapper = mount(App, {
      attachTo: root,
      global: {
        plugins: [
          [
            VueDialogPlugin,
            {
              root: "#dialog",
            },
          ],
        ],
      },
    });
    await wrapper.vm.$nextTick();
    // show dialog
    wrapper.get(".button").trigger("click");
    await wrapper.vm.$nextTick();
    wrapper.get(".vd-modal__background").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".vd-modal").exists()).toBe(false);

    clearDocument();
  });
});
