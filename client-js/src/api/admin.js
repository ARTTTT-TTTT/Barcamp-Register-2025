import config from "../services/config";

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


const checkSlip = async (id) => {
    try {
        let token = window.localStorage.getItem("access_token");

        let res = await fetch(`${config.apiPrefixAuth}/picture/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return await res.json();
    } catch (error) {
        console.error("Error fetching slip:", error);
        return error.errors || { message: "An error occurred" };
    }
};


export { checkSlip, adminLogin, adminGetAllUsers, adminUpdateStatus };
