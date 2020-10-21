var store = require('store')
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const getCasbinRule = (request, response) => {
  pool.query(`SELECT id,ptype,v0,v1,v2 FROM casbin_rule where ptype='p' and (v0!='super_admin') ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const addCasbinRule = (request, response) => {
  const { role, route, method } = request.body
    pool.query(`INSERT INTO casbin_rule(ptype,v0,v1,v2) VALUES ('p', $1, $2, $3) `, [role, route,method], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).json(`Rule added`)
    })
}
const modifyCasbinRule = (request, response) => {
    const {id, route, method } = request.body
      pool.query(`UPDATE casbin_rule SET v1=$1,v2=$2 where id=$3`, [route,method,id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).json(`Rule Modified`)
      })
  }

const addUser = (request, response) => {
  const { name, password, role } = request.body
  pool.query('INSERT INTO user_info(user_name, user_password, role) VALUES ($1, $2, $3) RETURNING user_id', [name, password,role], (error, results) => {
    if (error) {
      throw error
    }
    addUserInCasbinRule(name,role);
    var newId = results.rows[0].user_id;
    response.status(201).send(`Member added with user_id: ${newId}`)
  })
}

function addUserInCasbinRule( name , role ) {
   pool.query(`INSERT INTO casbin_rule(ptype,v0,v1 ) VALUES ('g', $1,$2) RETURNING ID`, [name, role], (error, results) => {
    if (error) {
      throw error
    }
  })
}

const modifyUserInCasbinRule = (request, response) => {
  const { id,role,user } = request.body
    pool.query(`UPDATE casbin_rule SET v1= $1 where id=$2 and v0=$3`, [role,id,user], (error, results) => {
     if (error) {
       throw error
     }
     response.status(201).json(`User Modified`)
   })
 }
 

const getRoles = (request, response) => {
  pool.query(`SELECT distinct  v1 as role FROM casbin_rule where ptype='g' and (v1!='super_admin')`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getUserRoles = (request, response) => {
    pool.query(`SELECT v0 as user,v1 as role,id FROM casbin_rule where ptype='g' and (v1!='super_admin')`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  

module.exports = {
  getCasbinRule,
  addUser,
  getRoles,
  addCasbinRule,
  getUserRoles,
  modifyUserInCasbinRule,
  modifyCasbinRule
}
