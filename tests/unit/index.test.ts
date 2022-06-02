import * as vue from "vue";
import VueDialogPlugin from "@/index";
import { useDialog } from "@/index";

const TestComponent = {
  name: "test-component",
  setup() {
    const dialog: any = useDialog();
    const show = async () => {
      const ok = await dialog.show("Are you sure?");
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
    expect(typeof VueDialogPlugin).toEqual("function");
    expect(typeof useDialog).toEqual("function");
  });
});

describe("plugin", () => {
  it("Loads plugin", () => {
    const app = vue.createApp(App);
    const provideSpy = jest.spyOn(app, "provide");

    expect(provideSpy).toHaveBeenCalledTimes(0);

    app.use(VueDialogPlugin);

    expect(provideSpy).toHaveBeenCalledTimes(1);
  });
});
