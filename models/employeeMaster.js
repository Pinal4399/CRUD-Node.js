const mongoose = require("mongoose");
const validator = require("validator");

//create schema for database
const employeeSchema=new mongoose.Schema(
    { 
        vName:{
            type:String, 
            required:true,
            minlength:3
        },
        
        vAddress:String,
        vEmail:{
           type:String,
           required:true,
           unique:[true,"Email id alrady exist"],
           validator(value){
            if(validator.isEmail(value)){
                throw new Error("Invalid email");
            }
           }
        },
        vBirthday:String,
        vJoining:{
            type:String,
             default:Date.now(),
        },
        vMobile:
        {
type:Number,
required:true,
unique:true,
        }      
,
        
    },
{
    timestamps:true,versionKey:false,autoCreate:true
})

module.exports = employee=mongoose.model("employee", employeeSchema,"employee");

 /*  const Employee =new mongoose.model("Employee", employeeSchema);
    //const employee_schema=mongoose.model("employee", employeeSchema,"employee");
    //model.exports = employee_schema;
const createEmployee = async()=>{
    try{
    const employeeData = new Employee({
        vEmployeeName:"adam",
        vAdd: "moor",
        vEmail:"John@gmail.com",
        vBirthday:"12/6/2003",
        vMonNo:"8956325632",
    })

    const result= await employeeData.save();
    console.log(result);
}catch(err){
    console.log(err);
}
}
createEmployee(); */