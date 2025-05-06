import { h, ref, onMounted, onBeforeUnmount } from 'vue';

const YSmartCaptcha = {
  install(app, options) {
    app.component('YSmartCaptcha', {
      props: ['siteKey', 'modelValue'],
      emits: ['update:modelValue'],
      setup(props, { emit }) {
        const widgetId = ref('captcha-container');
        const internalValue = ref(props.modelValue);

        if(props.siteKey) {
          options.siteKey = props.siteKey
        }

        let mo;
        let script;

        onMounted(() => {
          script = document.createElement('script');
          script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js';
          script.defer = true;
          document.head.appendChild(script);

          script.onload = function () {
            const targetElement = document.querySelector('input[name="smart-token"]');
            
            mo = new MutationObserver((mutationsList) => {
              for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
                  const newValue = targetElement.value;
                  emit('update:modelValue', newValue);
                }
              }
            });

            mo.observe(targetElement, { attributes: true });
          };
        });

        onBeforeUnmount(() => {
          try {
            mo.disconnect();
            script.delete();
          } catch(e) {
            console.log(e)
          }
        });

        return {
          widgetId,
          internalValue,
          onInput: (value) => emit('update:modelValue', value),
        };
      },
      render() {
        return h('div', {
          style: 'height: 100px;',
          id: this.widgetId,
          'data-sitekey': options.siteKey
        });
      },
    })
  }
}

export default YSmartCaptcha;