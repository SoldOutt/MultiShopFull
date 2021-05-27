const { checkAccount } = require('../modules/me');
const dataUser = require('../modules/me');
class MeController{
    //[GET]localhost:3000/me/login
    login(req,res){
        if(req.session.User){
            res.redirect('/')
        }
        res.render('login');
    }
    //[POST]localhost:3000/me/login
    async loginWithAccount(req,res){
        var account = req.body
        var checkAccount=  await dataUser.checkAccount(account)
        if(checkAccount){
            req.session.User = account
            var idUser = await dataUser.getIdUser(req.session.User.userName)
            console.log(idUser)
            req.session.User.ProductInCart = await dataUser.countProductInCart(idUser[0].MaKH)
            res.redirect('/')
        }
        else {
            res.redirect('/me/login')
        }
    }
    //[GET]localhost:3000/me/shopcart
    async shopcart(req,res){
        if(req.session.User){
            var userId = await dataUser.getIdUser(req.session.User.userName)
            // console.log(userId)
            var listProducts = await dataUser.getDataCart(userId[0].MaKH)
            res.render('shop_cart',{user: req.session.User, products: listProducts})
        }
        else res.redirect('/me/login')
    }
    //[POST]localhost:3000/me/signup
    async signup(req,res){
        console.log(req.body)
        await dataUser.signUpUser(req.body)
        res.redirect('back')
    }
    //[GET] localhost:3000/me/logout
    logout(req,res){
        req.session.destroy(function(err){
            console.log('khong the thuc hien dang xuat')
            return
        })
        res.redirect('/')
    }
}
module.exports = new MeController()