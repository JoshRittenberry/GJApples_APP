export const getAllOrderPickers = () => {
    return fetch(`/api/orderpickers`).then((res) => res.json())
}

export const getAllHarvesters = () => {
    return fetch(`/api/harvesters`).then((res) => res.json())
}

export const getAllAdmin = () => {
    return fetch(`/api/admin`).then((res) => res.json())
}

export const getAllRoles = () => {
    return fetch(`/api/userprofiles/roles`).then((res) => res.json())
}

export const getAllUsersWithRoles = () => {
    return fetch(`/api/userprofiles/withroles`).then((res) => res.json())
}

export const getUserWithRoles = (userId) => {
    return fetch(`/api/userprofiles/withroles/${userId}`).then((res) => res.json())
}

export const getEmployeeById = (employeeId) => {
    return fetch(`/api/userprofiles/${employeeId}`).then((res) => res.json())
}

export const updateEmployee = (employeeId, update) => {
    return fetch(`/api/userprofiles/${employeeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
    })
}

export const updateEmployeeRole = (employeeId, roleId) => {
    return fetch(`/api/userprofiles/changerole/${employeeId}?roleId=${roleId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const updateEmployeePassword = (newPassword) => {
    newPassword.password = btoa(newPassword.password)
    return fetch(`/api/userprofiles/changepassword`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassword)
    })
}