const _apiUrl = "https://gjapples.azurewebsites.net/api/apples"

export const getAllApples = () => {
    return fetch(_apiUrl).then((res) => res.json())
}

export const getAppleVarieties = () => {
    return fetch(_apiUrl).then((res) => res.json())
}

export const getAppleById = (appleId) => {
    return fetch(`${_apiUrl}/${appleId}`).then((res) => res.json())
}

export const createNewApple = (apple) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apple),
    })
}

export const editApple = (apple) => {
    return fetch(`${_apiUrl}/${apple.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apple),
    })
}
