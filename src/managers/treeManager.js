const _apiUrl = "https://gjapples.azurewebsites.net/api/trees"

export const getAllTrees = () => {
    return fetch(_apiUrl).then((res) => res.json())
}

export const getTreeById = (treeId) => {
    return fetch(`${_apiUrl}/${treeId}`).then((res) => res.json())
}

export const getAllUnassignedTrees = () => {
    return fetch(`${_apiUrl}?needsHarvested=true`).then((res) => res.json())
}

export const getHarvesterAssignment = () => {
    return fetch(`${_apiUrl}/assignment`).then((res) => res.json())
}

export const createNewTree = (newTree) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTree),
    })
}

export const createNewTreeHarvestReport = (treeHarvestReport) => {
    return fetch(`${_apiUrl}/harvestreports`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(treeHarvestReport),
    })
}

export const completeHarvesterAssignment = (treeHarvestReportId, treeHarvestReport) => {
    return fetch(`${_apiUrl}/harvestreports/${treeHarvestReportId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(treeHarvestReport),
    })
}

export const editTree = (tree) => {
    return fetch(`${_apiUrl}/${tree.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tree),
    })
}

export const deleteTreeHarvestReport = (treeHarvestReportId) => {
    return fetch(`${_apiUrl}/harvestreports/${treeHarvestReportId}`, {
        method: "DELETE"
    })
}