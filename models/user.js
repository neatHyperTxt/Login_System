const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema,model} = mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        required:[true,'Email is Required']
    },
    password:{
        type:String,
        require:[true,'Password is Required']
    }
})
userSchema.statics.isValid = async function(email,password){
    const foundUser = await this.findOne({email});
    const validPassword = await bcrypt.compare(password,foundUser.password);
    return (validPassword?foundUser:false);
}
userSchema.pre('save',async function(next)
{
    this.password = await bcrypt.hash(this.password,12)
    next();
})
const User = model('User',userSchema);
module.exports = User;
