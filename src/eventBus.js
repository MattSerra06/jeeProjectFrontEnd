// eventBus.js
import { reactive, readonly } from 'vue';

const state = reactive({
    isLoggedIn: false,
});

export const EventBus = {
    getState: () => readonly(state),
    login: () => { state.isLoggedIn = true; },
    logout: () => { state.isLoggedIn = false; },
};
