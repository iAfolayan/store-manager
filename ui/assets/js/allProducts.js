function getProducts(product) {
  const { 
id, productname, price, description, minimumallowed, image 
} = product;
  const addToCart = `<button type="button" onclick="addToCart('${id}')" class="addToCart">Add to Cart</button>`;
  const userMenu = (decoded.role === 1) ? '' : addToCart;
  const detailMenu = (decoded.role === 1) ? '/attendant/productDetails.html' : '/attendant/addproduct.html';
  const dom = `
    <div class="card_4_column">
      <input type="hidden" name="productId" value="${id}">
      <div class="productHolderCard">
        <h5 class="product-title"><strong>${productname}</h5>
        <a href="${detailMenu}?${id}">
          <div class="img-holder">
            <img class="cart-image" src="../assets/images/${image}" alt="">
            <div class="img-overlay"><article>${description.substring(0, 40)}</article></div>
            <h3 data-price="${price}">&#8358;${price}.00 / piece</h3>
          </div>
        </a>
        <div class="dets">${userMenu} <small>Minimum Qty ${minimumallowed}</small></div>
      </div>
    </div>`;
  return dom;
}


const url = `${hostedServer}products/`;

fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    authorization: token
  }
})
  .then(data => data.json())
  .then((response) => {
    const products = response.data.map(product => getProducts(product)).join('');
    // eslint-disable-next-line no-multi-assign
    document.querySelector('.productDisplay').innerHTML = products;
    localStorage.setItem('products', JSON.stringify(response.data));
  })
  .catch(err => userFeedbackMessage(err, 'error'));
