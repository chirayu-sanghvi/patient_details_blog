var express = require("express");
var mongoose = require("mongoose");
var expressSanitizer = require("express-sanitizer");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var app = express();


mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"))

var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    age:String,
    created:{type:Date,default:Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);



//Index Routes starts here

app.get("/",function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
   Blog.find({},function(err,blogs){
       if(err)
       console.log("Error!");
       else
       res.render("index",{blogs:blogs});
   }) ;
});

//index Routes End here

//New And Create Rouyte start here

app.get("/blogs/new",function(req,res){
    res.render("new");
});

app.post("/blogs",function(req,res){
    req.body.blog.body= req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newBlog){
        if(err)
        res.render("new");
        else
        res.redirect("/blogs");
        
    });
});



//Show Routes

app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err, fdblog){
        if(err)
        res.redirect("/blogs");
        else
        res.render("show",{blog:fdblog});
    })
});


//Edit Route
app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,foundblog){
        if(err)
        res.redirect("/blogs");
        else
        res.render("edit",{blog:foundblog});
    });
});

//update Route

app.put("/blogs/:id",function(req,res){
    req.body.blog.body= req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
        if(err)
            res.redirect("/blogs");
        else
            res.redirect("/blogs/"+req.params.id);
        
    });
});

//delete Route
app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            
            res.redirect("/blogs");
        }
        else{
            
        res.redirect("/blogs");}
    })
    

});

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("connected");
})
