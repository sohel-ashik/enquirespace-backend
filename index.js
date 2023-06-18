
//external imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')

//internal imports
const defaultErrorHandler = require('./MiddleWares/Common/errorHandler');
const homeRouter = require('./Routers/homeRouter');
const signupRouter = require('./Routers/signupRouter');
const loginRouter = require('./Routers/loginRouter');
const accountsRouter = require('./Routers/accountsRouter');

const app = express();
dotenv.config();

//dataBase Connection
mongoose
    .connect(`mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASS}@cluster-es.avemicr.mongodb.net/enquire_space?retryWrites=true&w=majority`)
    .then(()=>console.log('Database is connected'))
    .catch((err)=>console.log(err));

//cors setup
app.use(
    cors( {
        origin: 'http://127.0.0.1:5173'
    })
)

// request parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//routing setup
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/home',homeRouter);
app.use('/accounts',accountsRouter);

//default error handler
app.use(defaultErrorHandler);


//listner
app.listen(process.env.PORT, ()=>{
    console.log(`App is listenning on port ${process.env.PORT}`);
})

console.clear()