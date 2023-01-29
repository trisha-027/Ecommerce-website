var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/registration_form')

var db = mongoose.connection;

db.on('error', ()=> console.log("Error in connection"))
db.once('open', ()=> console.log("\n\n Connected to database\n\n"))

app.post("/register", (req,res)=>{
    var fname = req.body.fname;
    var email = req.body.email;
    var adr = req.body.adr;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var cname = req.body.cname;
    var ccnum = req.body.ccnum;
    var expmonth = req.body.expmonth;
    var expyear = req.body.expyear;
    var cvv = req.body.cvv;

    var data ={
        "Full name":fname,
        "Email":email,
        "Address":adr,
        "City":city,
        "State":state,
        "ZIP":zip,
        "Card Name":cname,
        "Card Number":ccnum,
        "Expiry Month":expmonth,
        "Expiry Year":expyear,
        "cvv":cvv
    }

    db.collection('user_details').insertOne(data, (err, collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
    });

    return res.redirect("Register_success.html");

})

app.get("/", (req,res)=>{
    res.set({
        "Allow-access-Allow-Origin" : '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on PORT 3000");