const employeeSchema=require("../models/employeeMaster");
const enums=require("../json/enums.json");
module.exports={
    createEmployee:async(req,res)=>
    {
        let{name,email,address,birthday,joingDate,mobile}=req.body;
        console.log(req.body);
        const empObject={
            vName:name,
            vEmail:email,
            vAddress:address,
            vBirthday:birthday,
            vJoining:joingDate,
            vMobile:mobile,

        }
        try{
            const newEmployee=new employeeSchema(empObject);
            const employeeData=await newEmployee.save();

            const payload={
                _id:employeeData._id,
                name:employeeData.vName,
                email:employeeData.vEmail,
                address:employeeData.vAddress,
                birthday:employeeData.vBirthday,
                joingDate:employeeData.vJoining,
                mobile:employeeData.vMobile

            }
            console.log(payload,"suceesfully inserted");
            return res.status(enums.HTTP_CODES.OK).json({
                sucess:true,
                data:payload,
            })

     
        }catch(e){
            return res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR)
            .json({sucess:false,message:e.message});
        }
    },

verify:async(req, res)=>{



},
viewEmployee:async(req, res)=>{
    const{_id,letter}=req.query;
    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||parseInt(process.env.LIMIT);

    let criteria={};
    if(_id){
        criteria={_id:_id};

    }

    try{
       const count=await employeeSchema.find(criteria).countDocuments();
       const employee = await employeeSchema.find(criteria,{
        name:"$vName",
        email:"$vEmail",
                address:"$vAddress",
                birthday:"$vBirthday",
                joingDate:"$vJoining",
                mobile:"$vMobile"

       })
       .skip(page*limit-limit)
       .limit(limit);


       return res.status(enums.HTTP_CODES.OK).json({
        sucess:true,
        data:employee,
        count:count,
    });
    }
    catch(e){
       return res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json({
        sucess:false,
        message:e.message,
       })
    }

},
updateEmployee:async(req,res)=>{
const {_id}=req.query;

const{name,email,address,birthday,joingDate,mobile}=req.body;
const existData=await employeeSchema.findOne({_id:_id});

if(!existData){
    return res.status(enums.HTTP_CODES.NOT_FOUND).json({
        sucess:false,
        message:"emplyee does not exist"
    })
}
const object4employee={
    $set:{
        vName:name||existData.vName,
        vEmail:email||existData.vEmail,
        vAddress:address||existData.vAddress,
        vBirthday:birthday||existData.vBirthday,
        vJoiningDate:joingDate||existData.vJoiningDate,
        vMobile:mobile||existData.vMobile

    }
};
try{
    const savedData = await employeeSchema.findOneAndUpdate(
        { _id: _id },
        object4employee,
        { new: true }
      );
      console.log(savedData);
      const payload = {
        id: savedData._id,
        name: savedData.vName,
        email: savedData.vEmail,
        address: savedData.vAddress,
        birthday:savedData.vBirthday,
        joingDate:savedData.vJoiningDate,
        mobile:savedData.vMobile,
      };
 
      return res.status(enums.HTTP_CODES.OK).json({
        success: true,
        data: payload,
      });
}
catch (error) {
      return res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
},

deleteEmployee:async(req,res)=>{
     const {_id}=req.query;
     const existData=await employeeSchema.findOne({_id:_id});
     if(!existData){
        return res.status(enums.HTTP_CODES.NOT_FOUND).json({
            sucess: false,
            message: "Employee does not exist",
        })

     }
     try{
        await employeeSchema.findOneAndDelete({_id:_id});
        return res.status(enums.HTTP_CODES.OK).json({
            sucess:true,
            message:"emaployee deleted successfully"
        })

     }catch(e){
        return res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json({
            sucess:false,
            message:e.message,
        })
     }
},


}
