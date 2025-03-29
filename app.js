require("dotenv").config();

const mongoose= require("mongoose");
const express= require("express");
const routes= require("./routes");
const app= express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
var cors = require("cors");

app.use(bodyParser.json({ limit: "50mb" }));
//app.use("/uploads", express.static("uploads"));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use("/emp",routes);
//app.use(express.json());
mongoose.connect("mongodb://localhost:27017/employeedb")
.then(async() =>{
    
   /* app.post("/empl",(req,res)=>{
        console.log(req.body);
      
        const emp=new employee(req.body);
        emp.save().then(()=>{
            console.log(hello);
            res.send(emp);
          
        }).catch((e)=>{
            res.send(e);
        })
      
    })*/
    const port=process.env.PORT || 3003;
    app.listen(port);
    console.log("server serve with port " + port);
   /* logger.info("server serve with port number:${port}");
    logger.info("mongodb connected....");
    */
    console.log("Connected to MongoDB successfully")

})
.catch((err)=>console.log(err));