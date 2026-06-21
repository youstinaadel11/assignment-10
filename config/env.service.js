import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve('./config/.env')})

const port=process.env.port
const mood=process.env.mood
const salt=process.env.salt
const adminsignature=process.env.adminsignature
const usersignature=process.env.usersignature
const adminrefreshtokensignature=process.env.adminrefreshtoken
const userrefreshtokensignature=process.env.userrefreshtoken
const googleapppassword=process.env.google_app_password
const googleaccountemail=process.env.google_account_email
const serverurl=process.env.server_url
export const env={
    port,
    mood,
    salt,
    adminsignature,
    usersignature,
    adminrefreshtokensignature,
    userrefreshtokensignature,
    googleapppassword,
    googleaccountemail,
    serverurl

}




