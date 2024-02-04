const _apiUrl = "/api/orders"

export const getAllOrders = () => {
    return fetch(_apiUrl).then((res) => res.json())
}

export const getAllUnassignedOrders = () => {
    return fetch(`${_apiUrl}?unassigned=true`).then((res) => res.json())
}

export const getOrderPickerAssignment = () => {
    return fetch(`${_apiUrl}/orderpicker`).then((res) => res.json())
}

export const getUnsubmittedOrder = () => {
    return fetch(`${_apiUrl}/unsubmitted`).then((res) => res.json())
}

export const getOrderById = (orderId) => {
    return fetch(`${_apiUrl}/${orderId}`).then((res) => res.json())
}

export const createOrderItem = (orderItem) => {
    return fetch(`${_apiUrl}/orderitem`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItem),
    })
}

export const increaseOrderItem = (orderItemId) => {
    return fetch(`${_apiUrl}/orderitem/${orderItemId}/increase`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const decreaseOrderItem = (orderItemId) => {
    return fetch(`${_apiUrl}/orderitem/${orderItemId}/decrease`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const assignOrderPicker = (orderId, orderPickerId) => {
    return fetch(`${_apiUrl}/${orderId}/assignorderpicker?employeeId=${orderPickerId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const unassignOrderPicker = (orderId, orderPickerId) => {
    return fetch(`${_apiUrl}/${orderId}/unassignorderpicker?employeeId=${orderPickerId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const submitOrder = (orderId) => {
    return fetch(`${_apiUrl}/${orderId}/submit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
}

export const completeOrder = (orderId) => {
    return fetch(`${_apiUrl}/${orderId}/complete`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
}

export const cancelOrder = (orderId) => {
    return fetch(`${_apiUrl}/${orderId}/cancel`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
}

export const deleteOrderItem = (orderItemId) => {
    return fetch(`${_apiUrl}/orderitem/${orderItemId}`, {
        method: "DELETE"
    })
}