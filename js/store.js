const prodData = [{
            img: "https://picsum.photos/1000",
            title: "Product 1",
            price: 10,
        },
        {
            img: "https://picsum.photos/1001",
            title: "Product 2",
            price: 20,
        },
        {
            img: "https://picsum.photos/1002",
            title: "Product 3",
            price: 30,
        },
        {
            img: "https://picsum.photos/1003",
            title: "Product 4",
            price: 40,
        }
    ]
    // grab store-div element and append products to it
const storeDiv = document.getElementById('store-container');
storeDiv.innerHTML = "";
prodData.forEach(prod => {
    const prodDiv = document.createElement('div');
    prodDiv.className = "col-lg-3 col-md-6 col-sm-6 card-ele";
    prodDiv.innerHTML = `
    <div class="card">
        <img class="card-img-top" src="${prod.img}" alt="Card image cap">
        <div class="card-block m-auto">
            <h4 class="card-title p-3">${prod.title}</h4>
            <p class="card-text">Price: $${prod.price}</p>
            <button onclick="addToCart(this)" data-name="${prod.title}" data-price="${prod.price}" class="add-to-cart btn btn-primary m-3">Add to
                cart</button>
        </div>
    </div>
`;
    storeDiv.appendChild(prodDiv);
})