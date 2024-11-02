import config from "../../config";

const getUser = async () => {

    try {

        let user = await fetch(`${config.apiPrefixAuth}/login/success`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
        })

        return user.json()

    } catch (error) {

        return {error}

    }

};

export default getUser