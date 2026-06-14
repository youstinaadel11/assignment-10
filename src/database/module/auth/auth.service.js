import {hashdata, verifydata} from '../../../common/middleware/security/encryption.js'
import {badrequestexception, conflictexception, notfoundexception} from '../../../common/response/error.response.js'
import usermodel from '../../../database/model/user.model.js'
import {generateaccesstoken, generatetoken} from '../../../common/middleware/auth/auth.js'

export const signup=async(data)=>{
    let {name,email,password,uniqueaccname}=data
    let existeduser=await usermodel.findOne({email})
    if(existeduser){
        conflictexception({message:'user already exists'})
    }
    let encryptedpassword=await hashdata(password)
    let addeduser=await usermodel.create({name,email,password:encryptedpassword,uniqueaccname})
    return addeduser
}

export const login=async(data,host)=>{
    let {email,password}=data
    let userdata=await usermodel.findOne({email})
    if(!userdata){
        notfoundexception({message:'user not found' })
    }
    let validpassword=await verifydata(password,userdata.password)
    if(!validpassword){
        badrequestexception({message:'invalid password'})
    }
    let {accesstoken,refreshtoken}=generatetoken({userid:userdata._id},host,userdata.role)
    return {userdata,accesstoken,refreshtoken}
}

export const getuserdata=async(userid)=>{
    let userdata=await usermodel.findById(userid)
    if(!userdata){
        notfoundexception({message:'user not found'})
    }
    return userdata
}

export const getaccesstoken=async(authorization,host)=>{
    let accesstoken=await generateaccesstoken(authorization,host)
    return accesstoken
}