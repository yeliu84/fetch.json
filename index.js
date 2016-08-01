import _fetch from 'isomorphic-fetch'

const defaultHeaders = {
  'content-type': 'application/json',
  'accept': 'application/json'
}
let headers = defaultHeaders

function fetch (url, options = {
  method: 'GET',
  headers: null,
  body: null
}) {
  options.method = (options.method || 'GET').toUpperCase()
  options.headers = Object.assign({}, headers, options.headers)
  if (options.method === 'GET' || options.method === 'HEAD') {
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
        }, error => {
          if (response.ok) {
            return {}
          }
          throw error
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

fetch.headers = _headers => {
  if (!_headers) {
    return headers
  }
  const newHeaders = {}
  Object.keys(_headers).forEach(key => {
    const val = _headers[key]
    if (val) {
      newHeaders[key.toLowerCase()] = val
    }
  })
  headers = Object.assign({}, defaultHeaders, newHeaders)
  return fetch
}

export default fetch
