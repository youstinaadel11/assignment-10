import mongoose from 'mongoose'

export const databaseconnection=async()=>{
mongoose.connect('mongodb://localhost:27017/sarahaapp').then(()=>{
    console.log('database connected');
}).catch((err)=>{
    console.log('databaseconnection error',err);
})
}