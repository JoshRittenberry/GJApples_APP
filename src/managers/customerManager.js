const _apiUrlUserProfiles = "https://gjapples.azurewebsites.net/api/userprofiles"
const _apiUrlCustomers = "https://gjapples.azurewebsites.net/api/customers"

export const getAllCustomers = () => {
    return fetch(_apiUrlCustomers).then((res) => res.json())
}

export const getCustomerById = (customerId) => {
    return fetch(`${_apiUrlUserProfiles}/${customerId}`).then((res) => res.json())
}

export const updateCustomer = (customerId, update) => {
    return fetch(`${_apiUrlUserProfiles}/${customerId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
    })
}

export const updateCustomerPassword = (newPassword) => {
    newPassword.password = btoa(newPassword.password)
    return fetch(`${_apiUrlUserProfiles}/changepassword`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassword)
    })
}