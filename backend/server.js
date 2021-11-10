
const express= require('express');
const app= express();
require('dotenv').config({path:'./config/.env'})
require('./config/db')
const userRoutes= require('./routes/user.routes')
const checkUser= require('./middlewares/auth')
const cookieParser= require('cookie-parser');


// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('*', checkUser.checkUser)
app.get('/jwtid', checkUser.requireAuth, (req,res)=>{
    res.status(200).send("personne déja authentifié car le cookie est présent")
})

app.use('/api/user', userRoutes)


app.listen(3000,()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})

module.export= app;