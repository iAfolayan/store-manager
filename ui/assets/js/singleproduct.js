/* eslint-disable no-undef */
const { host } = window.location;

let hostedServer = null;

if (host === 'localhost:4000') {
  hostedServer = 'http://localhost:4000/api/v1/';
} else {
  hostedServer = 'https://store-manager-iafolayan.herokuapp.com/api/v1/';
}
const token = localStorage.getItem('authorization');

if (!token) window.location = '..index.html';

const productid = window.location.search;

const decoded = jwt_decode(token);

if (decoded.role !== 1) window.location = 'addproduct.html';

const url = `${hostedServer}products/${productid.substring(1)}`;

fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    authorization: token
  }
})
  .then(data => data.json())
  .then((response) => {
    if (response.status !== true) return userFeeddbackMessage(response.msg, 'error');
    // proCategory, proPrice, proInStock, proInfo, proImage
    const product = response.data;
    document.querySelector('.proName').innerHTML = product.productname;
    document.querySelector('.proNametd').textContent = product.productname;
    document.querySelector('.category').textContent = product.category;
    const nairaSign = 'N';
    const { price } = product;
    const priceNaira = nairaSign.concat(price);
    document.querySelector('.price').textContent = priceNaira;
    document.querySelector('.quantity').textContent = product.quantity;
    document.querySelector('.article').innerHTML = product.description;
    const imgsrc = '../assets/images/';
    const { image } = product;
    const imagelink = imgsrc.concat(image);

    document.querySelector('.prodImage').src = imagelink;

    const link = 'editProduct.html?';
    const { id } = product;
    const editProductLink = link.concat(id);
    document.querySelector('.editLink').href = editProductLink;

    const stockText = 'In Stock: ';
    const { quantity } = product;

    const instock = stockText.concat(quantity);

    document.querySelector('.inStock').textContent = instock;

    body.insertAfter(pageTitle_, prdDisplay);
  })
  .catch(error => userFeedbackMessage(error, 'error'));
