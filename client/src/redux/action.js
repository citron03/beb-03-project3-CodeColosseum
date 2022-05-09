export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

export const showNotification = (text) => {
    return {
        type: SHOW_NOTIFICATION,
        payload: {
            text
        }
    }
}

export const removeNotification = () => {
    return {
        type: REMOVE_NOTIFICATION
    }
}