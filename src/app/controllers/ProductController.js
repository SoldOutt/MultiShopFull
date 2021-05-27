const dataProduct = require('../modules/products')
const dataUser = require('../modules/me')
class ProductController{
    //[GET] localhost:3000/products
    async shop(req,res){
        var listProduct = await dataProduct.getAllproduct()
        res.render('shop',{user: req.session.User,listProduct:listProduct})
    }
    //[GET] localhost:3000/product/:slug
    async detailProduct(req,res){
        var dataDetailProduct = await dataProduct.getDetailProduct(req.params.slug)
        console.log(req.params.slug)
        var idProduct = await dataProduct.getIdProductFromName(req.params.slug)
        console.log(idProduct)
        var dataReview
        if(idProduct){
            dataReview = await dataProduct.getAllReviewProduct(idProduct.MaSP)
        }
        console.log(dataReview)
        res.render('detail_product',{user: req.session.User,product: dataDetailProduct[0],dataReview:dataReview})
    }
    //[GET] localhost:3000/product/addProduct
    async showAddProduct(req,res){
        var danhmuc = await dataProduct.getAllCategories()
        console.log({danhmuc})
        res.render('themsanpham',{danhmuc,user: req.session.User})
    }
    //[POST] localhost:3000/products/addProduct
    addProduct(req,res){
        console.log(req.body)
        dataProduct.themSanPham(req.body)
        res.redirect('back')
    }
    //[GET]localhost:300/products/addToCart/{{this.MaSP}}
    async addToCart(req,res){
        if(req.session.User){
            var maKH = await dataUser.getIdUser(req.session.User.userName)
            var check = await dataProduct.addToCart(maKH[0].MaKH,req.params.id)
            if(check){
                req.session.User.ProductInCart++
            }
            console.log('san pham trong gio: ' +req.session.User.ProductInCart)
            res.json(req.session.User.ProductInCart)
        }
        else {
            res.redirect(404)
        }
    }
    //[GET]localhost:300/products/removeOutCart/{{this.MaSP}}
    async removeOutCart(req,res){
        if(req.session.User){
            var maKH = await dataUser.getIdUser(req.session.User.userName)
            dataProduct.removeOutCart(maKH[0].MaKH,req.params.id)
            req.session.User.ProductInCart--
            console.log(req.session.User.ProductInCart)
            // res.redirect('/products')
            res.json(req.session.User.ProductInCart)
        }
        else {
            res.redirect(404)
        }
    } 

    //[GET]localhost:3000/products/review/{{this.MaSP}}
    async reviewProduct(req,res){
        if(req.session.User){
            var maKH = await dataUser.getIdUser(req.session.User.userName)
            // console.log({req})
            req.query.userName = req.session.User.userName
            req.query.dayDefine = new Date()
            req.query.MaKH = maKH[0].MaKH
            req.query.Rating = 5
            // ProductController.reviewProduct(req.query)
            dataProduct.reviewProduct(req.query)
            res.json(req.query)
        }
        else {
            res.redirect('/me/login')
        }
    }
}
module.exports = new ProductController