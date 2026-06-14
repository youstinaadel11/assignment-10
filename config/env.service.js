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
export const env={
    port,
    mood,
    salt,
    adminsignature,
    usersignature,
    adminrefreshtokensignature,
    userrefreshtokensignature
}




