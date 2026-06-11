let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let title = document.getElementById("title");
let count = document.getElementById("count");
let category = document.getElementById("category");

let create = document.getElementById("create");
let search = document.getElementById("search");

let all = document.getElementById("all");
let tbody = document.getElementById("box");

let isUpdating = false;
let updateIndex = -1;

all.addEventListener("click", () => {
    localStorage.clear();
    showData();
});

create.addEventListener("click", function () {
    const priceValue = Number(price.value);
    const taxesValue = Number(taxes.value);
    const adsValue = Number(ads.value);
    const discountValue = Number(discount.value);
    const taxesAmount = priceValue * taxesValue / 100;

    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (isUpdating) {
        products[updateIndex] = {
            title: title.value,
            price: priceValue,
            taxes: taxesValue,
            ads: adsValue,
            discount: discountValue,
            total: (priceValue + taxesValue + adsValue) - discountValue,
            category: category.value
        };
        isUpdating = false;
        updateIndex = -1;

    } else {
        const product = {
            title: title.value,
            price: priceValue,
            taxes: taxesAmount,
            ads: adsValue,
            discount: discountValue,
            total: (priceValue + taxesAmount + adsValue) - discountValue,
            category: category.value,
        };

        for (let i = Number(count.value); i > 0; i--) {
            products.push(product);
        }
    }

    localStorage.setItem("products", JSON.stringify(products));
    showData();
    clearInputs();
});


function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    showData();
}


function updateProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    title.value = products[index].title;
    price.value = products[index].price;
    taxes.value = products[index].taxes;
    ads.value = products[index].ads;
    discount.value = products[index].discount;
    category.value = products[index].category;

    isUpdating = true;
    updateIndex = index;
}


function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
}


search.addEventListener("input", function () {
    let searchValue = search.value.toLowerCase();
    if (searchValue === "") {
        showData();
        return;
    }
    const products = JSON.parse(localStorage.getItem("products")) || [];
    tbody.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        if (products[i].title.toLowerCase().includes(searchValue)) {
            tbody.innerHTML += `<tr>
                <td>${i + 1}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button onclick="updateProduct(${i})">update</button></td>
                <td><button onclick="deleteProduct(${i})">delete</button></td>
            </tr>`;
        }
    }
});


function showData() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    tbody.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        tbody.innerHTML += `<tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateProduct(${i})">update</button></td>
            <td><button onclick="deleteProduct(${i})">delete</button></td>
        </tr>`;
    }


    if (products.length === 0) {
        all.style.display = "none";
    } else {
        all.style.display = "block";
    }
}

showData();