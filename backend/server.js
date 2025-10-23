import express from 'express';
import { connect } from 'mongoose';
import conectBD from './config/db.js';
import { registerUser } from './controller/UserController.js';
import userRouter from './routes/UserRoute.js';
import cookieParser from 'cookie-parser';
import cardsRoute from './routes/cardRoute.js'
import cors from 'cors'


const app = express();
const PORT = 8000

// ama haddii aad rabto origins badan:
const allowed = ['https://phishing-h4is.onrender.com', 'https://another.app'];
app.use(cors({
  origin: function(origin, cb){
    if(!origin) return cb(null, true); // allow non-browser tools
    if(allowed.indexOf(origin) !== -1) cb(null, true);
    else cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use("/api/cards", cardsRoute);



conectBD();
app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);

})
