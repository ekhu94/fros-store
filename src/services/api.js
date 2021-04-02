import axios from 'axios';

const BACKEND_URL = 'https://fros-api.herokuapp.com/api/v1/';
//! TO RENDER ALL CLOTHS, ATTENTION IF ROUTES WERE REWRITTEN
const ALL_CLOTHS_URL = 'https://fros-api.herokuapp.com/api/v1//inventories';
const CART_URL = 'https://fros-api.herokuapp.com/api/v1//carts';
const ITEM_URL = 'https://fros-api.herokuapp.com/api/v1//items'

const token = () =>  localStorage.getItem('token');

const headers = () => {
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token()
    };
};

const getCloths = async () => {
    const res = await axios.get(ALL_CLOTHS_URL);
    return res.data;
};

const getOneCloth = async (id) => {
    const res = await axios.get(`${ALL_CLOTHS_URL}/${id}`);
    return res.data;
};

const signup = data => {
    return fetch(`${BACKEND_URL}/users`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
            user: data
        })
    })
    .then(res => res.json())
};

const login = data => {
    return fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)
    })
    .then(res => res.json())
};

const getCurrentUser = () => {
    return fetch(`${BACKEND_URL}/profile`, {
        headers: headers()
    })
    .then(res => res.json());
};

const createCartRecord = async obj => {
    const res = await axios.post(CART_URL, obj);
    return res.data;
}

const createItemRecord = async obj => {
    const res = await axios.post(ITEM_URL, obj);
    return res.data
}

const deleteCartRecord = async id => {
    const res = await axios.delete(`${CART_URL}/${id}`);
    return res.data;
}


export const api = {
    auth: {
        signup,
        login,
        getCurrentUser
    },
    cloths: {
        getCloths,
        getOneCloth
    },
    cart: {
        createCartRecord,
        deleteCartRecord
    },
    item: {
        createItemRecord
    }
};
