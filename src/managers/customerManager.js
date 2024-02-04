export const getAllCustomers = () => {
    return fetch(`/api/customers`).then((res) => res.json())
}

export const getCustomerById = (customerId) => {
    return fetch(`/api/userprofiles/${customerId}`).then((res) => res.json())
}

export const updateCustomer = (customerId, update) => {
    return fetch(`/api/userprofiles/${customerId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
    })
}

export const updateCustomerPassword = (newPassword) => {
    newPassword.password = btoa(newPassword.password)
    return fetch(`/api/userprofiles/changepassword`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassword)
    })
}