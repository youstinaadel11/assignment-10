import {Router} from 'express'
import { successresponse } from '../../../common/response/success.response.js'
import { getaccesstoken, getuserdata, login, signup } from './auth.service.js'
import { auth } from '../../../common/middleware/auth/auth.js'

const router=Router()




router.post('/signup',async(req,res)=>{
    let addeduser=await signup(req.body)
    successresponse({res,message:'user added successfully',status:201,data:addeduser})
})

router.post('/login',async(req,res)=>{
    let logindata=await login(req.body,req.get('host'))
    successresponse({res,message:'user login successfully',data:logindata})
})

router.get('/get-user-data',auth,async(req,res)=>{
    let userdata=await getuserdata(req.user)
    successresponse({res,message:'user data ',data:userdata})
})

router.get('/get-access-token',async(req,res)=>{
    let data=await getaccesstoken(req.headers.authorization,req.get('host'))
    successresponse({res,message:'new access token generated',data})
})


export default router