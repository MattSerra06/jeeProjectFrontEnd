import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'

const vuetify = createVuetify({
    components: {
        ...components,
        ...labsComponents,
    },
    directives,
})

const app = createApp(App);

app.use(router);

// Utilisez Vuetify comme plugin Vue.js
app.use(vuetify);

app.mount('#app');
