const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            },
        },
        900: {
            slidesPerView: 3,
            spaceBetween: 70,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            },
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            },
        }
    }
});

// cart js

var username = localStorage.getItem('username');
var email = localStorage.getItem('email');
// implement save function that saves the data of username adn email from corresponding elements from modal
function saveValues() {
    username = document.getElementById('username').value;
    email = document.getElementById('email').value;
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    $('#usernameEmailModal').modal('hide');
    if (currentProd) {
        shoppingCart.addItemToCart(currentProd.name, currentProd.price, currentProd.count);
        displayCart();
    }
    // dismiss modal with id usernameEmailModal
}
// implmement function updateUsernameEmail, that takes username and email, and changes the value of variables username and email, and then saves them to localStorage
function updateUsernameEmail(userVal, emailVal) {
    console.log('updating values')
    username = userVal;
    email = emailVal;
    localStorage.setItem('username', userVal);
    localStorage.setItem('email', emailVal);
    console.log(username, emailVal)
}

var currentProd = {};

function handleOrder() {
    console.log(shoppingCart.listCart());
    var cartArray = shoppingCart.listCart();
    var orderDetails = {
        username: username,
        email: email,
        products: cartArray
    }
    hideModalUserModal();
    showPostOrderModal();
    // network post request with the orderDetails object
    fetch('/api/orders', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(response => response.json())
        .then(data => {
            updateCartId('');
        })
}

// hidemodal function that hides the modal
const hideModalUserModal = () => {
    console.log('in hide')
    $('#cart').modal('hide');

}

const showPostOrderModal = () => {
    $('#postOrderModal').modal('show');
}

var cartId = '';

// update cart id method that updates the cartId variable and then saves the value in local storage
function updateCartId(id) {
    cartId = id;
    localStorage.setItem('cartId', id);
}

const updateCart = () => {
    // network post request with the orderDetails object
    var cartArray = shoppingCart.listCart();
    if (cartId != '') {
        var orderDetails = {
            username: username,
            email: email,
            products: cartArray,
            cart_idd: cartId
        }
    } else
        var orderDetails = {
            username: username,
            email: email,
            products: cartArray
        }
    console.log(orderDetails);
    fetch('/api/orders', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(response => response.json())
        .then(data => {
            updateCartId(data._id);
        })
}



// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================



    // function that shows a modal that has 2 inputs name and email
    function showModal() {
        $('#usernameEmailModal').modal('show');
    }

    cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function(name, price, count) {
            // check for usename and email, and if not present, show modal
            console.log('add to cart', username, email)
            if (username == null || username == "" || email == null || email == "") {
                console.log(username, email)
                    // check for username against elements by id if present, then bypass modal showing

                if (localStorage.getItem('username') != null && localStorage.getItem('email') != "" && localStorage.getItem('username') != null && localStorage.getItem('email') != "") {
                    updateUsernameEmail(localStorage.getItem('username'), localStorage.getItem('email'));
                } else {
                    showModal();
                    currentProd = { name: name, price: price, count: count };
                    return;
                }
            } else {
                currentProd = {};
            }

            for (var item in cart) {
                if (cart[item].name === name) {
                    cart[item].count++;
                    saveCart();
                    return;
                }
            }
            var item = new Item(name, price, count);
            cart.push(item);
            saveCart();
        }
        // Set count from item
    obj.setCountForItem = function(name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function() {
        updateUsernameEmail("", "");
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function() {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function() {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function() {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

function addToCart(event) {
    var name = event.dataset.name;
    var price = Number(event.dataset.price);
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
}

// Clear items
$('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>" +
            "<td>" + cartArray[i].name + "</td>" +
            "<td>(" + cartArray[i].price + ")</td>" +
            "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
            "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
            "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
            "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>" +
            " = " +
            "<td>" + cartArray[i].total + "</td>" +
            "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
        var name = $(this).data('name')
        shoppingCart.removeItemFromCart(name);
        displayCart();
    })
    // +1
$('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();