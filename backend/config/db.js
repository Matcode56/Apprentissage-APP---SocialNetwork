//Configuration de la connexion à la base mongoDB

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://"+process.env.DB_USER_PASS+"@cluster0.c60ai.mongodb.net/"+process.env.DB_NAME+"?authSource=admin&replicaSet=atlas-htlsoc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
    { useNewUrlParser: true, 
        useUnifiedTopology: true, 
    }
    
  )

  .then(() => console.log("Connected to MangoDB"))
  .catch((err) => console.log("Failed to connect to MangoDb, erreur: ", err));