// const user = require('../models/user');

const router = require('express').Router(); //import Express and access Router in one line of code. 
const User = require('../db').import('../models/user'); //import user model with db.js and store in variable called user.Sequelize model class uses capitals
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//THIS IS A USER SIGN UP
// router.post('/create', function (req,res) {  //must pass two arguments (inputs) into the .post method. ./create is the path




 

    // User.Create({    //this method means inputs are hardcoded and will cause an error when sending more than one request. Instead use format below.
    //     email: "user@email.com",
    //     password: "password1234'"
    // })

   

    // User.login({
    //     name: lastname.firstname
    //     password: req.body.user.password
    // })

    // .then(  //handles the return of a promise from the query, catch to handle errors, or return "this is our user endpoint!".
//         res.send('This is our user/create endpoint!')
//     );
// });
router.post("/login", function (req, res) {  
       
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
//  User.create({  //this is a Sequelize method that allows us to create an instance and send it to DB as long as datatype (ie string) matches
//         email: req.body.user.email, //here we are using middleware in Express
//         password: bcrypt.hashSync(req.body.user.password, 13) //the bcrypt function called hashSync which has two inputs(arguments)
//     })                                                        //13 is how many times we tell the function to "salt" our password

.then(function loginSuccess(user) {
    if (user) {
        bcrypt.compare(req.body.user.password, user.password, function (err, matches) { //
            if(matches) {
        
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24}); //create and store variable called token
                            //call on jwt variable, dependence in jsonwebtoken. sign() is method to create token, along with 2 inputs, the data & signature
                            //"i_am_secret" is the current password(which expires in one day)
        
        res.status(200).json({  //just changed res.send to res.json which can convert non-objects(null and undefined) into valid json. res.sent cannot do this.
            user: user,  //left user is the name of the object. right user is parameter from our createSuccess() function
            message: "User successfully logged in!",
            sessionToken: token,  //the server has assigned a token to a specific user
        })

    } else {
        res.status(502).send({ error: "Login Failed"});
    }

        });

} else {
    res.status(500).json({ error: "User does not exist."})
}
})
.catch(err => res.status(500).json({error: err}))
});

// .then(function loginSuccess(user) {
//     res.status(200).json({
//         user: user
//     })
// })
// .then(function loginSuccess(user) {

    // if (user) {  //create a conditional(if) with a true or false value
    //     res.status(200).json({
    //         user: user  //if there is a match, we send back a user object back in response with a status of 200
    //     })
    // } else {  //else to catch untrue values
    //   res.status(500).json({ error: "User does not exist."})  //get status code of 500 and send error msg back in the response
    //  }
    // })
  


//USER SIGN IN

// router.post('/login', function(req, res) {
    // User.findOne({  //sequalize method that goes into db to find what we are looking for
        // where: {    //object in Sequelize that says "look for something matching my properties". 
            // email: req.body.user.email   //here looking for a USER that has a property of EMAIL and matches the values we sent in our request (user@email.com)
//             }                             //looking in email column in user tavle for matching
// })


module.exports = router;