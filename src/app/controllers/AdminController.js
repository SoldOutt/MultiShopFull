const dataUser = require('../modules/me')
const dataProduct = require('../modules/products')
const dataCart = require('../modules/cart')

class AdminController{
    //[GET] localhost:3000/admin
    async show(req,res){
        var listUser = await dataUser.getAllUser()
        var listProduct = await dataProduct.getAllproduct()
        var listCart = await dataCart.getAllCart()
        res.render('admin',{listUser,listProduct,listCart})
    }
    //[GET] localhost:3000/admin/deleteUser/:id
    deleteUser(req,res){
        // console.log(req)
        var idUser = req.params.id
        console.log('idUser: ' + idUser)
        dataUser.deleteUser(idUser)
        res.json('ok')
    }
    //[GET] localhost:3000/admin/deleteProduct/:id
    deleteProduct(req,res){
        var idProduct = req.params.id
        console.log('idProduct: ' + idProduct)
        dataProduct.deleteProduct(idProduct)
        res.json('ok')
    }
    //[GET] localhost:3000/admin/deleteCart
    deleteCart(req,res){
        var idCart = req.query
        console.log(idCart)
        dataCart.deleteCart(idCart)
        res.json('ok')
    }
}


module.exports = new AdminController()