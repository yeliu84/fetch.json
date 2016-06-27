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

function fetch(url) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {
    method: 'get',
    headers: null,
    body: null
  } : arguments[1];

  options.method = (options.method || 'get').toLowerCase();
  options.headers = Object.assign({}, defaultHeaders, options.headers);
  if (options.method === 'get' || options.method === 'head') {
    delete options.body;
  } else if (options.body) {
    options.body = JSON.stringify(options.body);
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

['get', 'post', 'put', 'patch', 'delete'].forEach(function (method) {
  fetch[method] = function (url, body) {
    return fetch(url, { method: method, body: body });
  };
});

exports.default = fetch;
