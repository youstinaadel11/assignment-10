
import Router from 'express'
import { activeuserprofile, deactivateuserprofile, deleteuserdata, getuserdata, updatesuserdata } from './user.service.js'
import { auth } from '../../common/middleware/auth/auth.js'
import { successresponse } from '../../common/response/success.response.js'
import { upload } from '../../common/middleware/multer.js'
const router =Router()


router.get('/',(req,res)=>{
    res.json('from user controller')
})


router.get('/get-user-data',auth,async(req,res)=>{
    let userdata=await getuserdata(req.user)
    successresponse({res,message:'user data ',data:userdata})
})

router.put('/update-user-profile',auth,upload().single('coverimage'),async(req,res)=>{
    let updateduser=await updatesuserdata(req.user,req.body,req.file)
successresponse({res,message:'user updated successfully',data:updateduser})
})

router.delete('/delete-user-profile',auth,async(req,res)=>{
    let deleteduser=await deleteuserdata(req.user)
    successresponse({res,message:'user deleted successfully',data:deleteduser})
})

router.put('/active-user-profile',auth,async(req,res)=>{
    let activeuser=await activeuserprofile(req.user)
    successresponse({res,message:'user active successfully',data:activeuser})
})

router.put('/deactivate-user-profile',auth,async(req,res)=>{
    let deactiveuser=await deactivateuserprofile(req.user)
    successresponse({res,message:'user deactivated successfully',data:deactiveuser})
})



export default router

