
import Router from 'express'
import { getuserdata, updatesuserdata } from './user.service.js'
import { auth } from '../../../common/middleware/auth/auth.js'
import { successresponse } from '../../../common/response/success.response.js'
const router =Router()


router.get('/',(req,res)=>{
    res.json('from user controller')
})


router.get('/get-user-data',auth,async(req,res)=>{
    let userdata=await getuserdata(req.user)
    successresponse({res,message:'user data ',data:userdata})
})

router.put('/update-user-profile',auth,async(req,res)=>{
    let updateduser=await updatesuserdata(req.user,req.body)
successresponse({res,message:'user updated successfully',data:updateduser})
})



export default router

