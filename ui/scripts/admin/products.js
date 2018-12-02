(function() {
  document.addEventListener('DOMContentLoaded', populate);
}());

async function populate() {
  const products = await Product.get();
  const productList = products.map(function(product) {
    return ProductTemplate.item(product);
  }).join('');

  document.querySelector('.productDisplay').innerHTML = productList;
}