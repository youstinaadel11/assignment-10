import nodemailer from 'nodemailer'
import { env } from '../../../config/env.service.js'

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:env.googleaccountemail,
        pass:env.googleapppassword
    }
})

//method to send email

export const sendEmail=async({to,subject,html})=>{
    const info=await transporter.sendMail({
        from:`youstina adel <${env.googleaccountemail}>`,
        to,
        subject,
        html
    })
    console.log("mail sent");
    
}