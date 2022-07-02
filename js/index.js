// const prodData = [{
//             img: "https://picsum.photos/1000",
//             title: "Product 1",
//             price: 10,
//         },
//         {
//             img: "https://picsum.photos/1001",
//             title: "Product 2",
//             price: 20,
//         },
//         {
//             img: "https://picsum.photos/1002",
//             title: "Product 3",
//             price: 30,
//         },
//         {
//             img: "https://picsum.photos/1003",
//             title: "Product 4",
//             price: 40,
//         }
//     ]
let prodData;
const getProdData = async() => {
    const response = await fetch('https://flint-backendserver.herokuapp.com/products').then(res => res.json()).then(data => {
        console.log(data);
        prodData = data;
    });
}
getProdData().then(() => {
    // grab store-div element and append products to it
    const storeDiv = document.getElementById('store-div');
    prodData.forEach(prod => {
        const prodDiv = document.createElement('div');
        prodDiv.classList.add('swiper-slide');
        prodDiv.innerHTML = `
        <div class="store-product-card">
        <a href="/store.html" class="store-product-image-container">
            <img src="${prod.img}" class="store-product-image" />
            </a>

            <a href="/store.html" class="store-product-name">${prod.title}</a>
            <h2 class="store-product-price">$${prod.price}</h2>
            </div>
            `;
        storeDiv.appendChild(prodDiv);
    })
});