
class SiteController{
    //[GET] localhost:3000/
    index(req,res){
        // console.log(req.session.User)
        res.render('home',{user: req.session.User});
    }

    //[GET] localhost:3000/contact
    contact(req,res){
        res.render('contact',{user: req.session.User})
    }
}
module.exports = new SiteController()