import {Router} from 'express'
import { successresponse } from '../../common/response/success.response.js'
import { getaccesstoken, login, signup, verifyaccount } from './auth.service.js'
import { auth } from '../../common/middleware/auth/auth.js'
import { validation } from '../../common/middleware/validation.js'
import { loginschema, signupschema } from './auth.validation.js'

const router=Router()

router.get('/',async(req,res)=>{
    res.json({message:'auth route'})
})


router.post('/signup',validation(signupschema),async(req,res)=>{
    let addeduser=await signup(req.body)
    successresponse({res,message:'user added successfully',status:201,data:addeduser})
})

router.post('/login',validation(loginschema),async(req,res)=>{
    let logindata=await login(req.body,req.get('host'))
    successresponse({res,message:'user login successfully',data:logindata})
})

router.post('/verify-account',async(req,res)=>{
    let userdata=await verifyaccount(req.body)
    successresponse({res,message:'account verified successfully',data:userdata})
})


router.get('/get-access-token',async(req,res)=>{
    let data=await getaccesstoken(req.headers.authorization,req.get('host'))
    successresponse({res,message:'new access token generated',data})
})


export default router