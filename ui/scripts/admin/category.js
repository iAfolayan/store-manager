async function handleSubmit(event) {
  event.preventDefault();

  const addNewCategory = document.querySelector('#addNewCategory');

  const formData = {
    catname: addNewCategory.categoryName.value
  };

  const msg = await Category.create(formData);

  if (msg) {
    Action.notify(msg, 'success');
    setTimeout(function() {
      window.location = 'category.html';
      return Action.notify(response.msg, 'success');
    }, 3000);
  };
}

document.querySelector('#newCategory').addEventListener('click', handleSubmit);