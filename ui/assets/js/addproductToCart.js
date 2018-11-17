/* eslint-disable no-undef */


const productid = window.location.search;

// const url = `http://localhost:4000/api/v1/products/`;

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

    const product = response.data;
    const {
      price,
      description,
      image,
      quantity,
      productname,
      category
    } = product;
    document.querySelector('.proName').innerHTML = productname;
    document.querySelector('.proNametd').textContent = productname;
    document.querySelector('.category').textContent = category;
    const nairaSign = '-N';
    const priceNaira = nairaSign.concat(price);
    document.querySelector('.price').textContent = priceNaira;
    document.querySelector('.inStock').textContent = quantity;
    document.querySelector('.article').innerHTML = description;
    const imgsrc = '../assets/images/';

    document.querySelector('.imageLink').src = imgsrc.concat(image);

    const stockText = 'In Stock: ';

    const instock = stockText.concat(quantity);

    document.querySelector('.inStock').textContent = instock;

    body.insertAfter(pageTitle_, prdDisplay);
  })
  .catch(error => userFeedbackMessage(error, 'error'));
