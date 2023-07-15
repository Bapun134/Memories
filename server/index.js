import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes  from './routes/routing.js';

const app = express();
const PORT = process.env.PORT|| 5000;

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({
  origin:["https://memories-392904.web.app"],
  method: ["POST", "GET"],
  credentials: true
}));

//created my own '/posts' route for displaying all the posts And in routing.js - router.get('/',getPosts); this will get all the posts and get displayed in the '/allposts' route
app.use('/posts', postRoutes);

app.get('/',(req,res)=>{
  res.send('App is Running');
})

//MongoDB Atlas Connection
const CONNECTION_URL = 'mongodb+srv://Bapun:bapunsahoo@cluster0.lylk42c.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>{
    app.listen(PORT, () => {
        console.log(`Server Running on Port: http://localhost:${PORT}`);
    })
  })
  .catch((error) =>{
    console.log(`${error} did not connect`)
  }); 

