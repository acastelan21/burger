var express = require("express");
var router = express.Router(); 

var burger = require("../models/burger.js")

router.get("/", function(req,res){

    burger.all(function (data){
        var hbsObject = {
            burgers:data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
        
    });
});

router.post("/api/burgers", function(req, res){
    console.log("working1")
    burger.create([
        "burger_name","devoured"
    ],[
        req.body.burger_name, req.body.devoured
    ], function(result){
    
        res.json({ id: result.insertId});
        

    });
}); 

router.put("/api/burgers/:id", function(req,res){
    console.log("working3")
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    burgers.update({
        devoured: req.body.devoured
    }, condition, function(result){
            if(result.changedRows == 0){
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        console.log("working4")
    });
});

module.exports = router; 