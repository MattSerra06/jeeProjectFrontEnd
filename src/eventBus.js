// eventBus.js
import {reactive, readonly} from 'vue';

const state = reactive({
    isLoggedIn: false,
    userRole: '',
});

export const EventBus = {
    getState: () => readonly(state),
    login: (role) => {
        state.isLoggedIn = true;
        state.userRole = role;
    }, logout: () => {
        state.isLoggedIn = false;
        state.userRole = null;
    },
    initializeAuthState: () => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const role = localStorage.getItem('role');
            EventBus.login(role);
        }
    }
};
EventBus.initializeAuthState();
