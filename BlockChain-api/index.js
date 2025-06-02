

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const generateHash = require("./utils/hashGenerator");
const path = require("path");


const app = express();
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"utils"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

const port = 8000;

app.listen(port, (req,res)=>{
    console.log("app is listening at port 8000");
    
});

app.get('/api/register', (req,res)=>{
  
    res.render("registerPage");
});

app.post('/api/register', (req,res)=>{
    let data = req.body;

    if(!data.name || !data.email) {
        res.status(400).json({
            error:"Missing fields"
        })
    }

   else{
       
       let hash = generateHash(data);
       console.log("student data", data);
       console.log("genrated hash", hash);
       
       res.status(200).json({
           message: "Successfully registered",
           hash : hash,
       })
}

})