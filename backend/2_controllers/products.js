const db = require('./../3_database/mysql')
const fileUpload = require('./../helpers/fileUpload')
const fs = require('fs')

function convertPath(param){
    var path = param.split('public')
    path[0] = 'public/'
    return path.join('')
}

const getAllProducts = (req, res) => {
    const sql = `select p.id as product_id, name, price, created_at, i.id as image_id, image_url 
    from products p 
    left join product_image i 
    on p.id  = i.id_product;`

    db.query(sql, (err, result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                data : result
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}

const getProductById = () => {
    const sql = `select p.id as product_id, name, price, created_at, i.id as image_id, image_url from products p
    left join product_image i
    on p.id = i.id_product where p.id = ?;`

    let id = req.params.id

    db.query(sql, id , (err, result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                data : result[0]
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}

const postNewProduct = (req, res) => {
    const upload = fileUpload.array('product-image')
    upload(req,res,(err)=>{
        try{
            let isFailed = false
            if(err) throw err
            req.files.forEach((file)=>{
                if(file.size > 1000000){
                    isFailed = true
                }
                if(!file.mimetype.includes('image')){
                    isFailed =  true
                }
            })
            if(isFailed){
                req.files.forEach((file)=>{
                    fs.unlinkSync(file.path)
                })
                throw{error : true, message: 'all file must be image and below 1Mb'}
            }else{
                console.log(req.files)
                let data = req.body.data
                console.log(data)
                data = JSON.parse(data)
                console.log(data)

                let sql_1 = `insert into products set ?`
                db.query(sql_1, data,(err, result)=>{
                    try{
                        if(err) throw err
                        console.log(result.insertId)
                        
                        //looping to make array of object
                        // let dataProductImages = req.files.map((file)=>{
                        //     return{

                        //         image_url : file.path,
                        //         id_product : result.insertId
                        //     }
                         
                        // })

                        //looping for generate query
                        let sql_2 = `insert into product_image (image_url, id_product) values`
                        req.files.forEach((file, index)=>{
                            if(index === req.files.length -1){
                                sql_2 += `("${convertPath(file.path)}", ${result.insertId});`
                            }else{
                                sql_2 += `("${convertPath(file.path)}", ${result.insertId}),`
                            }

                        })
                        console.log(sql_2)

                        // dataProductImages.forEach((data, index)=>{
                        //     if(index === dataProductImages.length -1){
                        //         sql_2 += `("${data.image_url}", ${data.id_product});`
                        //     }else{
                        //         sql_2 += `("${data.image_url}", ${data.id_product})`
                        //     }
                        // })

                        db.query(sql_2, (err, result)=>{
                            try{
                                if(err) throw err
                                res.json({
                                    error : false,
                                    message : `product seccessfullt added`
                                })
                            }catch(err){
                                res.json({
                                    error : true,
                                    message : err.message
                                })
                            }
                        })
                    }catch(err){

                    }
                })
            }

        }catch(err){
            res.json(err)
            console.log(err)
        }
    })
}
module.exports = {
    getAllProducts,
    getProductById,
    postNewProduct
}