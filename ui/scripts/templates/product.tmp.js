const ProductTemplate = (function() {
  const decoded = Auth.getDecodedToken();
  function item(product) {
    const { id, productname, price, description, minimumallowed, image } = product;
    const addToCart = `<button type="button" onclick="addToCart('${id}')" class="addToCart">Add to Cart</button>`;
    const userMenu = (decoded.role === 1) ? '' : addToCart;
    const detailMenu = (decoded.role === 1) ? '/admin/productDetail.html' : '/attendant/productDetail.html';
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
  };

  function detail(product) {
    const { id, image, productname, category, price, quantity, description } = product;
    const frag = document.createElement('div');
    const dom = `
      <div class="productImageHolder">
        <img class="prodImage" src="${image}" alt="product Image" title="product Image">
      </div>
      <div class="productInformation">
        <h4 class="proName">${productname}</h4>
        <table class="tblDisplay" border="1" cellpadding="10" cellspacing="5">
          <thead>
            <tr>
              <th>PRODUCT NAME</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="proNametd">${productname}</td>
              <td class="category">${category}</td>
              <td class="price">&#8358;${price}</td>
              <td class="quantity">${quantity}</td>
            </tr>
          </tbody>
        </table>
        <article class="article">${description}</article>
        <section class="proDetails">
          <a class="editLink" href="editProduct.html?${id}" title="Edit product">Edit Product</a>
        </section>
      </div>
    `;

    frag.innerHTML = dom;
    return frag;
  }

  function form(product, categories, selectedCat) {
    if(!product) {
      product = {
        productname: '',
        category: '',
        image: '',
        description: '',
        quantity: '',
        minimumallowed: ''
      }
    }
    const formElement = document.createElement('form');
    const select = document.createElement('select');
    
    formElement.setAttribute('id', 'productForm');
    formElement.setAttribute('enctype', 'multipart/form-data');

    select.setAttribute('name', 'prdCategory');
    select.setAttribute('id', 'prdCategory');
    select.classList.add('formInput');

    const options = categories.map(function(category) {
      return category.catname === selectedCat
        ? `<option selected value="${category.catname}">${category.catname}</option>`
        : `<option value="${category.catname}">${category.catname}</option>`;
    });

    options.unshift('<option value="">Select Category</option>');
    select.innerHTML = options.join('');
    
    const dom = `
      <input type="hidden" name="image" value="${product.image}">
      <div>
        <label for="productName">Name: <sup>*</sup>
          <input type="text" class="formInput" name="productName" id="prdName" required placeholder="Enter prodct name eg. Wireless Bluetooth" value="${product.productname}">
        </label>
      </div>
      <div>
        <label id="prdCatLabel" for="prdCategory"> Category: <sup>*</sup>
        </label>
      </div>
      <div>
        <label for="price"> Price: <sup>*</sup>
          <input type="number" class="formInput" name="prdPrice" id="prdPrice" min="1" required placeholder="Enter price per piece eg. N2500" value="${product.price}">
        </label>
      </div>
      <div>
        <label for="prdImage"> Image:
          <input type="file" class="formInput" name="prdImage" id="prdImage">
        </label>
      </div>
      <div>
        <label for="prdDescription"> Description: <sup>*</sup>
          <textarea name="prdDescription" id="prdDescription" placeholder="Product Description" class="formInput">${product.description}</textarea>
        </label>
      </div>
      <div class="column_6 inputMargin">
        <label for="quantity"> Quantity: <sup>*</sup>
        <input type="number" class="formInput" name="prdQuantity" id="prdQuantity" min="1" required placeholder="Enter product quantity in stock eg. 2500" value="${product.quantity}">
        </label>
      </div>
      <div class="column_6">
        <label for="prdMinimum"> Minimum Quantity Allowed: <sup>*</sup>
          <input type="number" class="formInput" name="prdMinimum" id="prdMinimum" min="1" placeholder="Minimum value" value="${product.minimumallowed}">
        </label>
      </div>
      <div class="btnSpacing">
        <input type="submit" onclick="handleSubmit(event)" name="newProduct" id="newProduct" class="loginBtn" value="save">
      </div>
    `;
    
    formElement.innerHTML = dom;
    formElement.querySelector('#prdCatLabel').appendChild(select);
    return formElement;
  };

  function view(product) {
    const { id, productname, category, price, quantity, minimumallowed } = product;
    const row = document.createElement('tr');
    
    row.setAttribute('id', id);

    const dom = `
      <td>${productname}</td>
      <td>${category}</td>
      <td>&#8358;${price}</td>
      <td>${quantity}</td>
      <td>${minimumallowed}</td>
      <td>
        <a href="editProduct.html?${id}">
          <button class="editBtn modifyBtn">Edit </button>
        </a>
          <button onclick="deleteAction('${id}')" class="deleteBtn modifyBtn">Delete</button>
      </td>
    `;

    row.innerHTML = dom;

    return row;
  }

  return { item, detail, form, view };
}());

const UserTemplate = (function() {
  const decoded = Auth.getDecodedToken();
  function view(users) {
    const { id, staffid, firstname, lastname } = users;
    const row = document.createElement('tr');
    row.setAttribute('id', id);
    const dom = `
      <td>${staffid}</td>
      <td>${lastname}</td>
      <td>${firstname}</td>
      <td>
        <label class="userLabel">
          <input type="checkbox" name="makeAdmin" class="makeAdmin" /> Make Admin
        </label>
        <label class="userLabel">
          <input type="checkbox" name="disableUser" class="disableUser" /> Disable User
        </label>
      </td>
    `;
    row.innerHTML = dom;
    return row;
  }

  return { view };
}())