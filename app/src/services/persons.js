import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const updateNumber = (id, updatedData) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedData)
    return request.then(response => response.data)
}

const destroyPerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
}


export default { getAll, create, updateNumber, destroyPerson }