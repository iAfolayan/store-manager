/* eslint-disable no-undef */
// Protect page if user did not login

const addToCart = '<a href="#"><button type="button">Add to Cart</button></a>';

const userMenu = (decoded.role === 1) ? '' : addToCart;

const detailMenu = (decoded.role === 1) ? '/attendant/productDetails.html' : '/attendant/addproduct.html';
/**
 * @classdesc - getAllAvailableProducts returns all product in Array format
 * @param {*} id - Product Id
 * @param {*} prdTitle - Product Name
 * @param {*} prdImage - Product Image
 * @param {*} prdDescription - Product Description
 * @param {*} prdPrice - Product price
 * @param {*} prdMinQty - Product Minimum Quantity
 */

const getAllAvailableProducts = (id, prdTitle, prdImage, prdDescription, prdPrice, prdMinQty) => `<div class="card_4_column">
  <div class="productHolderCard">
    <div class="product-title" data-product=${id}>
              <h5><strong>${prdTitle}</h5>
          </div>
          <a href="${detailMenu}?${id}">
            <div class="img-holder">
                <img src="../assets/images/${prdImage}" alt="">
                  <div class="img-overlay">
                      <article>
                    ${prdDescription}
                  </article>
                  </div>

                  <h3>&#8358;${prdPrice}.00 / piece</h3>
            </div>
        </a>
          <div class="dets">
              ${userMenu}
              <small>Minimum Qty ${prdMinQty}</small>
          </div>
  </div>
  </div>
  `;

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
    const products = response.data
      .map(product => getAllAvailableProducts(product.id, product.productname, product.image, product.description.substring(0, 36), product.price, product.minimumallowed)).join('');

    const body = document.querySelector('body');
    const pageTitle_ = document.querySelector('.pageTitle_');
    // eslint-disable-next-line no-multi-assign
    const prdDisplay = document.querySelector('.productDisplay').innerHTML = products;

    body.inserAfter(pageTitle_, prdDisplay);
  })
  .catch(err => userFeedbackMessage(err, 'error'));
