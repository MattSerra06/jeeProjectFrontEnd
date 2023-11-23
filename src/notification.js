// notification.js
import { notify } from '@kyvg/vue3-notification';


export function notifyUser(type, title, text) {
    notify({
        type: type,
        title: title,
        text: text
    });
}
