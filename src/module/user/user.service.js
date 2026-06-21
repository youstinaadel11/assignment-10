import { hashdata, verifydata } from "../../common/middleware/security/encryption.js"
import { notfoundexception } from "../../common/response/error.response.js"
import usermodel from '../../database/model/user.model.js'
import { conflictexception } from "../../common/response/error.response.js"
import { env } from "../../../config/env.service.js"


export const getuserdata=async(userid)=>{
    let userdata=await usermodel.findById(userid)
    if(!userdata){
        notfoundexception({message:'user not found'})
    }
    return userdata
}

export const updatesuserdata=async(userid,data,file)=>{
    let {name,password,uniqueaccname,newpassword}=data
   console.log(file);
   let imagefield=''
   if(file){
     imagefield=`${env.serverurl}/${file.path}`
    console.log(imagefield ,'from line 21');
   }
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
        conflictexception({message:'user already exists'})
    }
    let updateduser=await usermodel.findByIdAndUpdate(userid,{name,password:newhashedpassword,uniqueaccname,imagefield,profilepicture:imagefield},{new:true})
    return updateduser
}


export const deleteuserdata=async(userid)=>{
    let userdata=await usermodel.findById(userid)
    if(!userdata){
       notfoundexception({message:'user not found'}) 
    }
    let deleteduser=await usermodel.findByIdAndDelete(userid)
    return deleteduser 
}

export const activeuserprofile=async(userid)=>{
    let userdata=await usermodel.findById(userid)
    if(!userdata){
               notfoundexception({message:'user not found'}) 
    }
    let activeuser=await usermodel.findByIdAndUpdate(userid,{isactive:true},{new:true})
    return activeuser
}

export const deactivateuserprofile=async(userid)=>{
    let userdata=await usermodel.findById(userid)
    if(!userdata){
               notfoundexception({message:'user not found'}) 
    }
    let deactivateduser=await usermodel.findByIdAndUpdate(userid,{isactive:false},{new:true})
    return deactivateduser
}
