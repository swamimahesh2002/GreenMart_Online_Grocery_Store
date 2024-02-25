export const isLoggedIn = () => {
    let token = sessionStorage.getItem(token)
    if (token === null) {
        return false;
    }
    return true;
}