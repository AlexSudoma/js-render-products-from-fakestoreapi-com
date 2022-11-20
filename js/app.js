function createStorage() {
  return {
    setProductsBackup: function(newProducts) {
      return products = newProducts;
    },
    getProductsBackup: function() {
      return products;
    }
  }
}

let store = createStorage();

function filterProducts(search) {
  const filteredProducts = store.getProductsBackup().filter(function(productObj, index, array) {
    return productObj.title.toLowerCase().indexOf(search) >= 0 || productObj.category.toLowerCase().indexOf(search) >= 0;
  });
  
  renderProducts(filteredProducts);
}

function renderProducts(products) {
  let htmlStr = '';
  for(let product of products) {
  htmlStr += `
  <div class="col-sm-3">
    <div class = "product">
      <div class="p-4">
        <img class = "card-img-top" src="${product.image}">
      </div>
      <h4 class="card-title">${product.title}</h4>
      <p>Category: ${product.category}</p>
      <div class="text-danger font-weight-bold price">$${product.price}</div>
    </div>
  </div>`
  }

  document.querySelector("#products").innerHTML = htmlStr;
}

document.querySelector('#search').value = '';

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(function(data) {
    const filteredData = data.map(function(el) {
        return {
          image: el.image,
          title: el.title,
          category: el.category,
          price: el.price
        }
      })
      store.setProductsBackup(filteredData);
      renderProducts(filteredData);
    })

document.querySelector("#search").onkeyup = function (e) {
  const searchValue = e.currentTarget.value.trim().toLowerCase();
  filterProducts(searchValue);
};

