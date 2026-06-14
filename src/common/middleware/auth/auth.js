import jwt from 'jsonwebtoken'


export const auth=(req,res,next)=>{
    let {authorization}=req.headers
    console.log(authorization);
    let [flag,token]=authorization.split(' ')
        console.log(flag)
    switch (flag) {
    case 'Basic':
        const basicdata=Buffer.from(token,'base64').toString()
        console.log(basicdata);
        let [email,password]=basicdata.split(':')
        console.log(email,password);
        
        break;
    case 'Bearer':
    
    let decodeddata=jwt.decode(token)
       console.log(decodeddata);
       let signature=''
       switch (decodeddata.aud[0]) {
        case 0:
            signature=process.env.usersignature
            break;
        case 1:
            signature=process.env.adminsignature
            break;
        default:
            break;
       }
    let decoded=jwt.verify(token,signature)
    

    req.user=decoded.userid
    next()

    default:
        break;
}
}


export const generatetoken=(payload,host,role)=>{
    let signature=''
    let refreshsignature=''
    switch (role) {
        case 0:
            signature=process.env.usersignature
            refreshsignature=process.env.userrefreshtoken
            break;
        case 1:
        signature=process.env.adminsignature
        refreshsignature=process.env.adminrefreshtoken
        break;
        default:
            break;
    }
    let accesstoken=jwt.sign(payload,signature,
        {
            expiresIn:'30mins',
            //notBefore:'50s'
           issuer:host,
           audience:[role]
        })
let refreshtoken=jwt.sign(payload,refreshsignature,{
    expiresIn:'1y',
    issuer:host,
    audience:[role]
})

    return {accesstoken,refreshtoken}
}

export const generateaccesstoken=async(refreshtoken,host)=>{
    let decoded=jwt.decode(refreshtoken)
    let signature=''
    switch (decoded.aud[0]) {
        case 0:
            signature=process.env.usersignature
            break;
        case 1:
        signature=process.env.adminsignature
       break;
        default:
            break;
    }
    let accesstoken=jwt.sign({userid:decoded.userid},signature,
        {
            expiresIn:'30mins',
            //notBefore:'50s'
           issuer:host,
           audience:[decoded.aud[0]]
        })
        return accesstoken
}

