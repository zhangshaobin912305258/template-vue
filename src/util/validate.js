import { Notification, MessageBox, Message } from 'element-ui'


export function validEmpty(text, prefix) {
    if (text.trim() === '') {
        Message({
            message: prefix+"不能为空",
            type: 'error',
            duration: 1 * 1000
        })
        return false;
    }
    return true;
}