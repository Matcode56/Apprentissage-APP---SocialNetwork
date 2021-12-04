//Importation Framework Express
const express= require('express');
const app= express();
const cors = require('cors');

//Importation dotenv pour sécuriser des données sensible
require('dotenv').config({path:'./config/.env'})
require('./config/db')

// Importation fichier et module nécessaire
const userRoutes= require('./routes/user.routes')
const postRoutes= require('./routes/post.routes')
const checkUser= require('./middlewares/auth')
const cookieParser= require('cookie-parser');

//CORS

const corsOptions= {
    origin: process.env.URL_AUTHORIZED,
    credentials: true
   /* 'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false*/
}

app.use(cors(corsOptions));


// Parser json et cookie
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Auth: route pour check si la personne est déja identifié
app.get('*', checkUser.checkUser)
app.get('/jwtid', checkUser.requireAuth, (req,res)=>{
    res.status(200).send(res.locals.user._id)
})


//ROUTES
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes)


//Connexion au port LOCALHOST
app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})

module.export= app;