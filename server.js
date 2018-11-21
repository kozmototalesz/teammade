const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const passport=require('passport');
const path = require('path');

const users=require('./routes/api/users');
const profiles=require('./routes/api/profiles');
const projects=require('./routes/api/projects');


const app=express();

//Body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB Conf file
const db=require('./config/keys').mongoURI;

// Connect to MongoDB 
mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(()=>console.log("MongoDB Connected"))
    .catch((err)=>console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

//Using routes
app.use('/api/users',users);
app.use('/api/profile',profiles);
app.use('/api/project',projects);


//Serve frontend
if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res)=>
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    )

}
 
const port = process.env.PORT || 5000; 

app.listen(port, ()=> console.log(`Server running on port ${port}`));