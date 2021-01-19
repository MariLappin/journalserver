let express = require('express');  //imports the Express framework into a variable called express
let router = express.Router(); //creates abnother variable called router and accesses express properties by expres.whatever, here the Router. Returns a router object

let validateSession = require('../middleware/validate-session');

router.get('/practice', validateSession, function (req, res)
{
    res.send('Hey!! This is a practice route!')

})

// router.get('/practice', function(req, res)  //allows completion of an HTTP GET request. ./practice is the path. req, res is a callback function. Both are arguments(inputs)
// {                                            //function(req, res) gets called when a request for a specifies HTTP and route is received. (in this case GET)
    // res.send('Hey!! This is a practice route')  //res. is an express method calling a response object, in this case a string ('Hey, this is a ...")

// })



module.exports = router;  //exports the module for use outside the file (ie journalcontroller.js)


