let productId;

(function() {
  document.addEventListener('DOMContentLoaded', populate);
}());

async function populate() {
  const products =  await Product.get();
  const tbody = document.querySelector('.prdDisplay_');
  products.map(function(product) {
    tbody.appendChild(ProductTemplate.view(product));
  });
}

async function deleteProduct() {
  const msg = await Product.remove(productId);

  if (msg) {
    Action.notify(msg, 'success');
    const row = document.querySelector(`#${productId}`);
    const list = document.querySelector('.prdDisplay_');
    list.removeChild(row);

    Product.get();
  }

  toggleModal();
}

function deleteAction(prodId) {
  productId = prodId;
  toggleModal();
}