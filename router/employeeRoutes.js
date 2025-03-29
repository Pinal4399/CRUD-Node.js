const express = require('express');
const router = express.Router();
const employeeController=require("../controller/employee");

//*route POST / insert
//?desc Add employee

router.post('/insert', employeeController.createEmployee);
//*route POST / view
//?desc view employee
router.get("/view", employeeController.viewEmployee);
//*route PUT / update
//?desc update employee
router.put('/update', employeeController.updateEmployee);
//*route DELETE / delete 
//?desc Add employee
router.delete('/delete', employeeController.deleteEmployee);

module.exports = router;
