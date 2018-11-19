// Get available category
getCategories();

// Get productId fro url
const productid = window.location.search;

getSingleProductDetail(productid);

const editProductForm = document.querySelector('#editProductForm');

const editProductFun = (event) => {
  event.preventDefault();

  const formData = {
    productname: editProductForm.prdName.value,
    price: editProductForm.prdPrice.value,
    quantity: editProductForm.prdQuantity.value,
    description: editProductForm.prdDescription.value,
    image: editProductForm.prdImage.value,
    category: editProductForm.prdCategory.value,
    minimumallowed: editProductForm.prdMinimum.value,
    createdon: editProductForm.createdon.value
  };
   
  const url = `${hostedServer}products/${productid.substring(1)}`;

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status !== true) return userFeedbackMessage(response.msg, 'danger');

      window.location = 'admin.html';
      return userFeedbackMessage(response.msg, 'success');
    })
    .catch(error => userFeedbackMessage('Unable to update product', 'danger'));
};

document.querySelector('#updateProductBtn').addEventListener('click', editProductFun);
