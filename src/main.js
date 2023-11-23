import {createApp} from 'vue';
import App from './App.vue';
import router from './router';

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'
import axios from 'axios';
import Notifications from '@kyvg/vue3-notification'
import {notifyUser} from "@/notification";
import {createRouter as $router} from "vue-router";


const vuetify = createVuetify({
    components: {
        ...components,
        ...labsComponents,
    },
    directives,
})

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwtToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

axios.interceptors.response.use((response) => {
    console.log("Réponse reçue :", response); // Ajout du console.log ici
    return response;
}, async function (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
        await router.push('/login');
        notifyUser('error', 'Session Expirée', 'Votre session a expiré. Veuillez vous reconnecter.');
    }
    return Promise.reject(error);
});



const app = createApp(App);

app.use(router);
app.use(Notifications);

// Utilisez Vuetify comme plugin Vue.js
app.use(vuetify);

app.mount('#app');
