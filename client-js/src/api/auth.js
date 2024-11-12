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

export { Login, Logout, SpecialRegister, saveForm, uploadSlip };
