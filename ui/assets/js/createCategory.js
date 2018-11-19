/* eslint-disable no-undef */
const url = `${hostedServer}category/`;

const addNewCategory = document.querySelector('#addNewCategory');

const createCategoryFun = (event) => {
  event.preventDefault();

  const formData = {
    catname: addNewCategory.categoryName.value
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify(formData),
  })
    .then(data => data.json())
    .then((response) => {
      if (response.status !== true) {
        return userFeedbackMessage(response.msg, 'danger');
      }

      window.location = 'category.html';
      return userFeedbackMessage(response.msg, 'success');
    })
    .catch(err => userFeedbackMessage('Unable to create category', 'danger'))
};

document.querySelector('#newCategory')
  .addEventListener('click', createCategoryFun);
