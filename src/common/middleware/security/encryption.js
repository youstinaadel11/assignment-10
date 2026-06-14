import bcrypt from 'bcrypt'
import {env} from '../../../../config/env.service.js'



export const hashdata=async(data)=>{
    let encrypteddata=await bcrypt.hash(data,+env.salt)
    return encrypteddata  
}

export const verifydata=async(plaintext,cyphertext)=>{
    let isvalid=await bcrypt.compare(plaintext,cyphertext)
    return isvalid
}