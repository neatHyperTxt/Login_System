const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
// const {v4:uuid} = require('uuid');

app.set('view engine','ejs');

app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/assets',express.static(path.join(__dirname,'public/assets')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
// app.use(session(
//     {
//         secret:uuidv4(),
//         resave:false,
//         saveUninitialized:true
// }))

app.listen(3000,()=>
{
    console.log('Listening to Port 3000');
})

app.get('/',(req,res)=>
{
    res.render('base',{title:"Login System"});
})
