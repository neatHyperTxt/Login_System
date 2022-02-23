const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const flash = require('connect-flash');
const session = require('express-session');
mongoose.connect('mongodb://localhost:27017/login_System')
.then(()=>{console.log('Mongo Connected')})
.catch((err)=>{
    console.log('Oh No Error!!!');
    console.log(err);
})
const path = require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use('/static',express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
const requireLogin = (req,res,next)=>
{
    if(!req.session.user_id)
    {
        return res.redirect('/login');
    }
    next();
}
app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:'notagoodsecret'
}))
app.use(flash());
app.use((req,res,next)=>
{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
app.get('/',(req,res)=>
{
    res.render('main/register',{title:'Register'});
})
app.post('/',async (req,res)=>
{
    const user = new User(req.body);
    await user.save();
    req.session.user_id = user._id;
    req.flash('success','Registered Successfully');
    res.redirect('/login');
})
app.get('/login',(req,res)=>
{
    res.render('main/login',{title:'Login System'});
})
app.post('/login',async (req,res)=>
{
    const {email,password} = req.body;
    const foundUser = await User.isValid(email,password);
    if(foundUser)
    {
        req.session.user_id = foundUser._id;
        req.flash('success','You Have Logged in Successfully');
        res.redirect('/secret');
    }
    else{
        req.flash('error','Try Again...Incorrect Email/Password');
        res.redirect('/login');
    }
})
app.get('/secret',requireLogin,(req,res)=>
{
    res.render('main/secret',{title:'Secret Page'});
})
app.post('/logout',(req,res)=>
{
    req.session.user_id = null;
    req.flash('success','Logged Out Successfully')
    res.redirect('/login');
})
app.listen(3000,()=>
{
    console.log('Listeing on Port 3000');
})
