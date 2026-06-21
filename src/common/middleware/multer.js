import multer from 'multer'


export const upload=(file)=>{
    const storage=multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'uploads')
        },
       filename: function(req, file, cb){
    const uniquesuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '_' + uniquesuffix + '_' + file.originalname)
}
    })
    const upload=multer({storage})
    return upload
}