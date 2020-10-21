var express = require('express');
var router = express.Router();
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs')
const camundaHost = 'http://localhost:8080/engine-rest'
processStarted = false;
PROCESS_DEFINITION_ID = null;
PROCESS_VARIABLES = [];



function startProcessInstance(mkey) {
    if (PROCESS_DEFINITION_ID != null) {
        axios.post(camundaHost + '/process-definition/' + PROCESS_DEFINITION_ID + '/start', {
            todo: 'Start Camunda Process'
        }, {
                headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },
            })
            .then((res) => {
                console.log("PROCESS INSTANCE ID :" + res.data.id);
                PROCESS_VARIABLES.push({ instanceID: res.data.id, topicName: 'UNDEFINED', taskId: 'UNDEFINED' })
                getNextTask(PROCESS_DEFINITION_ID, res.data.id, function (MYMAP,index) {
                    console.log("MYMAP------------ ", MYMAP,index)
                });
            })
            .catch((error) => {
                console.error(error)
            })
    }
    else {
        startProcess(mkey)
    }
}



function startProcess(PROCESS_KEY) {
    console.log("KEY " + PROCESS_KEY);
    axios.post(camundaHost + '/process-definition/key/' + PROCESS_KEY + '/start', {
        todo: 'Start Camunda Process'
    }, {
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },
        })
        .then((res) => {
            //console.log(res)

            console.log("PROCESS INSTANCE ID :" + res.data.id);
            PROCESS_VARIABLES.push({ instanceID: res.data.id, topicName: 'UNDEFINED', taskId: 'UNDEFINED' })
            PROCESS_DEFINITION_ID = res.data.definitionId
            console.log("PROCESS DEFINATION ID :" + PROCESS_DEFINITION_ID);
            this.processStarted = true;

            getNextTask(PROCESS_DEFINITION_ID, res.data.id, function (MYMAP,index) {
                console.log("MYMAP------------ ", MYMAP,index)
            });
        })
        .catch((error) => {
            console.error(error)
        })
}


function getNextTask(ProcessDefinitionID, ProcessInstanceID, callback) {
    axios.post(camundaHost + '/external-task', {
        todo: 'Start Camunda Process'
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
                        var filteredIndex = PROCESS_VARIABLES.findIndex(function (item, i) {
                            return item.instanceID === ProcessInstanceID
                        });
                        console.log("PROCESS_VARIABLES",PROCESS_VARIABLES)
                        console.log("filteredIndex",filteredIndex)
                        PROCESS_VARIABLES[filteredIndex].topicName = TOPIC_NAME
                        PROCESS_VARIABLES[filteredIndex].taskId = TASK_ID
                        console.log("PROCESS_VARIABLES",PROCESS_VARIABLES)
                        callback(PROCESS_VARIABLES,filteredIndex)
                    }
                }
            }

        })
        .catch((error) => {
            console.error(error)
        })
}



function fetchAndLockTask(topicName) {
    axios.post(camundaHost + '/external-task/fetchAndLock', {
        workerId: "aWorkerId",
        maxTasks: 1,
        topics:
            [{
                topicName: topicName,
                lockDuration: 100000
            }]

    }, {
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },

        })
        .then((res) => {
            // console.log("Task List   :",res.data)
            var responseData = res.data;
            console.log('Fetch and Lock Response  : ', responseData)
        })
        .catch((error) => {
            console.error(error)
        })
}



function completeTask(taskId) {
    axios.post(camundaHost + '/external-task/' + taskId + '/complete', {
        "workerId": "aWorkerId",
        "variables":
        {
            "resourceAllocated": { "value": true }
        }
    }, {
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },

        })
        .then((res) => {
            // console.log("Task List   :",res.data)
            var responseData = res.data;
            console.log('Complete Task Response  : ', responseData)
        })
        .catch((error) => {
            console.error(error)
        })
}





router.get('/', function (req, res, next) {
    console.log("Start Workflow");
    res.send("Starting Workflow")

});

// router.post('/startProcess', function (req, res, next) {
//     console.log("Start Workflow");
//     var mkey="finance_department";
//     startProcess(mkey);
// });

// router.post('/startProcessInstance', function (req, res, next) {
//     console.log("Start Workflow");
//     var mkey="finance_department";
//     startProcessInstance(mkey);
// });

// router.post('/getNextTask', function (req, res, next) {
//     console.log("Start Workflow startProcessInstance");
//     var mkey="";
//     getNextTask(ProcessDefinitionID, ProcessInstanceID, callback);
// });

// router.post('/fetchAndLockTask', function (req, res, next) {
//     console.log("################ Fetch and Lock ################")
//     fetchAndLockTask("get_new_project_data")
// });


// router.post('/completeTask', function (req, res, next) {
//     console.log("Start Workflow startProcessInstance");
//     var taskID="7162936b-36a5-11e9-b2c1-00155d083808";
//     completeTask(taskID);
// });








module.exports = {
    router,
    completeTask,
    fetchAndLockTask,
    getNextTask,
    startProcess,
    startProcessInstance,
    PROCESS_VARIABLES,
}
