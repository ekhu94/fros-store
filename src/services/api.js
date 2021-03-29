import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000/api/v1';
//! TO RENDER ALL CLOTHS, ATTENTION IF ROUTES WERE REWRITTEN
const ALL_CLOTHS_URL = 'http://localhost:3000/api/v1/inventories';

const token = () => localStorage.getItem('token');

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
    return fetch(`${BACKEND_URL}/current_user`, {
        headers: headers()
    })
    .then(res => res.json());
};

// export {BACKEND_URL, ALL_CLOTHS_URL}

export const api = {
    auth: {
        signup,
        login,
        getCurrentUser
    },
    cloths: {
        getCloths
    }
};
