const express = require('express');
const mongoose = require('mongoose');
 const cors = require('cors');
const routes = require('./src/routes/quiz');

require('dotenv').config()
const quizRoutes = require("./src/routes/quiz");
const announcementRoutes = require("./src/routes/announcement");
const app = express()
const PORT = process.env.port || 3000

app.use(express.json())
app.use(cors())
app.use("/quiz", quizRoutes);
app.use("/announcement", announcementRoutes);
mongoose.connect(process.env.MONGODB_URL).then(()=> console.log(`Connected to MongoDB...`)).catch((err)=> console.log(err))

app.use(routes);

app.listen(PORT, ()=>console.log(`Listening on: ${PORT}`))