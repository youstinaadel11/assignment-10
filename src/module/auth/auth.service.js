import {hashdata, verifydata} from '../../common/middleware/security/encryption.js'
import {badrequestexception, conflictexception, notfoundexception} from '../../common/response/error.response.js'
import usermodel from '../../database/model/user.model.js'
import joi from 'joi'
import {generateaccesstoken, generatetoken} from '../../common/middleware/auth/auth.js'
import { sendEmail } from '../../common/utils/sendEmail.js'
import { env } from '../../../config/env.service.js'

export const signup=async(data)=>{
    let {name,email,password,uniqueaccname,phone}=data
 
    let existeduser=await usermodel.findOne({email})
    if(existeduser){
        conflictexception({message:'user already exists'})
    }
    let encryptedpassword=await hashdata(password)
    const otp=Math.floor(100000+Math.random()*900000)
    let addeduser=await usermodel.create({name,email,password:encryptedpassword,uniqueaccname,phone,otp})
    await sendEmail({
        to:email,
        subject:'verify your account',
        html:`<h1> verify your account,your otp is ${otp}</h1>`
    })
    return addeduser
}

export const login=async(data,host)=>{
    let {email,password}=data
    let userdata=await usermodel.findOne({email,isverified:true})
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

export const verifyaccount=async(data)=>{
    const {email,otp}=data
    const userdata=await usermodel.findOne({email})
    if(userdata.otp!=otp){
        badrequestexception({message:'invalid otp'})
    }
    userdata.isverified=true
    userdata.otp=null
    await userdata.save()
    return userdata
}


export const getaccesstoken=async(authorization,host)=>{
    let accesstoken=await generateaccesstoken(authorization,host)
    return accesstoken
}

