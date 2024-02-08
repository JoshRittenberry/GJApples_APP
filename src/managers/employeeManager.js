const _apiUrlUserProfiles = "https://gjapples.azurewebsites.net/api/userprofiles"
const _apiUrlOrderPickers = "https://gjapples.azurewebsites.net/api/orderpickers"
const _apiUrlHarvesters = "https://gjapples.azurewebsites.net/api/harvesters"
const _apiUrlAdmin = "https://gjapples.azurewebsites.net/api/admin"



export const getAllOrderPickers = () => {
    return fetch(_apiUrlOrderPickers).then((res) => res.json())
}

export const getAllHarvesters = () => {
    return fetch(_apiUrlHarvesters).then((res) => res.json())
}

export const getAllAdmin = () => {
    return fetch(_apiUrlAdmin).then((res) => res.json())
}

export const getAllRoles = () => {
    return fetch(`${_apiUrlUserProfiles}/roles`).then((res) => res.json())
}

export const getAllUsersWithRoles = () => {
    return fetch(`${_apiUrlUserProfiles}/withroles`).then((res) => res.json())
}

export const getUserWithRoles = (userId) => {
    return fetch(`${_apiUrlUserProfiles}/withroles/${userId}`).then((res) => res.json())
}

export const getEmployeeById = (employeeId) => {
    return fetch(`${_apiUrlUserProfiles}/${employeeId}`).then((res) => res.json())
}

export const updateEmployee = (employeeId, update) => {
    return fetch(`${_apiUrlUserProfiles}/${employeeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
    })
}

export const updateEmployeeRole = (employeeId, roleId) => {
    return fetch(`${_apiUrlUserProfiles}/changerole/${employeeId}?roleId=${roleId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const updateEmployeePassword = (newPassword) => {
    newPassword.password = btoa(newPassword.password)
    return fetch(`${_apiUrlUserProfiles}/changepassword`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassword)
    })
}