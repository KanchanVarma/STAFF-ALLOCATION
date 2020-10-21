var express = require('express');
var router = express.Router();

let Client = require('ssh2-sftp-client');
var FTPClient = require('ftp');
var fs = require('fs')

var ftpList = []

var sftpList = []
/* GET home page. */
router.get('/ftpList', function (req, res, next) {
  //Connect to FTP
  // console.log("FTP GET !!!! ")
  var ftpC = new FTPClient();
  ftpC.connect({
    host: '172.25.8.59',
    port: 21,
    user: 'sringe',
    password: 'abcd@1234'
  });
  ftpC.on('ready', function () {
    ftpC.list(function (err, list) {
      if (err) throw err;
      // console.dir(list);
      ftpList = list
      ftpC.end();
      var response = {
        'code': 0,
        'message': 'FTP LIST',
        'data': ftpList
      }
      res.send(response);
    });
  });
});

router.get('/sftpList', function (req, res, next) {
  //Connect to FTP
  // console.log("SFTP GET !!!! ")
  let sftp = new Client();
  sftp.connect({
    host: '172.25.8.59',
    port: '22',
    username: 'tester',
    password: 'password'
  }).then(() => {
    return sftp.list("/")
  }).then((data) => {
    // console.log("SFTP --------------\n" + JSON.stringify(data))
    sftpList = data;

    var response = {
      'code': 0,
      'message': 'SFTP LIST',
      'data': sftpList
    }
    res.send(response);
  }).catch((err) => {
    console.log(err, 'catch error');
  });

});
// FTP Upload
router.post('/uploadFTP', function (req, res, next) {
  console.log("FTP UPLOAD", req.files)
  var file = req.files.file
  var filename = file.name
  // console.log(typeof (file))
  var ftpC = new FTPClient();
  ftpC.on('ready', function () {
    ftpC.put(file.data, filename, function (err) {
      if (err) {
        var response = {
          'code': 1,
          'message': 'error',
          'data': 'File Upload Failed'
        }
        res.send(response)
        throw err;
      }
      else {
        var response = {
          'code': 0,
          'message': 'success',
          'data': 'File Uploaded'
        }
        res.send(response)
      }
      ftpC.end();
    });
  });
  //Connect to FTP
  ftpC.connect({
    host: '172.25.8.59',
    port: 21,
    user: 'sringe',
    password: 'abcd@1234'
  });
});

router.get('/downloadFTP', function (req, res, next) {
  var filename = req.query.filename;
  //Connect to FTP
  var ftpC = new FTPClient();
  ftpC.connect({
    host: '172.25.8.59',
    port: 21,
    user: 'sringe',
    password: 'abcd@1234'
  });
  ftpC.on('ready', function () {
    ftpC.get(filename, function (err, stream) {
      if (err) throw err;
      stream.once('close', function () {

        ftpC.end();
        var server = "test" + filename;
        res.download(server, filename)
      });
      stream.pipe(fs.createWriteStream("test" + filename));
    });
  });


});

//
//  SFTP
//
//

router.get('/downloadSFTP', function (req, res, next) {
  var filename = req.query.filename;
  let sftp = new Client();
  sftp.connect({
    host: '172.25.8.59',
    port: '22',
    username: 'tester',
    password: 'password'
  }).then(() => {
    return sftp.fastGet(filename, "test" + filename);
  }).then((data) => {
    console.log(data)
    var server = "test" + filename;
    res.download(server, filename)
  }).catch((err) => {
    console.log(err, 'catch error');
  });
});

router.post('/uploadSFTP', function (req, res, next) {
  var file = req.files.file
  var filename = file.name
  let sftp = new Client();
  sftp.connect({
    host: '172.25.8.59',
    port: '22',
    username: 'tester',
    password: 'password'
  }).then(() => {
    return sftp.put(file.data, filename)
  }).then((data) => {
    var response = {
      'code': 0,
      'message': 'success',
      'data': 'File Uploaded'
    }
    res.send(response)

  }).catch((err) => {

    if (err) {
      var response = {
        'code': 1,
        'message': 'error',
        'data': 'File Upload Failed'
      }
      res.send(response)
      throw err;
    }
  });


});


module.exports = router;
