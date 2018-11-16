/* eslint-disable no-multi-assign */
/* eslint-disable max-len */
/* eslint-disable no-undef */
// Protect page if user is not admin
if (decoded.role !== 1) window.location = '../index.html';
/**
 * @classdesc - tabulateProducts returns all product in Array format
 * @param {*} id - Product Id
 * @param {*} prdTitle - Product Name
 * @param {*} prdCategory - Product Category
 * @param {*} prdQuantity - Product Quantity
 * @param {*} prdPrice - Product price
 * @param {*} prdMinQty - Product Minimum Quantity
 */

// eslint-disable-next-line max-len
const tabulateProducts = (sn, id, prdTitle, prdCategory, prdPrice, prdQuantity, prdMinQty) => `<tr id="${id}">
<td>${sn}.</td>
<td>${prdTitle}</td>
<td>${prdCategory}</td>
<td>&#8358;${prdPrice}</td>
<td>${prdQuantity}</td>
<td>${prdMinQty}</td>
<td>
  <a href="editProduct.html?${id}">
    <button class="editBtn modifyBtn">Edit </button>
  </a>
    <button onclick="deleteAction('${id}')" class="deleteBtn modifyBtn">Delete</button>
</td>
</tr>
<tr>
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
    let sn = 0;
    if (response.data === 0) return userFeedbackMessage(err, 'error');

    const products = response.data
      // eslint-disable-next-line no-return-assign
      .map(product => tabulateProducts(sn += 1, product.id, product.productname, product.category, product.quantity, product.price, product.minimumallowed)).join('');

    document.querySelector('.prdDisplay_').innerHTML = products;

  })
  .catch(err => userFeedbackMessage('No product found', 'danger'));
