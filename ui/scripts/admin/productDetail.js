const productId = window.location.search.substr(1);

(function() {
  document.addEventListener('DOMContentLoaded', displayProductDetail);
}());

async function displayProductDetail() {
  const product = await Product.getById(productId);
  const dom = ProductTemplate.detail(product);
  const productContainer = document.querySelector('.modifyProduct');

  productContainer.appendChild(dom);
}