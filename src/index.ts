import { createApp, inject, type Plugin, nextTick, type Component } from "vue";

import { renderDialog } from "./dialog";

const dialogKey = "ok";

interface DialogOptions {
  width?: string;
  color?: string;
  title?: string;
  btnOk?: string;
  btnCancel?: string;
  props?: object;
  persistent?: boolean;
}

interface VueDialog {
  show: (
    content: string | Component,
    options?: DialogOptions
  ) => Promise<unknown>;
}

const plugin = ({ root, plugins }: { root: string; plugins?: Plugin[] }) => {
  return {
    show: (content: string | Component, options?: DialogOptions) => {
      const rootID = root;

      return new Promise((resolve) => {
        const title = options?.title ? options.title : "Confirm";
        const btnOk = options?.btnOk ? options.btnOk : "Ok";
        const btnCancel = options?.btnCancel ? options.btnCancel : "Cancel";

        const comp = renderDialog(resolve);

        nextTick(() => {
          const dialogApp = createApp(comp, {
            color: options?.color,
            width: options?.width,
            title: title,
            content: content,
            contentProps: options?.props,
            btnOk: btnOk,
            btnCancel: btnCancel,
            persistent: options?.persistent,
          });

          if (plugins) {
            plugins.forEach((plugin) => {
              dialogApp.use(plugin);
            });
          }

          dialogApp.mount(rootID);

          return dialogApp;
        });
      });
    },
  };
};

const VueDialogPlugin: Plugin = (
  App,
  { root, plugins }: { root: string; plugins?: Plugin[] }
) => {
  const inter = plugin({ root, plugins });
  App.provide(dialogKey, inter);
};

const useDialog = (customKey = ""): VueDialog => {
  return inject(customKey !== "" ? customKey : dialogKey) as VueDialog;
};

export default VueDialogPlugin;

export { useDialog };
export type { DialogOptions };
