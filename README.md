⚠️В разработке, не протестировано

![licecap](https://raw.githubusercontent.com/Sakhnovkrg/Vue3-Yandex-SmartCaptcha/main/licecap.gif)

## Установка
NPM:
```bash
$ npm install vue3-yandex-smartcaptcha
```

Yarn:
```bash
$ yarn add vue3-yandex-smartcaptcha
```

## Использование

```javascript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import YSmartCaptcha from 'vue3-yandex-smartcaptcha'

const app = createApp(App)

app.use(YSmartCaptcha, {
  siteKey: 'Ключ клиента'
})

app.mount('#app')
```

## Использование в Nuxt

Создай файл `/plugins/ysmartcaptcha.js`

```javascript
import YSmartCaptcha from "vue3-yandex-smartcaptcha";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(YSmartCaptcha, {
        siteKey: "Ключ клиента"
    })
})
```

Зарегистрируй плагин в `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  plugins: [
    {src: '~/plugins/ysmartcaptcha.js', mode: 'client'},
  ]
})
```

## Пример

```vue
<script setup>
import { ref } from 'vue';
const token = ref(); // сюда присвоится значение токена после прохождения проверки
</script>

<template>
  <form>
    <ClientOnly> <!-- Для Nuxt -->
      <YSmartCaptcha v-model="token" />
    </ClientOnly>
    <button :disabled="!token">Submit</button>
  </form>

  {{ token }}
</template>
```