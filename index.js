import _fetch from 'isomorphic-fetch'

const defaultHeaders = {
  'content-type': 'application/json',
  'accept': 'application/json'
}

function fetch (url, options = {
  method: 'get',
  headers: null,
  body: null
}) {
  options.method = (options.method || 'get').toLowerCase()
  options.headers = Object.assign({}, defaultHeaders, options.headers)
  if (options.method === 'get' || options.method === 'head') {
    delete options.body
  } else if (options.body) {
    options.body = JSON.stringify(options.body)
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

['get', 'post', 'put', 'patch', 'delete', 'head'].forEach(method => {
  fetch[method] = (url, body, options = {}) => {
    options.method = method
    if (body) {
      if (method === 'get' || method === 'head') {
        options = body
      } else {
        options.body = body
      }
    }
    return fetch(url, options)
  }
})

export default fetch
