import {
  defineComponent,
  ref,
  h,
  type PropType,
  type DefineComponent,
} from "vue";

import "./style.scss";

const renderDialog = (
  resolve: (value: boolean | PromiseLike<boolean>) => void
): ReturnType<typeof defineComponent> => {
  return defineComponent({
    props: {
      color: {
        type: String,
        default: "primary",
      },
      width: {
        type: String,
        default: "400px",
      },
      title: {
        type: String,
        default: "Confirm",
      },
      content: {
        type: [String, Object] as PropType<String | DefineComponent>,
        required: true,
      },
      contentProps: {
        type: Object,
        default: null,
      },
      btnOk: {
        type: String,
        required: true,
      },
      btnCancel: {
        type: String,
        required: true,
      },
      persistent: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const isActive = ref(true);
      const confirm = () => {
        close();
        resolve(true);
      };
      const discard = () => {
        close();
        resolve(false);
      };
      const close = () => {
        isActive.value = false;
      };

      return {
        isActive,
        confirm,
        discard,
        close,
      };
    },
    render() {
      if (this.isActive) {
        return h(
          "div",
          {
            class: "vd-modal",
          },
          [
            h("div", {
              class: "vd-modal__background",
              onClick: () => (this.persistent ? null : this.close()),
            }),
            h(
              "div",
              {
                class: "vd-modal__content",
              },
              [
                h(
                  "div",
                  {
                    class: "vd-card",
                    style: {
                      minWidth: this.width,
                    },
                  },
                  [
                    h(
                      "header",
                      {
                        class: `vd-card__title ${
                          this.color ? `vd-b-${this.color}` : ""
                        }`,
                      },
                      this.title
                    ),
                    h(
                      "main",
                      {
                        class: "vd-card__content",
                      },
                      typeof this.content === "string"
                        ? this.content
                        : [h(this.content, { ...this.contentProps })]
                    ),
                    h(
                      "footer",
                      {
                        class: "vd-card__actions",
                      },
                      [
                        h(
                          "button",
                          {
                            class: "vd-btn vd-btn--outlined",
                            onClick: () => this.discard(),
                          },
                          [
                            h("div", { class: "vd-btn__overlay" }),
                            this.btnCancel,
                          ]
                        ),
                        h(
                          "button",
                          {
                            class: "vd-btn vd-btn--elevated",
                            onClick: () => this.confirm(),
                          },
                          [h("div", { class: "vd-btn__overlay" }), this.btnOk]
                        ),
                      ]
                    ),
                  ]
                ),
              ]
            ),
            h("button", {
              class: "vd-modal__close is-medium",
              "aria-label": "close",
              onClick: () => this.close(),
            }),
          ]
        );
      }
      return null;
    },
  });
};

export { renderDialog };
