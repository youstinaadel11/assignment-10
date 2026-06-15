import moongose, { model, Schema } from 'mongoose'


const userschema= new Schema({
name:{
    type:String,
    required:true
},
email:{
     type:String,
    required:true,
    unique:true
},phone:{
type:String
},
password:{
     type:String,
    required:true
},
coverimages:{
    type:String
},
profilepicture:{
    type:String
},
uniqueaccname:{
     type:String,
    required:true,
    unique:true
},
role:{
    type:Number,
    default:0
}
})

const usermodel= model('users',userschema)
export default usermodel