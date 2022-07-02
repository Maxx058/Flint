// const prodData = [{
//             img: "https://cdn.dribbble.com/userupload/2948385/file/original-0c2f1b6cd60d4f8933fac510bf0aeb3c.png?resize=400x300",
//             title: "Payment Platform",
//             price: 10,
//         },
//         {
//             img: "https://cdn.dribbble.com/userupload/2837889/file/original-324b267be5f0f3fc0b7f1242872d6e3b.jpg?resize=400x300",
//             title: "Finance Design",
//             price: 20,
//         },
//         {
//             img: "https://cdn.dribbble.com/userupload/2773310/file/original-8805cbb2d31a4ffd237af14003091ad3.jpg?resize=400x300",
//             title: "Finance System",
//             price: 30,
//         },
//         {
//             img: "https://cdn.dribbble.com/userupload/2734890/file/original-3a243e3987398f21a1d70b24f75e3b23.png?resize=400x300",
//             title: "Nurseclub Dashboard",
//             price: 40,
//         }
//     ]
// make network call to retrieve prod data
let prodData;
const getProdData = async() => {
    const response = await fetch('https://flint-backendserver.herokuapp.com/products').then(res => res.json()).then(data => {
        console.log(data);
        prodData = data;
    });
}
getProdData().then(() => {
    const storeDiv = document.getElementById('store-container');
    storeDiv.innerHTML = "";
    prodData.forEach(prod => {
        const prodDiv = document.createElement('div');
        prodDiv.className = "col-lg-3 col-md-6 col-sm-6 card-ele";
        prodDiv.innerHTML = `
    <div class="card">
        <img class="card-img-top" src="${prod.img}" alt="Card image cap">
        <div class="card-block m-auto">
            <h4 class="card-title py-3">${prod.title}</h4>
            <p class="card-text">Price: $${prod.price}</p>
            <button onclick="addToCart(this)" data-name="${prod.title}" data-price="${prod.price}" class="add-to-cart btn btn-primary m-3">Add to
                cart</button>
        </div>
    </div>
`;
        storeDiv.appendChild(prodDiv);
    })
});