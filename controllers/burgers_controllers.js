var express = require("express");

var router = express.Router(); 

var burger = require("../models/burger.js");

router.get("/", function(req,res){

    burger.all(function(data){
        var hbsObject = {
            burgers:data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
        
    });
});

router.post("/burgers/create", function(req, res){
    console.log("working1")
    burger.create([
        "burger_name","devoured"
    ],[
        req.body.burger_name, req.body.devoured
    ], function(data){
    
        res.redirect("/burgers");
        console.log("working2")

    });
}); 

router.put("/burgers/update/:id", function(req, res) {
    
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
   burger.update({devoured: req.body.devoured}, condition, function(data) {
           res.redirect("/burgers");
        //console.log("working4");
    });
});

module.exports = router; 