import _fetch from 'isomorphic-fetch'

const defaultHeaders = {
  'content-type': 'application/json',
  'accept': 'application/json'
}
let headers = defaultHeaders

function fetch (url, method = 'get', data = null) {
  method = method.toLowerCase()
  const options = {
    method,
    headers
  }
  if (method !== 'get' && method !== 'head' && data) {
    options.body = JSON.stringify(data)
  }
  return _fetch(url, options)
    .then(response => {
      return response.json()
        .then(data => {
          if (response.ok) {
            return data
          }
          return Promise.reject({
            status: response.status,
            statusText: response.statusText,
            response: data
          })
        })
    })
}

fetch.get = fetch
fetch.post = (path, data) => fetch(path, 'post', data)
fetch.put = (path, data) => fetch(path, 'put', data)
fetch.delete = (path) => fetch(path, 'delete')

fetch.headers = _headers => {
  if (!_headers) {
    return headers
  }
  headers = Object.assign({}, defaultHeaders, _headers)
  return fetch
}

export default fetch
