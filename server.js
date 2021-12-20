const express = require('express');
const { join } = require('path');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');

const router = require('./router');
const port = process.env.PORT || 3000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine','ejs');

app.use('/static',express.static(path.join(__xdirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')));

app.use(session(
    {
        secret:uuidv4(),
        resave:false,
        saveUninitialized:true
    }))
    app.use('/route',router); 
app.get('/',(req,res)=>
{
    res.render('base',{title:'Login System'});
})
app.listen(port,()=>
{
    console.log('Listening to server on http://localhost:3000');
})