//require express in the module
const express = require('express');
//create new express router by setting up const variable that's assigned to the call to the express.router method with no arguments
const campsiteRouter = express.Router();

campsiteRouter.route('/')
//chain methods together into a single chain
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the campsites to you');
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403; //operation is not supported
    res.end('PUT operation is not supported on /campsites');
})
.delete((req, res) => {
    res.end('Deleting all campsites');
});

campsiteRouter.route('/:campsiteId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`); 
})
.put((req, res) => {
    //write to the body
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name} 
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

//export campsiteRouter so that it can be used elsewhere
module.exports = campsiteRouter;




/* 
BEFORE CHAINING THE METHODS --

//support for rest api endpoints; any http requests to this path will trigger this method
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //pass control of the application routing to the next relevant routing method after this one, otherwise it will just stop here
});
//set up endpoint for GET request
app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you');
});
//set up endpoint for POST request
app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});
//set up endpoint for PUT request
app.put('/campsites', (req, res) => {
    res.statusCode = 403; //operation is not supported
    res.end('PUT operation is not supported on /campsites');
});
//set up endpoint for DELETE request
app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

*/