//Environment Configuration
//elastic team-implemetation

/*
var apm = require('elastic-apm-node').start({
  // Override service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: 'staff_allocation',
  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'http://172.25.8.45:8200/'
})*/


//elastic team-implemetation end
require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const routes = require('./server/routes')
//Routers
var ftpRouter = require('./server/routes/ftp');
var cassandraRouter = require('./server/routes/cassandra');
var exportRouter = require('./server/routes/export');
var camundaRouter = require('./server/routes/camunda');
var resourceAllocationRouter = require('./server/routes/resourceAlloc');
var bodyParser = require('body-parser')
//var fileUploadRoute =require("./FileServer")

// //CASBIN Authorization
const { newEnforcer } = require('casbin')
const authz = require('casbin-express-authz')

const { SequelizeAdapter } = require('casbin-sequelize-adapter')
var store = require('store')
const db = require('./server/queries')
const saDB = require('./server/superAdminQueries')

app = express();

app.use(bodyParser.json({limit: '50mb'}))
app.use(
  bodyParser.urlencoded({
    extended: true,
limit:'50mb'
  })
)
app.use(cors())
app.use('/login', routes.loginRoute)   //LOGIN 


//use static files
app.use(express.static(path.join(__dirname, 'server/public')));
//CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header("Access-Control-Expose-Headers", " Content-Disposition");
  next();
});

//use static files
app.use(fileUpload());
app.use(express.static(path.join(__dirname, '/dist/staffallocation')));



////////////////////////////    Authorization Start     /////////////////////////////////////////  
// app.use((req, res, next) => {		//set userinfo
//   console.log("AUTH _______________", req.get('Authorization'))
//   const username = req.get('Authorization') || store.get('userName')
//   console.log("server.js DB username :" + store.get('userName'))
//   req.user = { username }
//   next()
// })
// app.use(authz(async () => {
//   console.log("AUTHZ")
//   const a = await SequelizeAdapter.newAdapter('postgres://postgres:postgres@172.25.8.59:5432/StaffAllocationMain', true);
//   const enforcer = await newEnforcer('./server/authzFile/model.conf', a)
//   return enforcer
// }))

app.get('/', function(req, res) {
  res.redirect('/dashboard');
 });
app.get('/dashboard*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/staffallocation/index.html'));
 });
 app.get('/master*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/staffallocation/index.html'));
 });
app.post('/api/admin/addUser', saDB.addUser)
app.post('/api/admin/addRule', saDB.addCasbinRule)
app.get('/api/admin/getRules', saDB.getCasbinRule)
app.get('/api/admin/getRoles', saDB.getRoles)
app.get('/api/admin/getUserRoles', saDB.getUserRoles)
app.put('/api/admin/modifyRule', saDB.modifyCasbinRule)
app.put('/api/admin/modifyUserRole', saDB.modifyUserInCasbinRule)
////////////////////////////    Authorization END     ///////////////////////////////////////// 
app.use('/api/ftp', ftpRouter);
app.use('/api/cassandra', cassandraRouter);
app.use('/api/export', exportRouter);
app.use('/api/resourceRequest', resourceAllocationRouter);
app.use('/api/camunda', camundaRouter);

app.post('/api/addRequestApplication', db.createRequestApplication)
app.post('/api/getResourceList', db.employeeList)
app.post('/api/addRequestAllotment', db.createAllocationMaster)
app.get('/api/getAllocationMast', db.getAllocationMaster)
app.get('/api/getAllocationMasterId/:id', db.getAllocationMasterId)
app.put('/api/approveAllotment/:id', db.approveResource)

app.get('/api/getRequestApplication', db.getRequestApplication) 
app.get('/api/getRequestApplication/:id', db.getRequestApplicationById)
app.put('/api/updateRequestApplication/:id', db.updateRequestApplication)
app.delete('/api/deleteRequestApplication/:id', db.deleteRequestApplication)
app.post('/api/addRequestAllotment', db.createRequestApplication)


app.use("/api/dash",routes.deliveryDashboardRoute)
app.use("/api/project",routes.projectRoute) 
app.use("/api/resource",routes.searchResourceRoute) 
app.use("/api/employee",routes.employeeRoute) 
app.use("/api/allocation",routes.selectAllocation) 
app.use("/api/dropdown",routes.getDropdown) 
app.use("/api/allocateNew",routes.allocateResourceRoute)
app.use("/api/report/monthlyAllocation",routes.searchAllocationReport) 
app.use("/api/report/monthlyAllocation",routes.searchAllocationReport) 

app.use("/api/dashb",routes.hr_financeDashboard) 

app.use("/api/allocationDetails",routes.AllocationDetails) 

app.use("/api/COE",routes.projectAllocationForCOERoute) 

app.use("/api/newHire",routes.NewHire)

app.use("/api/allocate",routes.editAllocationDetailsRoute)


////////////////////////////////////   File Upload Routes  ////////////////////////////
//app.use('/api/fileService',fileUploadRoute)

// catch 404 and forward to error handler
app.use(function (req, res, next) {

console.log(req.get('host')+':'+req.originalUrl)
  next(createError(404));
});


module.exports = app;
