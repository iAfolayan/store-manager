const Product = (function() {
  function get() {
    const url = `${baseUrl}products`;
    const payload = {
      method: 'GET',
      headers: {
        authorization: token
      }
    };
    const errMsg = 'Unable to fetch products';

    function resHandler(response) {
      localStorage.setItem('products', JSON.stringify(response.data));
      return response.data;
    }

    return Request.handle(url, payload, resHandler, errMsg);
  }

  function getById(productId) {
    const id = !productId ? window.location.search.substr(1): productId;

    const url = `${baseUrl}products/${id}`;
    const payload = {
      method: 'GET',
      headers: {
        authorization: token
      }
    };
    const errMsg = 'Unable to fetch product';

    function resHandler(response) {
      if (response.status !== true) return Action.notify(response.msg, 'error');
      return response.data;
    }

    return Request.handle(url, payload, resHandler, errMsg);
  };

  function update(formData, productId) {
    const url = `${baseUrl}products/${productId}`;
    const payload = {
      method: 'PUT',
      headers: {
        authorization: token
      },
      body: JSON.stringify(formData)
    };
    const errMsg = 'Unable to update product';

    function handleRes(response) {
      if (response.status !== true) return Action.notify(response.msg, 'danger');
      return response.msg;
    }

    return Request.handle(url, payload, handleRes, errMsg);
  }

  function add(formData) {
    const url = `${baseUrl}products/`;

    const payload = {
      method: 'POST',
      headers: {
        authorization: token
      },
      body: JSON.stringify(formData)
    }

    const errMsg = 'Unable to create product';
    function handleRes(response) {
      if (response.status !== true) return Action.notify(response.msg, 'danger');
      return response.msg
    }

    return Request.handle(url, payload, handleRes, errMsg);
  }

  function remove(productId) {
    const url = `${baseUrl}products/${productId}`;
    const payload = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    };
    const errMsg = 'Unable to delete product. Please, try again';

    function handleRes(response) {
      if (response.status !== true) return Action.notify(response.msg, 'danger');
      return response.msg;
    }
    return Request.handle(url, payload, handleRes, errMsg);
  }

  return { get, getById, update, add, remove };
}());

/**
 * 
 * categories
 * 
 */
const Category = (function() {
  function create(formData) {
    const url = `${baseUrl}category/`;
    const payload = {
      method: 'POST',
      headers: {
        authorization: token
      },
      body: JSON.stringify(formData)
    };

    const errMsg = 'Unable to create category';

    function handleRes(response) {
      if (response.status !== true) {
        Action.notify(response.msg);
      }
      return response.msg;
    }

    return Request.handle(url, payload, handleRes, errMsg);
  };

  function get() {
    const url = `${baseUrl}category`;
    const payload = {
      method: 'GET',
      headers: {
        authorization: token
      }
    };

    function handleRes(response) {
      if (response.status !== true) return Action.notify('Oops!!! Create product category first', 'danger');
      return response.data;
    }
  
    return Request.handle(url, payload, handleRes, 'Something went wrong!');
  }

  return { create, get };
}());

/*
*
* Users
*
*/
const User = (function(){
  function add(formData) {
    const url = `${baseUrl}auth/signup`; 
    const payload = {
      method: 'POST',
      headers: {
        authorization: token
      },
      body: JSON.stringify(formData),
    };
      
    const errMsg = 'Unable to create User. Please try again.';
    function handleRes(response) {
      if (response.status !== true) {
        Action.notify(response.msg, 'danger');
      } else {
        return response.msg;
      }
    }
    return Request.handle(url, payload, handleRes, errMsg);
  }

  function get() {
    const url = `${baseUrl}auth/users`;
    const payload = {
      method: 'GET',
      headers: {
        authorization: token
      }
    }
    const errMsg = 'Unable to fetch users';
    function handleRes(response) {
      if (response.status !== true) {
        Action.notify(response.msg, 'danger');
      } else {
        return response.data;
      }
    }
    return Request.handle(url, payload, handleRes, errMsg);
  }

  function disable(userId) {
    const url = `${baseUrl}auth/users/${userId}`;
    const payload = {
       method: 'PATCH',
       headers: {
         authorization: token
       },
       body: JSON.stringify(userId),
     }
     const errMsg = 'Oop!! Operation failed!';
     function handleRes(response) {
       if (response.status !== true) {
         return Action.notify('Unable to disable User', 'danger');
       }
       return response.msg;
     }

     return Request.handle(url, payload, handleRes, errMsg);
  }

  function getById(staffId) {
    const url = `${baseUrl}auth/users/${staffId}`;
    const payload = {
      method: 'GET',
      headers: {
        authorization: token
      }
    }
    const errMsg = 'Unable to get User';

    function handleRes(response) {
      if (response.status !== true) {
        return Action.notify('Invalid User', 'danger');
      }
      return response.data;
    }

    return Request.handle(url, payload, handleRes, errMsg);
  }

  return  { add, get, disable, getById };
}());