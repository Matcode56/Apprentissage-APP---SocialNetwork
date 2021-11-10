
const express= require('express');
const app= express();
require('dotenv').config({path:'./config/.env'})
require('./config/db')
const userRoutes= require('./routes/user.routes')
const postRoutes= require('./routes/post.routes')
const checkUser= require('./middlewares/auth')
const cookieParser= require('cookie-parser');


// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//auth
app.get('*', checkUser.checkUser)
app.get('/jwtid', checkUser.requireAuth, (req,res)=>{
    res.status(200).send("personne déja authentifié car le cookie est présent")
})


//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes)


app.listen(3000,()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})

module.export= app;