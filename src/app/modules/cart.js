const db = require('../../config/db')

class dataCart{
    getAllCart = async function(){
        return new Promise((resolve,reject)=>{
            db.query(`select giohang.MaKH,giohang.MaSP,TenDangNhap,SoDienThoai, TenSP , SoLuong, (GiaTien*SoLuong) as 'TongTien' from giohang 
                                    inner join khachhang on giohang.MaKH = khachhang.MaKH
                                    inner join sanpham on giohang.MaSP = sanpham.MaSP`,(err,data)=>{
                if(err){
                    console.log('Khong lay duoc du lieu gio hang ')
                    return
                }
                resolve(data)
            })
        })
    }
    deleteCart = function(idCart){
        db.query(`delete from giohang where MaKH='${idCart.MaKH}'and MaSP='${idCart.MaSP}'`,(err,data)=>{
            if(err){
                console.log('khong xoa duoc gio hang ' + err)
                return
            }
            console.log('Xoa gio hang thanh cong')
        })
    }
}

module.exports = new dataCart()