import express from 'express'
import { globalhandlingerror, notfoundexception } from './common/response/error.response.js'
import { successresponse } from './common/response/success.response.js'
import { hashdata, verifydata } from './common/middleware/security/encryption.js'
import { databaseconnection } from './database/connection.js'
import authRouter from './database/module/auth/auth.controller.js'
import userrouter from './database/module/user/user.controller.js'

export const bootstrap=async()=>{

    console.log(await hashdata('wkbwuibiwebf'))
    console.log(await verifydata('wkbwuibiwebf','$2b$08$DWI/fxRDpnBpNIKW38DNKOHGUKyK06bynCUEMndKClOIJ/7PX5QEy'))

await databaseconnection()
const app=express()

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