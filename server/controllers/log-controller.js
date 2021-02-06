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
router.get('/', validateSession, (req,res) => {
    const query = {where: {owner_id: req.user.id}}
    Log.findAll( query )

    .then(logs => { 
        // display all info 
        res.status(200).json(logs);
    })

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

    // .then(log => res.status(200).json(log))
    .then(log => { 
        
        if(log.length === 0) {
            res.status(404).json({ message: `Log #${log_id} has NOT been created yet.`})
        } else {
            let person = log[0].owner_id;

            res.status(200).json({
                log,
                message: `User ${person} created Log #${log_id}.`
            });            
        }
    })

    .catch(err => res.status(500).json({error: err}))

});

/*****************
 * LOG - UPDATE
 ****************/
router.put('/:id', validateSession, (req,res) => {

    let log_id = req.params.id;

    const updateLogEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result
    };

    const query = {where: { id: log_id, owner_id: req.user.id} };  // returning:true --> returns the updated log. If does not want, just remove this item

    Log.update(updateLogEntry, query)

    .then((log) => res.status(200).json({ message: log > 0 ?  `Log #${log_id} Updated` : `Log #${log_id} NOT Updated - either it does not exist or the user is not the owner of this log.`,
    }))

    .catch((err) => res.status(500).json({error: err}));

});



/******************
 * LOG - DELETE 
 *****************/

router.delete("/:id", validateSession, function(req,res){
    let log_id = req.params.id;

    const query = { where: { id: log_id, owner_id: req.user.id} };

    Log.destroy(query)
    
    .then((response) => res.status(200).json({ message: response > 0 ?  `Log #${log_id} Removed` : `Log #${log_id} NOT removed - either it does not exist or the user is not the owner of this log.`}))

    .catch((err) => res.status(500).json({error: err}));
});







module.exports = router;