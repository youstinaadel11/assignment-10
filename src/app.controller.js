import express from 'express'
import { globalhandlingerror, notfoundexception } from './common/response/error.response.js'
import { successresponse } from './common/response/success.response.js'
import { hashdata, verifydata } from './common/middleware/security/encryption.js'
import { databaseconnection } from './database/connection.js'
import authRouter from './module/auth/auth.controller.js'
import userrouter from './module/user/user.controller.js'
import path from 'path'
import { fileURLToPath } from 'url'


export const bootstrap=async()=>{

    console.log(await hashdata('wkbwuibiwebf'))
    console.log(await verifydata('wkbwuibiwebf','$2b$08$DWI/fxRDpnBpNIKW38DNKOHGUKyK06bynCUEMndKClOIJ/7PX5QEy'))

await databaseconnection()

const __filename=fileURLToPath(import.meta.url)
console.log(__filename);

const __dirname=path.dirname(__filename)
console.log(__dirname);


const app=express()

app.use('/uploads',express.static(path.join(__dirname,'../uploads')))

app.use(express.json())
app.use('/user',userrouter)

app.use('/auth', authRouter)

app.get('/check-health',(req,res)=>{
   res.json({message:'server is healthy'})
})

app.get('/test',(req,res)=>{
   // notfoundexception({message:"el test msh mawqgood"})
successresponse({
    res,
    message:'done from success response function',
    status:201,
    data:{name:'youstina',age:22}
})
})


//global error handler
app.use(globalhandlingerror)

app.use('{*dummy}',(req,res)=>{
    res.json({message:'url not found'})
})



app.listen(3000,()=>{
    console.log('server is running on port 3000')
})
}