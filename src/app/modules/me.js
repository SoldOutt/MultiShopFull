const db = require('../../config/db')


class dataUser{
    getAllUser = async function(){
        return new Promise((resolve,reject)=>{
            db.query(`select * from khachhang `,(err,data)=>{
                if(err){
                    console.log('Khong lay duoc du lieu bang khach hang')
                    return
                }
                resolve(data)
            })
        })
    }

    getIdUser = async function(userName){
        return new Promise((resolve,reject)=>{
            db.query(`select MaKH from khachhang where TenDangNhap = '${userName}'`,(err,data)=>{
                if(err){
                    console.log('khong lay duoc ma khach hang tu ten')
                    return
                }
                resolve(data)
            })
        })
    }
    deleteUser = function(idUser){
        db.query(`delete from khachhang where MaKH = '${idUser}'`,(err,data)=>{
            if(err){
                console.log('xoa nguoi dung that bai' + err)
                return
            }
            console.log('xoa nguoi dung thanh cong: ' + data)
        })
    }

    countUser = async function(){
        return new Promise(function(resolve,reject){
            db.query('select count(*) as soKH from khachhang',(err,d)=>{
                if(err){
                    console.log('khong lay duoc so khach hang')
                    return;
                }
                resolve(d[0].soKH);
            })
        })
    }
    signUpUser = async function(user){
        var soKH = await this.countUser();
        console.log(soKH)
        soKH++
        if(user.password != user.confirmpassword){
            console.log('mat khau khong khop,them that bai')
            return
        }
        db.query(`insert into khachhang values ('KH_${soKH}','${user.username}','${user.email}','${user.phonenumber}','${user.password}')`,(err,data)=>{
            if(err){
                console.log('Them khach hang that bai')
                return
            }
            console.log('Them thanh cong')
        })
    }
    checkAccount = function(user){
        return new Promise(function(resolve,reject){
            db.query(`select count(*) as 'check' from khachhang where khachhang.TenDangNhap='${user.userName}' and khachhang.MatKhau = '${user.userPassword}'`,(err,d)=>{
                if(err){
                    console.log('Khong truy cap du lieu bang khach hang duoc ')
                    return
                }
                console.log(d[0].check)
                resolve(d[0].check);
            })
        })
    }
    getDataCart = async function(userID){
        return new Promise((resolve,reject)=>{
            db.query(`select * from giohang inner join sanpham on giohang.MaSP = sanpham.MaSP where MaKH = '${userID}' `,(err,data)=>{
                if(err){
                    console.log('khong lay duoc du lieu gio hang')
                    return
                }
                else{
                    console.log('lay du lieu gio hang thanh cong')
                    resolve(data);
                }
            })
        })
    }
    countProductInCart = async function(userID){
        return new Promise((resolve,reject)=>{
            db.query(`select count(*) as 'SoSanPham' from giohang where MaKH = '${userID}' `,(err,data)=>{
                if(err){
                    console.log('khong lay duoc du lieu gio hang')
                    return
                }
                else{
                    console.log(data)
                    console.log('lay du lieu gio hang thanh cong')
                    resolve(data[0].SoSanPham);
                }
            })
        })
    }
}
module.exports = new dataUser()