import joi from 'joi'



 export const signupschema=joi.object({
        name:joi.string().required().min(3).max(30).pattern(/^[a-zA-Z ]+$/),
        phone:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        uniqueaccname:joi.string().required(),
        
    })

     export const loginschema=joi.object({
        email:joi.string().required(),
        password:joi.string().required().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        
    })