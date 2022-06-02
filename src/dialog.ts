import {
  defineComponent,
  ref,
  h,
  type PropType,
  type DefineComponent,
} from "vue";

import "./style.scss";

export const IconType = {
  question: "",
  info: "info",
  warn: "warning",
  error: "close",
  success: "check",
};

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
      type: {
        type: String as PropType<keyof typeof IconType>,
        default: "question",
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
        const actions = [];

        if (this.type === "question")
          actions.push(
            h(
              "button",
              {
                class: "vd-btn vd-btn--outlined",
                onClick: () => this.discard(),
              },
              [h("div", { class: "vd-btn__overlay" }), this.btnCancel]
            )
          );

        actions.push(
          h(
            "button",
            {
              class: "vd-btn vd-btn--elevated",
              onClick: () => this.confirm(),
            },
            [h("div", { class: "vd-btn__overlay" }), this.btnOk]
          )
        );

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
                    class: `vd-card vd-${this.type}`,
                    style: {
                      minWidth: this.width,
                    },
                  },
                  [
                    h(
                      "span",
                      {
                        class: "material-icons vd-card__icon",
                        style: {
                          marginLeft: this.type === "question" ? 0 : "20px",
                        },
                      },
                      IconType[this.type]
                    ),
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
                      { class: "vd-card__content" },
                      typeof this.content === "string"
                        ? this.content
                        : [h(this.content, { ...this.contentProps })]
                    ),
                    h("footer", { class: "vd-card__actions" }, actions),
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
