const jwt = require('jsonwebtoken');  //interacting with token for ea session (login) so we import the JWT pkg
const user = require('../db').import('../models/user');  //need to communicate with our user model db

const validateSession = (req, res, next) => {  //fat arrow function named validateSession with 3 parameters
    const token = req.headers.authorization;    //var token holds the token pulled from the header
    console.log('token-->', token);

    if (!token) {   //shows error 403 when there is no token present
        return res.status(403).send({ auth: false, message: "No token provider"})
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {  //verify method decodes token. paraameters are 1.token 2.JWT to decrypt token 3.callback function
          console.log('decodetoken-->', decodeToken);                                                   //returning either decodeToken if successful or null if unsuccessful

            if (!err && decodeToken) {  //checks if there is No error AND if decoded has a value
                user.findOne({            //userFind looks in table for id matching decodeToken.id
                    where: {
                        id: decodeToken.id
                    }
                })
                .then(user => {  //lines 13, 14 & 15 return a promise that is resolved and returned by .then(). passed on to callback function
                  console.log('user-->', user);
                    if(user) throw err;
                  console.log('req-->', req);
                    req.user = user;  //line 18 callback sets the user value and sends on to next destination
                    return next();  //allows us to exit out of this function. This sets up a middleware function next()
                })
                .catch(err => next()); //if rejected, .catch() passes an error into the next() functiion

            } else{
                req.errors = err;
        } else {
            req.errors = err;
            return res.status(500).sebd('Not Authorized'); //when there is no value for the decodeToken
        }
     });
    }
    };