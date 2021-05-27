var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'multishop'
})
connection.connect(function(err){
  if(err){
      console.log('khong ket noi toi co so du lieu duoc')
      return
  }
  console.log('ket noi voi databases thanh cong')
})
module.exports = connection