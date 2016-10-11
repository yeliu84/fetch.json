'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultHeaders = {
  'content-type': 'application/json',
  'accept': 'application/json'
};
var headers = defaultHeaders;

function fetch(url) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {
    method: 'GET',
    headers: null,
    body: null
  } : arguments[1];

  options.method = (options.method || 'GET').toUpperCase();
  options.headers = Object.assign({}, headers, options.headers).filter(function (_ref) {
    var key = _ref.key;
    var val = _ref.val;
    return val;
  });
  if (options.method === 'GET' || options.method === 'HEAD') {
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
    }, function (error) {
      if (response.ok) {
        return {};
      }
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
        error: error
      });
    });
  });
}

['get', 'post', 'put', 'patch', 'delete', 'head'].forEach(function (method) {
  fetch[method] = function (url, body) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    options.method = method;
    if (body) {
      if (method === 'get' || method === 'head') {
        options = body;
      } else {
        options.body = body;
      }
    }
    return fetch(url, options);
  };
});

fetch.headers = function (_headers) {
  if (!_headers) {
    return headers;
  }
  var newHeaders = _headers.map(function (_ref2) {
    var key = _ref2.key;
    var val = _ref2.val;
    return _defineProperty({}, key.toLowerCase(), val);
  });
  headers = Object.assign({}, defaultHeaders, newHeaders);
  return fetch;
};

fetch.clearHeaders = function () {
  headers = {};
  return fetch;
};

exports.default = fetch;
