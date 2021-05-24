//Get the products
let product_1 = document.querySelector('#p1');
let product_2 = document.querySelector('#p2');
let product_3 = document.querySelector('#p3');
let product_4 = document.querySelector('#p4');
let product_5 = document.querySelector('#p5');
let product_6 = document.querySelector('#p6');
let cart1_check = document.querySelector('#cart1');
let cart_table = document.querySelector('.add_table_row');
// let minus = document.querySelector('#minus');
// let plus = document.querySelector('#plus');
let total_price = document.querySelector('#total');


// Add Event Listener

if (product_1) { product_1.addEventListener('click', cart_list); }
if (product_2) { product_2.addEventListener('click', cart_list); }
if (product_3) { product_3.addEventListener('click', cart_list); }
if (product_4) { product_4.addEventListener('click', cart_list); }
if (product_5) { product_5.addEventListener('click', cart_list); }
if (product_6) { product_6.addEventListener('click', cart_list); }
if (cart_table) { cart_table.addEventListener('click', removeItem); }
// if (minus) { minus.addEventListener('click', reduceItem); }
// if (plus) { minus.addEventListener('click', addItem); }
document.addEventListener('DOMContentLoaded', quantity_load);

var default_cart_object_name = {

    p1: 'Bluetooth Earphone',
    p2: 'Flower Plant Container',
    p3: '3D Mirror wall sicker',
    p4: 'Samsung 85″ 4K 3D Smart Television',
    p5: 'Electric Treadmill Sportena U20',
    p6: 'Casio Edifice EQB-510DC-1ADR Black Metal Watch For Men',

}


var default_cart_object_quantity = {

    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
    p6: 0,

}

var default_cart_object_price = {

    p1: 800,
    p2: 350,
    p3: 650,
    p4: 600000,
    p5: 32000,
    p6: 63150,

}

var sum;
sum = 0;

function cart_list(e) {
    let element = e.target.id
    default_cart_object_quantity[element] += 1
    localStorage.setItem('default_cart_object_quantity', JSON.stringify(default_cart_object_quantity));
    calculate_sum(e);

    e.preventDefault();
}


function calculate_sum() {
    sum = 0

    for (let i in default_cart_object_price) {

        sum += default_cart_object_price[i] * default_cart_object_quantity[i]

    }

    console.log(sum);
    return sum



}

function quantity_load() {

    if (localStorage.getItem('default_cart_object_quantity') !== null) {
        default_cart_object_quantity = JSON.parse(localStorage.getItem('default_cart_object_quantity'));
    }

    var quantity_check = false
    for (let i in default_cart_object_quantity) {

        if (default_cart_object_quantity[i] !== 0) {
            quantity_check = true
            break
        }



    }

    if (quantity_check == false) {
        console.log("You have not added any item")

        if (cart1_check) {
            cart1_check.innerHTML = "You have not added any product";
        }

    } else {
        if (cart_table) {

            for (let i in default_cart_object_quantity) {

                if (default_cart_object_quantity[i] !== 0) {


                    let row = document.createElement('tr');
                    row.innerHTML = `
                                    <td>${default_cart_object_name[i]}</td>

                                    <td> 
                                    <Button onclick="reduceItem(this, '${default_cart_object_name[i]}')" style = 'padding: 0; border: none; background: none;' id='minus'>-</Button>
                                    ${default_cart_object_quantity[i]} 
                                    <Button onclick="addItem(this, '${default_cart_object_name[i]}')" style = 'padding: 0; border: none; background: none;' id='plus' >+</Button></td>

                                    <td>${default_cart_object_price[i]}</td>
                                    <td>${default_cart_object_price[i]*default_cart_object_quantity[i]}</td>
                                    <td> <a href="#" class="remove">X</a></td>`
                    cart_table.appendChild(row);
                    // console.log(row)

                }


            }

        }




    }
    if (total_price) {
        total_price.appendChild(document.createTextNode(`Total Price: ${calculate_sum()}`))
    }
}

function removeItem(e) {

    // console.log(e.target)
    if (e.target.hasAttribute("href")) {
        let delete_item = e.target.parentElement.parentElement.children[0].innerText
        e.target.parentElement.parentElement.remove();

        for (let i in default_cart_object_name) {

            if (default_cart_object_name[i] === delete_item) {

                default_cart_object_quantity[i] = 0;
                break
            }



        }
        localStorage.setItem('default_cart_object_quantity', JSON.stringify(default_cart_object_quantity));
        window.location.reload(true);


    }

}

function reduceItem(e, product_name) {


    for (let i in default_cart_object_name) {

        if (default_cart_object_name[i] === product_name) {

            if (default_cart_object_quantity[i] <= 1) {
                alert("Item Quantity can not be less than one!")

            } else {
                default_cart_object_quantity[i] -= 1
                localStorage.setItem('default_cart_object_quantity', JSON.stringify(default_cart_object_quantity));
                window.location.reload(true);
            }
            break

        }

    }
}

function addItem(e, product_name) {

    for (let i in default_cart_object_name) {

        if (default_cart_object_name[i] === product_name) {


            default_cart_object_quantity[i] += 1
            localStorage.setItem('default_cart_object_quantity', JSON.stringify(default_cart_object_quantity));
            window.location.reload(true);

            break

        }

    }

}