# vue-dialog

[![codecov](https://codecov.io/gh/malekim/v3confirm/branch/main/graph/badge.svg?token=CFUBKUJKVB)](https://codecov.io/gh/malekim/v3confirm)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A plugin dedicated for vue3 to show dialog modal. Currently the plugin works only with composition api.

## Installation

The plugin can be installed by npm or yarn. 

### NPM

```bash
npm install vue-dialog --save
```

### Yarn

```bash
yarn add vue-dialog
```

## Usage

```javascript
import { createApp } from 'vue'
import VueDialogPlugin from 'vue-dialog'
import App from '@/App.vue'

const app = createApp(App)
app.use(VueDialogPlugin, {
  root: '#dialog',
  btnOk: 'Ok',
  btnCancel: 'Cancel',
})
app.mount('#app')
```

Remember to have a html handler somewhere with id provided in root option. For example in App.vue:

```html
<template>
  <div id="dialog"></div>
</template>
```

Then in component with composition api:

```html
<template>
  <button @click="deleteAllUsers">
  <button @click="deleteAllUsersWithAsync">
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useDialog } from 'vue-dialog'

  export default defineComponent({
    setup: () => {
      const dialog = useDialog()

      const deleteAllUsers = () => {
        dialog.show('Are you sure?').then((ok) => {
          if (ok) {
            alert('All users deleted')
          } else {
            alert('Users not deleted')
          }
        })
      }

      const deleteAllUsersWithAsync = async () => {
        const ok = await dialog.show('Are you sure?')

        if (ok) {
          alert('All users deleted')
        } else {
          alert('Users not deleted')
        }
      }

      return {
        deleteAllUsers,
        deleteAllUsersWithAsync,
      }
    },
  })
</script>
```

## Options

### root

Type: string

Default: none

An HTML element where dialog is attached. It should be empty.

### btnOk

Type string

Default: 'Ok'

A text used for confirm button.

### btnCancel

Type string

Default: 'Cancel'

A text used for decline button.
