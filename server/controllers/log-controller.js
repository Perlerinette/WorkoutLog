let express = require('express');
let router = express.Router();

const validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');

/* Endpoints

http://localhost:3000/log/ - POST
http://localhost:3000/log/ - GET
http://localhost:3000/log/:id - GET
http://localhost:3000/log/:id - PUT
http://localhost:3000/log/:id - DELETE

*/


/*****************
 * LOG - CREATE
 ****************/
router.post('/', validateSession, (req,res) => {
    const logEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error: err}))

})

/*****************
 * LOG - GET ALL
 ****************/
router.get('/', (req,res) => {
    Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))

});


/*****************
 * LOG - GET by ID
 ****************/
router.get('/:id', (req,res) => {
    let log_id = req.params.id;

    Log.findAll({
        where: { id: log_id}
    })

    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error: err}))

});

/*****************
 * LOG - UPDATE
 ****************/
router.put('/:id', validateSession, (req,res) => {
    const updateLogEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result
    };

    const query = { where: { id: req.params.id, owner_id: req.user.id} };

    Log.update(updateLogEntry, query)

    .then((logs) => {res.status(200).json({message: logs > 0? "Log Updated." : "Log NOT updated."});
    console.log(res.json());})
    .catch((err) => res.status(500).json({error: err}));

});



/******************
 * LOG - DELETE 
 *****************/

router.delete("/:id", validateSession, function(req,res){
    const query = { where: { id: req.params.id, owner: req.user.id} };

    Log.destroy(query)

    .then((response) => res.status(200).json({ message: response > 0 ?  " Log Removed": "No Log removed"}))
    .catch((err) => res.status(500).json({error: err}));
});

module.exports = router;