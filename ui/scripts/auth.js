/**
 * 
 * declarations
 * 
 */
const token = localStorage.getItem('authorization');
const { host } = window.location;
let baseUrl = host === 'localhost:4000'
  ? 'http://localhost:4000/api/v1/'
  : 'https://store-manager-iafolayan.herokuapp.com/api/v1/';

/**
 * 
 * Auth Class
 * 
 */
const Auth = (function() {
  function resHandler(response) {
    if (response.status !== true) {
      return Action.notify(response.msg, 'danger');
    }
  
    localStorage.setItem('authorization', response.data);
    decoded = jwt_decode(response.data);
  
    window.location = decoded.role === 1 ? 'admin/index.html' : 'attendant/index.html';
    return Action.notify(response.msg, 'success');
  }
  
  function login() {
    const url = `${baseUrl}auth/login`;
    const loginForm = document.getElementById('loginForm');
    const data = {
      staffId: loginForm.staffId.value,
      password: loginForm.password.value
    };
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const errMsg = 'Unable to log you in, please check your network';
    Request.handle(url, payload, resHandler, errMsg);
  };
  
  function logout() {
    localStorage.removeItem('authorization');
    window.location = '/';
  };

  function getDecodedToken() {
    return jwt_decode(localStorage.getItem('authorization'));
  }

  function getToken() {
    return localStorage.getItem('authorization');
  }

  function hasToken() {
    return !!localStorage.getItem('authorization');
  }

  return { login, logout, getDecodedToken, getToken, hasToken };
}());

/**
 * 
 * Router Class
 * 
 */
const Router = (function() {
  const defaultRoute = {
    '1': '../admin/index.html',
    '2': '../attendant/index.html'
  };

  function route() {
    let url = `/${window.location.pathname.split('/')[1]}`;
    const hasToken = Auth.hasToken();
    let role;

    if (hasToken) {
      role = parseInt(Auth.getDecodedToken().role, 10);
    }

    const routes = {
      '/': function () {
        if (hasToken) {
          window.location.replace(defaultRoute[role]);
        }
      },
      '/admin': function () {
        if (!hasToken) return window.location.replace('/');
        if (role === 2) window.location.replace(defaultRoute[role]);
      },
      '/attendant': function () {
        if (!hasToken) return window.location.replace('/');
        if (role === 1) window.location.replace(defaultRoute[role]);
      }
    };

    routes[url]();
  }

  return { route };
}());

Router.route();