export const AUTH_MODEL = {
    set: ( token, userInfo ) => {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user_info', JSON.stringify(userInfo));
    },
    remove: () => {
        localStorage.removeItem('id_token');
        localStorage.removeItem('user_info');
    },
    get: () => ({
        token: localStorage.getItem('id_token'),
        userInfo: JSON.parse(localStorage.getItem('user_info')),
    }),
}