'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultHeaders = {
  'content-type': 'application/json',
  'accept': 'application/json'
};
var headers = defaultHeaders;

function fetch(url) {
  var method = arguments.length <= 1 || arguments[1] === undefined ? 'get' : arguments[1];
  var data = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  method = method.toLowerCase();
  var options = {
    method: method,
    headers: headers
  };
  if (method !== 'get' && method !== 'head' && data) {
    options.body = JSON.stringify(data);
  }
  return (0, _isomorphicFetch2.default)(url, options).then(function (response) {
    return response.json().then(function (data) {
      if (response.ok) {
        return data;
      }
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
        response: data
      });
    });
  });
}

fetch.get = fetch;
fetch.post = function (path, data) {
  return fetch(path, 'post', data);
};
fetch.put = function (path, data) {
  return fetch(path, 'put', data);
};
fetch.patch = function (path, data) {
  return fetch(path, 'patch', data);
};
fetch.delete = function (path) {
  return fetch(path, 'delete');
};

fetch.headers = function (_headers) {
  if (!_headers) {
    return headers;
  }
  headers = Object.assign({}, defaultHeaders, _headers);
  return fetch;
};

exports.default = fetch;
