import { env } from "process"


export const errorresponse=({
status=400,
message= 'something went wrong',
extra= undefined
}={})=>{
    console.log('from error response')
const err = new Error(message)
err.status = status
err.extra = extra
throw err
}

export const badrequestexception=({message='bad request', extra=undefined}={})=>{
return errorresponse({status:400,message:message,extra:extra})
}

export const notfoundexception=({message='not found error',extra=undefined}={})=>{
    return errorresponse({status:404,message,extra})
}
export const conflictexception=({message='conflict error',extra=undefined}={})=>{
    return errorresponse({status:409,message,extra})
}

export const unauthorizationexception=({message='unauthorized error',extra=undefined}={})=>{
    return errorresponse({status:401,message,extra})
}

export const forbiddenexception=({message='forbidden error',extra=undefined}={})=>{
    return errorresponse({status:403,message,extra})
}


export const globalhandlingerror=(err,req,res,next)=>{
    const mood = env.mood === 'dev'

    const defaultmessage='somthing went wrong'
    const displayerrormessage=err.message || defaultmessage
    const status = err.status?err.status:err.cause?err.cause.status:500
   res.status(status).json({
    stack:mood?err.stack:null,
    message:displayerrormessage,
    extra:err.extra
})
}