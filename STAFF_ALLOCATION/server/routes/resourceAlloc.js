var express = require('express');
var router = express.Router();
var axios = require('axios')
const db = require('../queries')
const emailService = require("../services/mailService")

const DAO1 = require("../DAO/updateAllocationDAO")

const DAO2 = require("../DAO/allocateResourceDAO")
const DAO3 = require("../DAO/editAllocationDetailsDAO")
const DAO4 = require("../DAO/requestNewHireDAO")
const DAO5 = require("../DAO/camundaRequestDAO")
//const camundaHost = 'http://172.25.8.59:8080/engine-rest'
const camundaHost = 'http://' + process.env.CAMUNDA_HOST + ':' + process.env.CAMUNDA_PORT + '/engine-rest'
console.log("  camundaHost   :  ", camundaHost)
// var resourceDAO = require('../DAO/resourceDAO')
// const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };
processStarted = false;
RELEASE_PROCESS_DEFINITION_ID = null;
ALLOCATE_PROCESS_DEFINITION_ID = null;
NEWHIRE_PROCESS_DEFINITION_ID = null;
PROCESS_INSTANCES = [];

// Fetched_TASK_IDS =[];
function startProcessInstance(key, RESPONSE, Requestor, Resource, requestID, date_submitted, release_date
    , old_release_date, emp_code, proj_code, allocation_request_type, new_doa, new_release_date, new_percentage_allocation) {
    console.log("KEY  ******************* ", key)

    console.log("DATE SUBMITTED-------------------------", date_submitted)
    var PROCESS_DEFINITION_ID
    var varBody = {}
    if (key == 'release_resource_process') {
        PROCESS_DEFINITION_ID = RELEASE_PROCESS_DEFINITION_ID
        varBody = {
            // todo: 'Start Camunda Process'
            "variables": {
                "requestId": {
                    "value": requestID,
                    "type": "Integer"
                },
                "requestor": {
                    "value": Requestor,
                    "type": "string"
                },
                "resource": {
                    "value": Resource,
                    "type": "string"
                },
                "date_submitted": {
                    "value": date_submitted,
                    "type": "string"
                },
                "new_release_date": {
                    "value": new_release_date,
                    "type": "string"
                },
                "release_date": {
                    "value": release_date,
                    "type": "string"
                },
                "old_release_date": {
                    "value": old_release_date,
                    "type": "string"
                },
                "employee_code": {
                    "value": emp_code,
                    "type": "string"
                },
                "project_code": {
                    "value": proj_code,
                    "type": "string"
                },
                "allocation_request_type": {
                    "value": allocation_request_type,
                    "type": "string"
                }
            },
            "withVariablesInReturn": true
        }
    } else if (key == 'allocate_resource_process') {
        PROCESS_DEFINITION_ID = ALLOCATE_PROCESS_DEFINITION_ID
        varBody = {
            // todo: 'Start Camunda Process'
            "variables": {
                "requestId": {
                    "value": requestID,
                    "type": "Integer"
                },
                "requestor": {
                    "value": Requestor,
                    "type": "string"
                },
                "resource": {
                    "value": Resource,
                    "type": "string"
                },
                "date_submitted": {
                    "value": date_submitted,
                    "type": "string"
                },
                "employee_code": {
                    "value": emp_code,
                    "type": "string"
                },
                "project_code": {
                    "value": proj_code,
                    "type": "string"
                },
                "allocation_request_type": {
                    "value": allocation_request_type,
                    "type": "string"
                },
                "new_doa": {
                    "value": new_doa,
                    "type": "string"
                },
                "new_release_date": {
                    "value": new_release_date,
                    "type": "string"
                },
                "new_percentage_allocation": {
                    "value": new_percentage_allocation,
                    "type": "Integer"
                }
            },
            "withVariablesInReturn": true
        }
    }
    else if (key == 'new_hire_resource_request_process') {
        PROCESS_DEFINITION_ID = NEWHIRE_PROCESS_DEFINITION_ID
        varBody = {
            // todo: 'Start Camunda Process'
            "variables": {
                "requestId": {
                    "value": requestID,
                    "type": "Integer"
                },
                "requestor": {
                    "value": Requestor,
                    "type": "string"
                },
                "newhire": {
                    "value": Resource,
                    "type": "string"
                },
                "date_submitted": {
                    "value": date_submitted,
                    "type": "string"
                },
                "employee_code": {
                    "value": emp_code,
                    "type": "string"
                },
                "project_code": {
                    "value": proj_code,
                    "type": "string"
                },
                "allocation_request_type": {
                    "value": allocation_request_type,
                    "type": "string"
                }
            },
            "withVariablesInReturn": true
        }
    }

    if (PROCESS_DEFINITION_ID != null) {
        axios.post(camundaHost + '/process-definition/' + PROCESS_DEFINITION_ID + '/start', varBody, {
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },
        })
            .then((res) => {


                // console.log("PROCESS INSTANCE ID :" + res.data.id);
                // console.log("------------------------------------")
                // console.log("------------------------------------")
                // console.log("------------------------------------")
                // console.log("PROCESS INSTANCE ID :" + requestID);
                // PROCESS_INSTANCES.push({ 'reqId': requestID, instanceID: res.data.id, topicName: 'UNDEFINED', taskId: 'UNDEFINED', resource: Resource, requestor: Requestor })
                getNextTask(PROCESS_DEFINITION_ID, res.data.id, requestID, function (reqID, task) {
                    // console.log("MYMAP------------ ", MYMAP, index)
                    if (!reqID)
                        RESPONSE.status(200).json(task)
                    else
                        RESPONSE.status(200).json({ 'reqID': reqID, 'task': task })

                });
            })
            .catch((error) => {
                console.error(error)
            })
    }
    else {

        startProcess(key, RESPONSE, Requestor, Resource, requestID, date_submitted, release_date, old_release_date, emp_code, proj_code, allocation_request_type, new_doa, new_release_date, new_percentage_allocation)
    }
}

function startProcess(PROCESS_KEY, RESPONSE, Requestor, Resource, requestID, date_submitted, release_date, old_release_date, emp_code, proj_code, allocation_request_type, new_doa, new_release_date, new_percentage_allocation) {
    console.log("KEY (PROCESS_KEY)   : " + PROCESS_KEY);
    var typeOfRequest = "";

    var varBody = {}
    if (PROCESS_KEY == 'release_resource_process') {
        typeOfRequest = 'Release Resource Request'
        varBody = {
            // todo: 'Start Camunda Process'
            "variables": {
                "requestId": {
                    "value": requestID,
                    "type": "Integer"
                },
                "requestor": {
                    "value": Requestor,
                    "type": "string"
                },
                "resource": {
                    "value": Resource,
                    "type": "string"
                },
                "date_submitted": {
                    "value": date_submitted,
                    "type": "string"
                },
                "release_date": {
                    "value": release_date,
                    "type": "string"
                },
                "new_release_date": {
                    "value": new_release_date,
                    "type": "string"
                },
                "old_release_date": {
                    "value": old_release_date,
                    "type": "string"
                },
                "employee_code": {
                    "value": emp_code,
                    "type": "string"
                },
                "project_code": {
                    "value": proj_code,
                    "type": "string"
                },
                "allocation_request_type": {
                    "value": allocation_request_type,
                    "type": "string"
                }
            },
            "withVariablesInReturn": true
        }
    } else if (PROCESS_KEY == 'allocate_resource_process') {
        typeOfRequest = 'Allocate Resource Request';
        varBody = {
            // todo: 'Start Camunda Process'
            "variables": {
                "requestId": {
                    "value": requestID,
                    "type": "Integer"
                },
                "requestor": {
                    "value": Requestor,
                    "type": "string"
                },
                "resource": {
                    "value": Resource,
                    "type": "string"
                },
                "date_submitted": {
                    "value": date_submitted,
                    "type": "string"
                },
                "employee_code": {
                    "value": emp_code,
                    "type": "string"
                },
                "project_code": {
                    "value": proj_code,
                    "type": "string"
                },
                "allocation_request_type": {
                    "value": allocation_request_type,
                    "type": "string"
                },
                "new_doa": {
                    "value": new_doa,
                    "type": "string"
                },
                "new_release_date": {
                    "value": new_release_date,
                    "type": "string"
                },
                "new_percentage_allocation": {
                    "value": new_percentage_allocation,
                    "type": "Integer"
                }
            },
            "withVariablesInReturn": true
        }
    }
    else if (PROCESS_KEY == 'new_hire_resource_request_process') {
        typeOfRequest = 'New Hire Request'
        varBody = {
            // todo: 'Start Camunda Process'
            "variables": {
                "requestId": {
                    "value": requestID,
                    "type": "Integer"
                },
                "requestor": {
                    "value": Requestor,
                    "type": "string"
                },
                "newhire": {
                    "value": Resource,
                    "type": "string"
                },
                "date_submitted": {
                    "value": date_submitted,
                    "type": "string"
                },
                "employee_code": {
                    "value": emp_code,
                    "type": "string"
                },
                "project_code": {
                    "value": proj_code,
                    "type": "string"
                },
                "allocation_request_type": {
                    "value": allocation_request_type,
                    "type": "string"
                }
            },
            "withVariablesInReturn": true
        }
    }
    axios.post(camundaHost + '/process-definition/key/' + PROCESS_KEY + '/start',
        varBody, {
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },
        })
        .then((res) => {
            var PROCESS_DEFINITION_ID


            if (PROCESS_KEY == 'release_resource_process') {
                RELEASE_PROCESS_DEFINITION_ID = res.data.definitionId
                PROCESS_DEFINITION_ID = RELEASE_PROCESS_DEFINITION_ID
            } else if (PROCESS_KEY == 'allocate_resource_process') {
                ALLOCATE_PROCESS_DEFINITION_ID = res.data.definitionId
                PROCESS_DEFINITION_ID = ALLOCATE_PROCESS_DEFINITION_ID
            }
            else if (PROCESS_KEY == 'new_hire_resource_request_process') {
                NEWHIRE_PROCESS_DEFINITION_ID = res.data.definitionId
                PROCESS_DEFINITION_ID = NEWHIRE_PROCESS_DEFINITION_ID
            }

            console.log("PROCESS DEFINATION ID :" + PROCESS_DEFINITION_ID);
            this.processStarted = true;

            getNextTask(PROCESS_DEFINITION_ID, res.data.id, requestID, function (reqID, task) {

                var processVariables = {

                    requestID: requestID,
                    requestor: Requestor,
                    resource: Resource,
                    date_submitted: date_submitted,
                    release_date: release_date,
                    old_release_date: old_release_date,
                    newhire: Resource,
                    emp_code: emp_code,
                    proj_code: proj_code,
                    allocation_request_type: allocation_request_type

                }

                var tableInsertData = {
                    PROCESS_NAME: PROCESS_KEY,
                    PROCESS_DEFINITION_ID: PROCESS_DEFINITION_ID,
                    PROCESS_INSTANCE_ID: res.data.id,
                    TASK_NAME: task.topicName,
                    TASK_ID: task.id,
                    TASK_VARIABLES: processVariables,
                    TYPE_OF_REQUEST: typeOfRequest,
                    STATUS: "Task Running",
                    CREATED_BY: Requestor,
                    CREATED_DATE: date_submitted,

                }


                console.log("*****************************************************************")
                //console.log("  \n\n  TABLE INSERTION DATA  \n\n   ",tableInsertData)

                console.log("*****************************************************************")
                console.log("  \n\n  processVariables DATA  \n\n   ", processVariables)

                DAO5.InsertCamundaRequest(tableInsertData, function (data) {
                    console.log("CAmunda Request Data Inserted Into Tabel DATA: ", data)
                })
                if (!reqID)
                    RESPONSE.status(200).json(task)
                else
                    RESPONSE.status(200).json({ 'reqID': reqID, 'task': task })
            });
        })
        .catch((error) => {
            console.error(error)
        })
}

function getNextTask(ProcessDefinitionID, ProcessInstanceID, reqID, callback) {
    axios.post(camundaHost + '/external-task', {
        todo: 'Get Tasks '
    }, {
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },
        })
        .then((res) => {
            console.log("Task List   :", res.data)
            var TASK_LIST = res.data;
            //FILTER TASK LIST
            for (var i = 0; i < TASK_LIST.length; i++) {
                if (TASK_LIST[i].processDefinitionId == ProcessDefinitionID) {
                    if (TASK_LIST[i].processInstanceId == ProcessInstanceID) {

                        TOPIC_NAME = TASK_LIST[i].topicName
                        TASK_ID = TASK_LIST[i].id
                        if (TOPIC_NAME != 'create_request_resource_hire') {
                            callback(null, TASK_LIST[i])
                        }
                        else {
                            callback(reqID, TASK_LIST[i])
                        }
                    }
                }
            }

        })
        .catch((error) => {
            console.error(error)
        })
}

function getTaskList(callback) {
    axios.post(camundaHost + '/external-task', {
        todo: 'Get Tasks '
    }, {
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },
        })
        .then((res) => {
            var TASK_LIST = res.data;

            callback(TASK_LIST)

        })
        .catch((error) => {
            console.error(error)
        })
}
function fetchAndLockTask(topicName, instanceId, RESPONSE) {
    console.log("TOPIC TO FETCH -----------------", topicName)
    console.log("instaqnce to Compare -=-----------", instanceId)
    axios.post(camundaHost + '/external-task/fetchAndLock', {
        workerId: "nseit",

        maxTasks: 200,
        topics:
            [{
                topicName: topicName,
                lockDuration: 100000
            }]

    }, {
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },

        })
        .then((res) => {
            console.log("Task List   :", res.data)
            var responseData = res.data;
            for (var i = 0; i < responseData.length; i++) {
                if (responseData[i].processInstanceId == instanceId) {
                    completeTask(responseData[i].id, RESPONSE, instanceId)
                }
                else {
                    axios.post(camundaHost + '/external-task/' + responseData[i].id + '/unlock', {}, {
                        headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },

                    })
                        .then((res) => {
                            console.log("UnLocked")
                        })
                }
            }

        })
        .catch((error) => {
            console.error(error)
        })
}

function completeTask(taskId, RESPONSE, instanceId) {
    axios.post(camundaHost + '/external-task/' + taskId + '/complete', {
        "workerId": "nseit",
        "variables":
        {
            "resourceAllocated": { "value": true }
        }
    }, {
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },

        })
        .then((res) => {
            var responseData = res.data;
            console.log("updating camunda  ***************responseData************************", responseData)
            DAO5.UpdateCamundaRequest(instanceId, taskId, "Task Completed", function (data) {
                console.log("******************************************************************")
                console.log("******************************************************************")
                console.log("*************************UPDATE CAMUNDA REQUEST*****************************************")
                console.log(data)
            })
            // console.log('CompleteD!!!!!!!!!!!!! Task Response  : ', responseData)
            RESPONSE.status(200).json({ code: 0, message: 'Completed' })
        })
        .catch((error) => {
            console.error(error)
        })
}


//START PROCESS INSTANCE
router.post('/startProcess', function (req, res, next) {
    var key = req.query.key
    var requestor = req.body.requestor
    var resource = req.body.employee_name
    var date_submitted = req.body.date_submitted
    var emp_code = req.body.employee_code
    var allocation_request_type = req.body.allocation_request_type

    console.log("*******allocation_request_type******", allocation_request_type)

    var proj_code = req.body.project_code
    var type = req.query.type
    console.log("--------------------------------", req.query.key)
    if (type == "insert") {
        var respDB = DAO2.InsertAllocateResource(req.body, function (data, code, errorMsg) {

            console.log("code ......", code)
            console.log("message ....", errorMsg)


            if (code == 0) {
                // console.log("INSERTED", data)
                console.log("################ CAMUNDA START PROCESS #############")
                startProcessInstance(key, res, requestor, resource, req.body.id, date_submitted, null, null, emp_code, proj_code, type, null, null, null);
            }

            if (code == 1) {
                console.log("Inside Code 1......")
                res.json({ message: errorMsg, code: 1 })
            }
            if (code == 2) {
                console.log("Inside Code 2......")
                res.json({ message: errorMsg, code: 2 })
            }

        })
    } else if (type == 'update') {
        var respDB = DAO3.EditAllocationDetails(req.body, function (result, metadata, code, errorMsg) {
            // console.log("INSERTED", data)
            console.log("code TYPE UPDATE.....", code)
            console.log("message TYPE UPDATE....", errorMsg)
            if (code == 0) {
                var new_doa = req.body.doa
                var new_release_date = req.body.planned_release_date
                var new_percentage_allocation = req.body.percentage_allocation
                console.log("################ CAMUNDA START PROCESS #############")
                startProcessInstance(key, res, requestor, resource, req.body.id, date_submitted, null, null, emp_code, proj_code, type, new_doa, new_release_date, new_percentage_allocation);
            }
            if (code == 1) {
                console.log("Inside Code 1......")
                res.json({ message: errorMsg, code: 1 })
            }
            if (code == 2) {
                console.log("Inside Code 2......")
                res.json({ message: errorMsg, code: 2 })
            }

        })
    }
    else if (type == 'newhire') {
        console.log("################ REQUEST Resource  START PROCESS ################")
        var respDB = DAO4.InsertRequestNewHire(req.body, function (data) {
            console.log("InsertRequestNewHire   DB RESPONSE  :", data)
            console.log("InsertRequestNewHire   DB RESPONSE  :", req.body)
            console.log("InsertRequestNewHire   DB RESPONSE  :", req.query)
            startProcessInstance(key, res, requestor, null, data[0][0].id, date_submitted, null, null, null, proj_code, type, null, null, null);

        })
    }
    //CAMUNDA START NEW PROCESS INSTANCE 
});

// router.get('/getNextTask', function (req, res, next) {
//     console.log("################ Get NEXT TASK ################")
//     console.log(req.query.definitionId, req.query.instanceId)
//     PROCESS_INSTANCES.push({ instanceID: req.query.instanceId, topicName: 'UNDEFINED', taskId: 'UNDEFINED' })
//     getNextTask(req.query.definitionId, req.query.instanceId, function (MYMAP) {
//         console.log("MYMAP------------ ", MYMAP)
//     });
// });

router.get('/fetchAndLock', function (req, res, next) {
    console.log("################ Fetch and Lock ################")
    var topic = req.query.topic
    var id = req.query.id
    // console.log(topic)
    //console.log(req.query.definitionId, req.query.instanceId)
    //PROCESS_INSTANCES.push({instanceID:req.query.instanceId,topicName:'UNDEFINED'})
    fetchAndLockTask(topic, id, res);
});

// router.get('/completeTask', function (req, res, next) {
//     console.log("################ Complete Task ################")
//     console.log(req.query.taskId)
//     //PROCESS_INSTANCES.push({instanceID:req.query.instanceId,topicName:'UNDEFINED'})
//     completeTask(req.query.taskId);
// });
//Get List
router.post('/getResourceList', function (req, res, next) {
    console.log("################ Get List ################")
    var respDB = resourceDAO.SearchResource(
        function (data) {
            res.json(data)
        })
});
// Resource Allocation Request
router.post('/addRequestAllotment', function (req, res, next) {
    console.log("################ add Resource Allocation Request ################")
    //unsubscribeFinal() 
    ResourceAllocation(req, res, next);
});
// Resource Allocation Approval
router.put('/approveAllotment', function (req, res, next) {
    var id = req.query.id
    console.log("################ Resource Allocation Approval ################")
    var respDB = DAO1.UpdateAllocationQuery(req.body, function (result, metadata, code, errorMsg) {

        console.log("code ..on Approve time....", code)
        console.log("message ..on Approve time..", errorMsg)

        if (code == 0) {
            console.log("################ CAMUNDA START PROCESS #############")
            fetchAndLockTask('finalise_allocation_of_resource', id, res);
            //emailService.EmailService(req.body.requestor,"Allocation Request for Project "+req.body.project_name,req.body.employee_name,req.body.status,req.body.remark,"dgupta@nseit.com")
        }

        if (code == 1) {
            console.log("Inside Code 1......")
            res.json({ message: errorMsg, code: 1 })
        }
        if (code == 2) {
            console.log("Inside Code 2......")
            res.json({ message: errorMsg, code: 2 })
        }
    })

});

router.get('/getAllocationMasterBY/:id', function (req, res, next) {
    // console.log("AYAA --------------------------")
    //unsubscribeFinal() 
    db.getAllocationMasterId(req, res, function (result) {
        res.status(200).json(result)
    });

});

router.get('/getAllocation', function (REQ, RES, next) {
console.log("-------- Inside GetAllocation API -------")
    getTaskList(function (taskList) {
        var TASKLIST = []
        taskList.forEach(task => {
            // console.log("TASK -----------------------------", task.processInstanceId)
            // console.log(camundaHost + '/process-instance/' + task.processInstanceId + '/variables')
            axios.get(camundaHost + '/process-instance/' + task.processInstanceId + '/variables', {
                headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },

            }).then((res) => {
                // console.log("Task List   :",res.data)
                var responseData = res.data;
                TASKLIST.push({ instanceID: task.processInstanceId, topicName: task.topicName, taskId: task.id, variables: res.data })

                // console.log('Got TASK  : ', responseData)
                if (TASKLIST.length == taskList.length) {
                    console.log('CompleteD!!!!!!!!!!!!!')
                    RES.status(200).json(TASKLIST)
                } 

            })
                .catch((error) => {
                    console.error(error)

                })
        });
    })

});


router.put('/releaseAllotment', function (req, res, next) {
    var id = req.query.id
    console.log("################ Resource RELEASE REQUEST ################")
    //unsubscribeFinal() 
    var respDB = DAO3.ReleaseRequest(id, req.body.dor, req.body.date_submitted, req.body.feedback, req.body.rating, function (data) {
        // console.log("INSERTED", data)
        console.log("################ CAMUNDA START PROCESS #############")
        startProcessInstance('release_resource_process', res, req.body.requestor, req.body.resource, id, req.body.date_submitted, req.body.dor, req.body.old_date, req.body.employee_code, req.body.project_code, null, null, req.body.dor, null);
    })
});


// Resource Allocation Approval
router.put('/approveRelease', function (req, RES, next) {

    console.log("################ Resource RELEASE Approval ################")
    var id = req.query.id
    console.log(camundaHost + '/process-instance/' + id + '/variables')
    axios.get(camundaHost + '/process-instance/' + id + '/variables', {
        headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },

    }).then((res) => {
        console.log("____________________ REQ __________________", req.body)
        var jsonData = {
            remark: req.body.remark, date_submitted: res.data.date_submitted.value,
            status: req.body.status, id: req.body.id, release_date: req.body.release_date,
            old_release_date: req.body.old_release_date,
            doa: req.body.doa,
            percentage_allocation: req.body.percentage_allocation,
            planned_release_date: req.body.planned_release_date

        }

        console.log("____________________ JSON __________________", jsonData)
        console.log("################ Resource RELEASE Variables ################")
        var respDB = DAO1.UpdateAllocationDataQuery(jsonData, function (result, metadata) {
            fetchAndLockTask('finalise_release_resource', id, RES);
            //emailService.EmailService(req.body.requestor,"Allocation Release from Project "+req.body.project_name,req.body.employee_name,req.body.status,req.body.remark,"dgupta@nseit.com")

        })
    })

});


////////////////////////////////////////////////////// NEW RESOURCE REQUEST ///////////////////////////////////////////////////////////////////////////////////

//Request New Resource
// router.put('/requestNewResource', function (req, res, next) {
//     var id = req.query.id
//     console.log("################ REQUEST Resource ################")
//     var respDB = DAO4.InsertRequestNewHire(req.body, function (result) {
//         console.log("InsertRequestNewHire   DB RESPONSE  :", result)
//         console.log("InsertRequestNewHire   DB RESPONSE  :", result[0][0])
//         console.log("InsertRequestNewHire   DB RESPONSE  :", result[0][0].id)
//         startProcessInstance('new_hire_resource_request_process', res, req.body.requestor, result[0][0].id, id, req.body.date_submitted, null);

//     })
// });


// Resource Allocation Approval
router.put('/approveNewResourceRequest', function (req, res, next) {
    var id = req.query.id
    console.log("################ Resource REQUEST FINALISE ################", req.body)

    var respDB = DAO4.UpdateRequestNewHire(req.body, function (result) {
        console.log("UpdateRequestNewHire  DB RESPONSE  :", result)
        fetchAndLockTask('finalise_request_resource_hire', id, res);

    })

});
module.exports = router;
