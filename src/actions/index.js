export const addToCart = item => {
    return {
        type: 'ADD_ITEM',
        payload: item
    };
};

export const removeFromCart = itemId => {
    return {
        type: 'REMOVE_ITEM',
        payload: itemId
    }
};