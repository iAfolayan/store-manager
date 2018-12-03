const productId = window.location.search.substr(1);

(function() { 
  populateForm();
}());

async function populateForm() {
  const categories = await Category.get();
  const product = await Product.getById(productId);
  const productCategory = categories.find(function(cat) {
    return cat.catname === product.category;
  });
  const formContainer = document.querySelector('.userFormControl');
  const form = ProductTemplate.form(product, categories, productCategory.catname);
  formContainer.appendChild(form);
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = new FormData(document.querySelector('#productForm'));
  const formData = {
    productname: form.get('productName'),
    category: form.get('prdCategory'),
    price: form.get('prdPrice'),
    description: form.get('prdDescription'),
    quantity: form.get('prdQuantity'),
    minimumallowed: form.get('prdMinimum'),
    productImage: form.get('image')
  };

  const msg = await Product.update(formData, productId);
  
  if (msg) {
    Action.notify(msg, 'success');
    setTimeout(function() {
      window.location = 'index.html';
    }, 3000);
  }
};