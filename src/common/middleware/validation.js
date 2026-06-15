import joi from 'joi'
import { badrequestexception } from '../response/error.response.js';



export const validation=(schema)=>{
return (req,res,next)=>{
     let {value,error}=schema.validate(req.body,{abortEarly:false})
    console.log(value,error);
    if(error){
        badrequestexception({message:'validation error',extra:error})
    }
    next()
}
}