const _apiUrl = "https://gjapples.azurewebsites.net/api/Auth";

export const login = (email, password) => {
    return fetch(_apiUrl + "/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            Authorization: `Basic ${btoa(`${email}:${password}`)}`,
        },
    }).then((res) => {
        if (res.status !== 200) {
            return Promise.resolve(null);
        } else {
            return tryGetLoggedInUser();
        }
    });
};

export const logout = () => {
    return fetch(_apiUrl + "/logout");
};

export const tryGetLoggedInUser = () => {
    return fetch(_apiUrl + "/me").then((res) => {
        return res.status === 401 ? Promise.resolve(null) : res.json();
    });
};

export const register = (userProfile) => {
    userProfile.password = btoa(userProfile.password);
    return fetch(_apiUrl + "/register", {
        credentials: "same-origin",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
    }).then(() => tryGetLoggedInUser());
};

export const createEmployee = (userProfile, roleName) => {
    userProfile.password = btoa(userProfile.password);
    return fetch(`${_apiUrl}/createemployee?roleName=${roleName}`, {
        credentials: "same-origin",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
    })
};

export const createCustomer = (userProfile) => {
    userProfile.password = btoa(userProfile.password);
    return fetch(`${_apiUrl}/createcustomer`, {
        credentials: "same-origin",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
    })
};
