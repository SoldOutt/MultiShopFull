
const meRouter = require('./me');
const siteRouter = require('./site')
const productRouter = require('./product')
const adminRouter = require('./admin')
function route(app){
    app.use('/products',productRouter)
    app.use('/me',meRouter)
    app.use('/admin',adminRouter)
    app.use('/',siteRouter)
}
module.exports = route