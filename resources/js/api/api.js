const BASE_API = `/api`;

const API_CONSTANT_MAP = {
    login: `${BASE_API}/login`,
    register: `${BASE_API}/register`,
    cekToken: `${BASE_API}/user`,
    alluser: `${BASE_API}/alluser`,
    deleteUser: `${BASE_API}/deleteuser`,
    getSpecified: `${BASE_API}/user/`,
    editUser: `${BASE_API}/edituser`,
    allzona: `${BASE_API}/zone/all`
};

module.exports = API_CONSTANT_MAP;
