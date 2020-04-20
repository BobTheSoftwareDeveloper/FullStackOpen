import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  console.log("get all")
  return axios.get(baseUrl).then(response => response.data)
}

const add = newPerson => {
  console.log("add new person", newPerson)
  return axios.post(baseUrl, newPerson).then(response => response.data)
}

const update = (id, updatePerson) => {
  console.log("update", id, updatePerson) 
  return axios.put(`${baseUrl}/${id}`, updatePerson).then(response => response.data)
}

const remove = (id) => {
  console.log("remove", id)
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default {
  getAll,
  add,
  update,
  remove
}