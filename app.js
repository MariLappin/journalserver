require("dotenv").config();
let express = require('express');
// const { use } = require('./controllers/journalcontroller');
let app = express();
// app.use("/test", function(req, res){
//      res.send("This is a message from the test endpoint on the server!") //THIS LINE IS AN EXPRESS FUNCTION res.send (response send). The response is a resp OBJECT
//  }) //.send() is the method that handles sending out the response

const sequelize = require('./db');

let journal = require('./controllers/journalcontroller')
let user = require('./controllers/usercontroller')

// app.use("/mari", function(req, res){
//     res.send("My name is Mari and I am 60 years old.")
// })

// let journal = require('./controllers/journalcontroller');
// let user = require('./controllers/usercontroller');
// let calc = require('./controllers/calculatorcontroller');

sequelize.sync();

app.use(express.json());  //tells app we want Json to be used to process request


app.use('/user', user);


// app.use('/calculator', calc);

app.listen(4000, function(){
    console.log('App is listening on port 4000');
})

//  })

//localhost:3000

//localhost:3000/test