var store = require('store')
require('dotenv').config()
var moment = require('moment')
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const loginRequest = (request, response) => {
  const { userName, userPassword } = request.body
  console.log("request Body", request.body)
  store.set('userName', userName)
  console.log("name   password", store.get('userName', userName), userPassword)
  pool.query('SELECT * FROM public.user_info where user_name = $1', [userName], (error, results) => {
    if (error) {
      response.status(401).json({ code: 1, message: 'error', data: error })
      throw error
    }
    console.log("form db pass", results.rows[0].user_password)
    console.log("form json pass", userPassword)
    if (results.rows[0].user_password === userPassword) {
      response.status(200).json({ code: 0, message: 'success', data: results.rows[0] })
    } else {
      response.status(401).json({ code: 1, message: 'error', data: 'Wrong Credentials' })
    }
  })
}


const getRequestApplication = (request, response) => {
  pool.query('SELECT * FROM request_master ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRequestApplicationById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM request_master WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createRequestApplication = (request, result, callback) => {
  console.log("CREATE REQ DB____________________");
  var { project, location, skills, yearOfExperience, designation, billingType, startDate, endDate,
    billingStartDate, billingEndDate, count, jobDescription, uploadMrfId } = request.body

  startDate = endDate = billingStartDate = billingEndDate = moment();

  pool.query(`INSERT INTO request_master (project,location,primary_skills,Years_of_Experience,
   Designation,Billing_Type,Start_Date,End_Date,Billing_Start_Date,Billing_End_Date,count,
   Job_Description,UploadMRF_ID) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) 
   RETURNING ID`, [project, location, skills, yearOfExperience, designation, billingType, startDate, endDate, billingStartDate,
      billingEndDate, count, jobDescription, uploadMrfId], (error, results) => {
        if (error) {
          throw error
        }
        var newId = results.rows[0].id;
        callback(newId)
        console.log("CREATE REQ DB_________4___________");
      })

  console.log("CREATE REQ DB________7____________");
}




const updateRequestApplication = (request, response) => {

  const id = parseInt(request.params.id)
  var { project, location, skills, yearOfExperience, designation, billingType, startDate, endDate,
    billingStartDate, billingEndDate, count, jobDescription, uploadMrfId } = request.body

  startDate = endDate = billingStartDate = billingEndDate = moment();

  pool.query(`UPDATE request_master set project=$1,location=$2,primary_skills=$3,Years_of_Experience=$4,
   Designation=$5,Billing_Type=$6,Start_Date=$7,End_Date=$8,Billing_Start_Date=$9,Billing_End_Date=$10,count=$11,
   Job_Description=$12,UploadMRF_ID= $13 where id=$14
   RETURNING ID`, [project, location, skills, yearOfExperience, designation, billingType, startDate, endDate, billingStartDate,
      billingEndDate, count, jobDescription, uploadMrfId, id], (error, results) => {
        if (error) {
          throw error
        }
        var newId = results.rows[0].id;
        response.status(201).send(`request modified with ID: ${newId}`)
      })
}


const deleteRequestApplication = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('DELETE FROM request_master WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`request deleted with ID: ${id}`)
  })
}
//Get Employee List

const employeeList = (request, response,callback) => {

  var { primary_skill, domain, designation, total_experience_at_joining, allocation_type } = request.body
// console.log(request.body)
console.log(primary_skill+ " " +domain+ " "+designation+" "+total_experience_at_joining+" " );
  pool.query(`SELECT * FROM employee_master where 
  primary_skill=$1 and domain=$2 and 
  designation=$3 
  and   total_experience_at_joining=$4 ORDER BY id ASC`,
   [primary_skill, domain, designation,
      total_experience_at_joining], (error, results) => {
        if (error) {
          throw error
        }
        callback(results.rows)
      })

}


//Allocate
const getAllocationMaster = (request, response, callback) => {
  pool.query('SELECT * FROM allocation_master ORDER BY id DESC', (error, results) => {
    if (error) {
      throw error
    }
    callback(results.rows)
    // response.status(200).json(results.rows)
  })
}

const getAllocationMasterId = (request, response, callback) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM allocation_master WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }

    callback(results.rows)
    // response.status(200).json(results.rows)
  })
}

const createAllocationMaster = (request, response, callback) => {
  var { project_code,percent_allocation,start_date,end_date,billing_type,billing_rate,onsite_offshore,doa,
    approval_status,planned_release_date,remark,billing_status,work_location,client_place,request_id,request_raised_by,primary_skills,
    domain,job_description,employee_name,designation,year_of_experience} = request.body

  startDate = endDate = plannedReleaseDate = moment();

  pool.query(`insert into allocation_master(project_code,percent_allocation,start_date,end_date,billing_type,billing_rate,onsite_offshore,doa,
    approval_status,planned_release_date,remark,billing_status,work_location,client_place,request_id,request_raised_by,primary_skills,
    domain,job_description,employee_name,designation,year_of_experience) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22) 
   RETURNING ID`, [project_code,percent_allocation,start_date,end_date,billing_type,billing_rate,onsite_offshore,doa,
    approval_status,planned_release_date,remark,billing_status,work_location,client_place,request_id,request_raised_by,primary_skills,
    domain,job_description,employee_name,designation,year_of_experience], (error, results) => {
        if (error) {
          throw error
        }

        var newId = results.rows[0].id;
        callback(newId)
        // response.status(201).send(`{data: 'allocation done with ID: ${newId}}'`)
      })
}


const updateAllocationMaster = (request, response) => {
  const id = parseInt(request.params.id)
  var { selectResource, percentAllocation, startDate,
    endDate, billingType, project } = request.body
  startDate = endDate = moment();
  pool.query(`UPDATE allocation_master set Employee_ID=$1,percent_allocation=$2,Start_Date=$3,
   End_Date=$4, Billing_Type=$5,Project_Code=$6 where id =$7
   RETURNING ID`, [selectResource, percentAllocation, startDate,
      endDate, billingType, project, id], (error, results) => {
        if (error) {
          throw error
        }
        var newId = results.rows[0].id;
        response.status(201).send(`{data: 'allocation modified with ID: ${newId}'}`)
      })
}


const deleteAllocationMaster = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM allocation_master WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    // response.status(200).send(`allocation deleted with ID: ${id}`)
  })
}
// Approve


const approveResource = (request, response, callback) => {

  const id = parseInt(request.params.id)
  console.log("id   :", id)

  var { approval_status, remark } = request.body

  console.log("approvalStatus   :", approval_status)

  startDate = endDate = moment();

  pool.query(`UPDATE allocation_master set Approval_Status=$1 , remark =$2 where id =$3`,
    [approval_status, remark, id], (error, results) => {
      if (error) {
        throw error
      }
      var newId = id
      callback(newId)
      // response.status(201).send(`{data: 'approval done with ID: ${newId}'}`)
    })
}


module.exports = {
  loginRequest,
  getRequestApplication,
  getRequestApplicationById,
  createRequestApplication,
  updateRequestApplication,
  deleteRequestApplication,
  employeeList,
  getAllocationMaster,
  getAllocationMasterId,
  createAllocationMaster,
  updateAllocationMaster,
  deleteAllocationMaster,
  approveResource,
}