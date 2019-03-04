
const express=require('express');
const app=express();

const mongoose=require('mongoose');
const Todo=require('./models/Todo');
const formidable=require('formidable');

mongoose.connect('mongodb://localhost/todo');

//retrieve item
app.get('/todos',function(req,res){
    Todo.find({},function(err,results){
        res.json({'results':results});
    });
});

//add item
app.post("/todos", function (req, res) {
   
    var form = new formidable.IncomingForm();
    form.parse(req , function(err , fields){
        
        Todo.create({
            "title": fields.title , 
            "done" : false
        },function(err , todo){
            res.json({ "result" : todo})
        });
        
    });
});
//delete item
app.delete("/todos/:id", function (req, res) {
    var _id = req.params.id;
    Todo.remove({"_id" : _id} , function(err){
        res.json({"result" : 1})
    }); 
});

//update item
app.post("/todos/:id", function (req, res) {
    var _id = req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var k = fields.k;
        var v = fields.v;
        
        Todo.update({_id : _id} , {"$set" : {[k] : v}} , function(err){
            res.json({ "result": 1 })
        });
    });
});
app.use(express.static('www'));
app.listen(3000);