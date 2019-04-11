export const b64DecodeUnicode = (str): string => {
    return decodeURIComponent(Array.prototype.map.call(atob(str),  (c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
};
