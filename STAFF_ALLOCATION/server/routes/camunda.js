var express = require('express');
var router = express.Router();
//const {Client,logger,Variables, File} = require("camunda-external-task-client-js");
const axios = require('axios')
var FormData = require('form-data');
var FTPClient = require('ftp');
var fs = require('fs')
const camundaHost = 'http://localhost:8080/engine-rest'

function deployWorkflow(request, response, next) {
    console.log("FILE " + JSON.stringify(file))
    data = request.body
    var formData = new FormData()//request.body;

    //console.log(request.body)
    formData.append('deployment-name', data.deploymentname)
    if (data.deploychangedonly != "" && data.deploychangedonly != undefined && data.deploychangedonly != null)
        formData.append('deploy-changed-only', data.deploychangedonly)

    if (data.deploymentsource != "" && data.deploymentsource != undefined && data.deploymentsource != null)
        formData.append('deployment-source', data.deploymentsource)
    //npm install request
    if (data.ftpFile) {
        //console.log("FILEs --------------- "+request.files)
        var ftpC = new FTPClient();
        ftpC.connect({
            host: '172.25.8.59',
            port: 21,
            user: 'sringe',
            password: 'abcd@1234'
        });
        ftpC.on('ready', function () {
            ftpC.get(data.ftpFile, function (err, stream) {
                if (err) throw err;
                stream.once('close', function () {
                    ftpC.end();
                    formData.append('data', fs.createReadStream(data.ftpFile))
                    //console.log("------------Stream -----"+stream)
                    axios.post(camundaHost + '/deployment/create', formData, { headers: formData.getHeaders() }
                    )
                        .then((res) => {
                            console.log(`statusCode: ${res.status}`)
                            console.log(res.data)
                            response.send(res.data)
                        })
                        .catch((error) => {
                            console.log()
                            console.error(error)
                        })
                
                });
                console.log("--------------- 1--------------")
                stream.pipe(fs.createWriteStream(data.ftpFile));
            });
        });
    }
    else {
        var file = request.files.data
        formData.append('data', file.data, {
            filename: file.name,
            contentType: file.mimetype
        })
        console.log("FORM DATA " + formData)
        axios.post(camundaHost + '/deployment/create', formData, { headers: formData.getHeaders() }
        )
            .then((res) => {
                console.log(`statusCode: ${res.status}`)
                console.log(res.data)
                response.send(res.data)
            })
            .catch((error) => {
                console.log()
                console.error(error)
            })
    
    }
  
}

router.post('/deploy', function (req, res, next) {
    console.log("Deploy Workflow");
    deployWorkflow(req, res, next);
});

module.exports = router;