import _fetch from 'isomorphic-fetch'

const defaultHeaders = {
  'content-type': 'application/json',
  'accept': 'application/json'
}
let headers = defaultHeaders

const fetch = (url, options = {
  method: 'GET',
  headers: null,
  body: null
}) => {
  options.method = (options.method || 'GET').toUpperCase()
  if (options.method === 'GET' || options.method === 'HEAD') {
    delete options.body
  } else if (options.body) {
    options.body = JSON.stringify(options.body)
  }
  options.headers = Object.assign({}, headers, Object.entries(options.headers || {})
    .reduce((headers, [key, value]) => {
      if (value) {
        headers[key.toLowerCase()] = value
      }
      return headers
    }, {}))
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
          return Promise.reject({
            status: response.status,
            statusText: response.statusText,
            error
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

fetch.headers = _headers => {
  if (!_headers) {
    return headers
  }
  headers = Object.assign({}, defaultHeaders, Object.entries(_headers)
    .reduce((headers, [key, value]) => {
      if (value) {
        headers[key.toLowerCase()] = value
      }
      return headers
    }, {}))
  return fetch
}

fetch.clearHeaders = () => {
  headers = {}
  return fetch
}

fetch.version = '0.2.5'

export default fetch
