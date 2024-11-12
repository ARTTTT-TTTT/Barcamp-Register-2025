import config from "../services/config";

const Login = () => {
    window.open(`${config.apiPrefixAuth}/google`, "_self");
};

const Logout = () => {
    window.open(`${config.apiPrefixAuth}/logout`, "_self");
};

const SpecialRegister = () => {
    window.open(`${config.apiPrefixAuth}/google/special-register`, "_self");
};

const adminLogin = async (data) => {
    try {
        let res = await fetch(`${config.apiPrefixAuth}/admin/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return await res.json();
    } catch (error) {
        return error.errors;
    }
};

const adminGetAllUsers = async () => {
    try {
        let token = window.localStorage.getItem("access_token");

        let res = await fetch(`${config.apiPrefixAuth}/admin/all_users`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return await res.json();
    } catch (error) {
        return error.errors;
    }
};

const adminUpdateStatus = async (data) => {
    try {
        let token = window.localStorage.getItem("access_token");

        let res = await fetch(`${config.apiPrefixAuth}/admin/update_status`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        return await res.json();
    } catch (error) {
        return error.errors;
    }
};

const saveForm = async (data) => {
    try {
        let res = await fetch(`${config.apiPrefix}/register`, {
            method: "PUT",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(data),
        });

        return await res.json();
    } catch (error) {
        return error.errors;
    }
};

const specialSaveForm = async (data) => {
    try {
        let res = await fetch(`${config.apiPrefix}/special-register`, {
            method: "PUT",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(data),
        });

        return await res.json();
    } catch (error) {
        return error.errors;
    }
};

const uploadSlip = async (data) => {
    try {
        let res = await fetch(`${config.apiPrefix}/slip`, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "multipart/form-data",
                "Access-Control-Allow-Credentials": true,
            },
            body: data,
        });

        return await res.json();
    } catch (error) {
        return error.errors;
    }
};

export { Login, Logout, SpecialRegister, saveForm, specialSaveForm, uploadSlip, adminLogin, adminGetAllUsers, adminUpdateStatus };
