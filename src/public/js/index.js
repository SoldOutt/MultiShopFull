
var categories = document.querySelector('.categories_menu');
categories.addEventListener('click', function() {
    var categories_list = document.querySelector('.categories_menu ul');
    if (categories_list.style.height == '0px' || categories_list.style.height == 0) {
        var h = 41 * categories_list.childElementCount;
        categories_list.style.height = h + 'px';
    } else {
        categories_list.style.height = '0';
    }
})

// SignIn-SignUp
function Login_toggle() {
    var contain = document.querySelector('section .contain');
    var section = document.querySelector('section');
    contain.classList.toggle('active');
    section.classList.toggle('active');
}

//detail product
// images
var numImg = 1;
var buttonNextImg = document.querySelector('.detail_product-img--next')
var buttonPrevImg = document.querySelector('.detail_product-img--prev')
var product_Img = document.querySelector('.detail_product-img img')
if (buttonNextImg) {

    buttonNextImg.addEventListener('click', function() {
        numImg++;
        if (numImg > 5) numImg = 1;
        var srcImg = `img/product-${numImg}.jpg`
        product_Img.setAttribute('src', srcImg)

    })
}
if (buttonPrevImg) {

    buttonPrevImg.addEventListener('click', function() {
        numImg--;
        if (numImg < 1) numImg = 5;
        var srcImg = `img/product-${numImg}.jpg`
        product_Img.setAttribute('src', srcImg)

    })
}

// cart


var addToCart = document.querySelectorAll('.addToCart')
if(addToCart){
    addToCart.forEach(function(x){
        console.log({x})
        x.addEventListener('click',()=>{
            var idProduct = x.getAttribute('val')
            var link = `http://localhost:3000/products/addToCart/${idProduct}`;
            fetch(link)
            .then(response=>response.json())
            .then(function(data){
                console.log(data)
                console.log('them san pham thanh cong')
                document.querySelector('#product_in_cart').innerHTML = data
            })
            .catch(function(err){console.log('Loi la : ' +err);alert('Ban Can phai dang nhap')})
        })
    })
}


var removeOutCart = document.querySelectorAll('.remove_out_cart')
removeOutCart.forEach(function(item){
    console.log({item})
    item.addEventListener('click',()=>{
        totalCart -= parseInt(item.parentElement.parentElement.children[3].innerHTML)
        document.querySelector('#total_cart').innerHTML = totalCart
        var idProduct = item.getAttribute('val')
        var link = `http://localhost:3000/products/removeOutCart/${idProduct}`;
        item.parentElement.parentElement.hidden = true
        fetch(link)
        .then(response=>response.json())
        .then(function(data){
            console.log(data)
            console.log('xoa san pham thanh cong')
            var ProductInCart = document.querySelector('#product_in_cart').innerHTML
            ProductInCart--
            document.querySelector('#product_in_cart').innerHTML = ProductInCart
        })
        .catch(function(err){console.log('Loi la : ' +err);alert('Ban Can phai dang nhap')})
    })
})
var product_number = document.querySelectorAll('.product_number');
product_number.forEach(function(x) {
    var countProduct = x.children[1]
    var buttonReduce = x.children[0]
    var buttonAdd = x.children[2]
    buttonReduce.addEventListener('click', function() {
        var numProduct = parseInt(countProduct.value);
        if (!numProduct || numProduct <= 0) {
            numProduct = 0;
            countProduct.value = numProduct
        } else {
            numProduct--
            countProduct.value = numProduct
        }
    })
    buttonAdd.addEventListener('click', function() {
        var numProduct = parseInt(countProduct.value);
        if (!numProduct && numProduct != 0) {
            numProduct = 0;
            countProduct.value = numProduct
        } else {
            numProduct++
            countProduct.value = numProduct
        }
    })
})
var listProduct_Buy = document.querySelectorAll('.shopping_cart tbody tr')
var totalCart = 0
listProduct_Buy.forEach(function(item){
    item.children[2].children[0].addEventListener('click',()=>{
        totalCart -= parseInt(item.children[3].innerHTML)
        var price = item.children[1].innerHTML
        var count = item.children[2].children[0].children[1].value
        var sumPriceOfItem = price*count
        item.children[3].innerHTML = sumPriceOfItem
        totalCart+= parseInt(item.children[3].innerHTML)
        document.querySelector('#total_cart').innerHTML = totalCart
    })
    totalCart+= parseInt(item.children[3].innerHTML)
    document.querySelector('#total_cart').innerHTML = totalCart
})



// review
var reviewProduct = document.querySelectorAll('.product_review-cat ul li');
var reviewProduct_box = document.querySelectorAll('.product_review-tab>div');
var reviewProduct_num

reviewProduct.forEach(function(x) {
    x.addEventListener('click', function() {
        var a = document.querySelector('.product_review-cat ul li.active');
        a.classList.remove('active')
        x.classList.add('active')
        reviewProduct_num = x.getAttribute('data-review')
        var reviewTap = document.querySelector('.product_review-tab');
        var reviewTapActive = document.querySelector('.product_review-tab>div.active');
        reviewTapActive.classList.remove('active')
        reviewTap.children[reviewProduct_num].classList.add('active')
    })
})

var formReviewProduct = document.querySelector('#form_review button')
if(formReviewProduct){
    formReviewProduct.addEventListener('click',()=>{
        var idProduct = document.querySelector('input[name="MaSP"]').value
        var content = document.querySelector('textarea[name="review_conten"]').value
        var data = {
            idProduct,
            content
        }
        var options={
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',bat buoc phai co
              },
            body: JSON.stringify(data) // body data type must match "Content-Type" header, gui du lieu di
    
        };
        var link = `http://localhost:3000/products/review?MaSP=${idProduct}&review_conten=${content}`
        fetch(link)
        .then(response=>response.json())
        .then((data)=>{
            console.log(data)
            var userReview = document.querySelector('.box_review')
            userReview.innerHTML +=`<div class="customer_review">
            <div class="customer_img">
                <img src="/img/user.jpg" alt="">
            </div>
            <div class="customer_box_review">
                <h5>${data.userName}<span> -${data.dayDefine}</span></h5>
                <div class="customer_review-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p>${data.review_conten}</p>
            </div>
        </div>`
        })
        .catch(err=>{console.log('co loi khi dang review')})
    })
}


//Add product
var dataURL
var imgProductAdd = document.querySelector('#addImgForProduct')
let reader = new FileReader();
  var openFile = function(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
       dataURL = reader.result;
      var output = document.getElementById('output');
      output.src = dataURL;
      imgProductAdd.value = dataURL
    };
    reader.readAsDataURL(input.files[0]);
  };


//admin
var adminControl = document.querySelectorAll('.admin_control ul li')
var viewData = document.querySelectorAll('.data>table')
console.log(viewData)
adminControl.forEach(function(x) {
    x.addEventListener('click', function() {
        var a = document.querySelector('.admin_control ul li.active')
        a.classList.remove('active')
        x.classList.add('active')
        var dataReview = x.getAttribute('data_review')
        console.log(dataReview)
        var data_Table = document.querySelector('.data>table.active')
        data_Table.classList.remove('active')
        viewData[dataReview].classList.add('active')
    })
})

//Remove User
var buttonRemoveUser = document.querySelectorAll('.remove_user')
console.log(buttonRemoveUser)
buttonRemoveUser.forEach((item)=>{
    item.addEventListener('click',function(){
        var ask = confirm('Bạn có chắc chắn muốn xóa tài khoản này ?')
        if(!ask){
            return
        }
        var makh = item.getAttribute('val')
        console.log(makh)
        var link = `http://localhost:3000/admin/deleteUser/${makh}`
        fetch(link)
        .then((response)=>{
            console.log('xoa tai khoan thanh cong')
            item.parentElement.parentElement.hidden= true
        })
        .catch((err)=>{console.log('khong su dung link xoa nguoi dung duoc ' + err)})
    })
})

//Remove Product
var buttonRemoveProduct = document.querySelectorAll('.remove_product')
console.log(buttonRemoveProduct)
buttonRemoveProduct.forEach((item)=>{
    item.addEventListener('click',function(){
        var ask = confirm('Bạn có chắc chắn muốn xóa sản phẩm này này ?')
        if(!ask){
            return
        }
        var makh = item.getAttribute('val')
        console.log(makh)
        var link = `http://localhost:3000/admin/deleteProduct/${makh}`
        fetch(link)
        .then((response)=>{
            console.log('xoa san pham thanh cong')
            item.parentElement.parentElement.hidden= true
        })
        .catch((err)=>{console.log('khong su dung link xoa san pham duoc ' + err)})
    })
})

//Remove Cart
var buttonRemoveCart = document.querySelectorAll('.remove_cart')
console.log(buttonRemoveCart)
buttonRemoveCart.forEach((item)=>{
    item.addEventListener('click',function(){
        var ask = confirm('Bạn có chắc chắn muốn xóa giỏ hàng này này ?')
        if(!ask){
            return
        }
        var pk_cart = item.getAttribute('val')
        console.log(pk_cart)
        id=JSON.parse(pk_cart)
        var link = `http://localhost:3000/admin/deleteCart?MaKH=${id.MaKH}&MaSP=${id.MaSP}`
        fetch(link)
        .then((response)=>{
            console.log('xoa gio hang thanh cong')
            item.parentElement.parentElement.hidden= true
        })
        .catch((err)=>{console.log('khong su dung link xoa gio hang duoc ' + err)})
    })
})