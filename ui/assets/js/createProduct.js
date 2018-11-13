/* eslint-disable no-undef */
const url = 'https://store-manager-iafolayan.herokuapp.com/api/v1/products';
// const url = 'http://localhost:4000/api/v1/products/';

const createProductForm = document.getElementById('createProductForm');

const createProductFun = (event) => {
  event.preventDefault();

  const formData = {
    
    productname: createProductForm.prdName.value,
    price: createProductForm.prdPrice.value,
    quantity: createProductForm.prdQuantity.value,
    description: createProductForm.prdDescription.value,
    category: createProductForm.prdCategory.value,
    minimumallowed: createProductForm.prdMinimum.value
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status !== true) {
        return userFeedbackMessage(response.msg, 'error');
      }

      window.location = 'createproduct.html';
      return userFeedbackMessage(response.msg, 'success');
    });
};

const newProduct = document.getElementById('newProduct');

newProduct.addEventListener('click', createProductFun);
