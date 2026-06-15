import { hashdata, verifydata } from "../../../common/middleware/security/encryption.js"
import { notfoundexception } from "../../../common/response/error.response.js"
import usermodel from '../../../database/model/user.model.js'



export const getuserdata=async(userid)=>{
    let userdata=await usermodel.findById(userid)
    if(!userdata){
        notfoundexception({message:'user not found'})
    }
    return userdata
}

export const updatesuserdata=async(userid,data)=>{
    let {name,password,uniqueaccname,newpassword}=data
    let userdata=await usermodel.findById(userid)
    if(!userdata){
        notfoundexception({message:'user not found'})
    }
    let newhashedpassword=''
    if(password){
        let comparedpassword= await verifydata(password,userdata.password)
        if(comparedpassword){
             newhashedpassword= await hashdata(password)
        }else{
            notfoundexception({message:'invalid password'})
        }
    }
    let existeduniqueaccname=await usermodel.findOne({uniqueaccname})
    if(existeduniqueaccname){
        conflictionexception({message:'user already exists'})
    }
    let updateduser=await usermodel.findByIdAndUpdate(userid,{name,password:newhashedpassword,uniqueaccname},{new:true})
    return updateduser
}