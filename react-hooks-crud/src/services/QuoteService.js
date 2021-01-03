import http from "../http-common"

const getAll = () => {
    return http.get("/quotes")
}

const get = id => {
    return http.get(`/quotes/${id}`)
}

const create = data => {
    return http.post("/quotes", data)
}

const update = (id, data) => {
    return http.put(`/quotes/${id}`, data)
}

const remove = id => {
    return http.delete(`/quotes/${id}`)
}

const removeAll = id => {
    return http.delete(`/tutorials/${id}`)
}

const findByTitle = title => {
    return http.get(`/quotes?title=${title}`)
}

const QuoteService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default QuoteService