require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("mongoose conectado")})
.catch(error=>{console.log("Error:", error)});


app.use(cors());
app.use(cors({
    exposedHeaders: ["auth-token"]
}));

app.use(express.json());
app.use(express.urlencoded());
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT,"0.0.0.0", ()=>{
    console.log("Servidor rodando")
});