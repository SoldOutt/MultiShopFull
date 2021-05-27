const db = require('../../config/db')

db.query('select * from sanpham',(err,data)=>{
    console.log('lay du lieu bang san pham thanh cong')
})
class dataProduct{
    getIdProductFromName = async function(nameProduct){
        return new Promise((resolve,reject)=>{
            db.query(`select MaSP from sanpham where TenSP ='${nameProduct}'`,(err,data)=>{
                if(err){
                    console.log('khong tim thay san pham')
                    return
                }
                else { 
                    console.log(data[0])
                    resolve(data[0])
                }
            } )
        })
    }
    getAllproduct = async function(){
        return new Promise(function(resolve,reject){
            db.query('select * from sanpham',(err,data)=>{
                if(err){
                    console.log('lay du lieu tu bang san pham that bai')
                    return;
                }
                console.log('lay du lieu bang san pham thanh cong')
                resolve(data);
            })
        })
    }
    getAllCategories = async function(){
        return new Promise(function(resolve,reject){
            db.query('select * from danhmuc',(err,data)=>{
                if(err){
                    console.log('lay du lieu tu bang danh muc that bai')
                }
                console.log('lay du lieu bang danh muc thanh cong')
                resolve(data)
            })
        })
    }
    demsanpham = async function(){
        return new Promise(function(resolve,reject){
            db.query('select count(*) as sosp from sanpham',(err,d)=>{
                if(err){
                    console.log('dem san pham that bai')
                    return
                }
                resolve(d[0].sosp)
            })
        })
    }
    themSanPham = async function(sanpham){
            var countSP = await this.demsanpham()
            console.log(countSP)
            countSP++
            console.log(countSP)
            db.query(`INSERT INTO sanpham VALUES ('${sanpham.madm}_${countSP}','${sanpham.madm}','${sanpham.tensp}',NULL,${sanpham.giatien},'${sanpham.gioithieu}','${sanpham.mota}','${sanpham.thuonghieu}','${sanpham.xuatxu}','${sanpham.chatlieu}',NULL,'${sanpham.img}')`,(err,d)=>{
            if(err){
                console.log(err)
                console.log('them san pham that bai')
                return
            }
            console.log('them san pham thanh cong')
        })
    }
    getDetailProduct = async function(nameProduct){
        return new Promise(function(resolve,reject){
            db.query(`select * from sanpham where TenSP='${nameProduct}'`,(err,data)=>{
                if(err){
                    console.log('khong lay du lieu chi tiet san pham duoc')
                    reject(err)
                    return
                }
                else{
                    resolve(data);
                }
            })
        })
    }
    addToCart =async function(idUser,idProduct){
        return new Promise((resolve,reject)=>{
            db.query(`insert into giohang values ('${idUser}','${idProduct}',1)`,(err,data)=>{
                if(err){
                    console.log('Khong them san pham vao gio hang duoc')
                    resolve(0)
                }
                else{
                    console.log('Them san pham vao gio hang thanh cong')
                    resolve(1)
                }
            })

        })
    }
    removeOutCart = function(idUser,idProduct){
        db.query(`DELETE FROM giohang WHERE MaKH = '${idUser}' AND MaSP = '${idProduct}'`,(err,data)=>{
            if(err){
                console.log(err)
                console.log('Khong xoa san pham khoi gio hang duoc')
                return
            }
            else{
                console.log('Xoa san pham khoi gio hang thanh cong')
            }
        })
    }

    reviewProduct = function(dataReview){
        return new Promise((resolve,reject)=>{
            db.query(`insert into review values ('${dataReview.MaKH}','${dataReview.MaSP}',5,'${dataReview.dayDefine.getYear()+1}/${dataReview.dayDefine.getDay()+1}/${dataReview.dayDefine.getYear()}','${dataReview.review_conten}')`,(err,data)=>{
                if(err){
                    console.log(err)
                    console.log('Khong tao duoc review')
                    return
                }
                else{
                    console.log('Tao ok')
                    resolve(1)
                }
            })
        })
    }
    getAllReviewProduct = async function(idProduct){
        return new Promise((resolve,reject)=>{
            db.query(`select * from review inner join khachhang on review.MaKH = khachhang.MaKH where MaSP = '${idProduct}'`,(err,data)=>{
                if(err){
                    console.log('khong lay review san pham duoc ')
                    return
                }
                console.log('lay du lieu review thanh cong')
                resolve(data)
            })
        })
    }
    deleteProduct = function(idProduct){
        db.query(`delete from sanpham where MaSP = '${idProduct}'`,(err,data)=>{
            if(err){
                console.log('xoa san pham that bai' + err)
                return
            }
            console.log('xoa san pham thanh cong: ' + data)
        })
    }
}
module.exports = new dataProduct()
