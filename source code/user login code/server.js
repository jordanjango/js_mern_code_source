const express=require('express');
const connectDB = require('./config/db');
const app=express();
//connect database
connectDB();
//init middleware
app.use(express.json({extended:false}))
app.get('/',(req,res)=>res.send('API running'));

//define routes
app.use('/api/user',require('./router/api/user'));
app.use('/api/auth',require('./router/api/auth'));
app.use('/api/profile',require('./router/api/profile'));
app.use('/api/post',require('./router/api/post'));


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log('server started......'));