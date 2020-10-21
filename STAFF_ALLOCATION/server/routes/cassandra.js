var express = require('express');
var router = express.Router();
const cassandra = require('cassandra-driver');
const fs = require('fs');
var config = require('../conf/fileConf.json');

// var queryHelper = 'INSERT INTO fileshelper (id,username,files,next) VALUES (?,?,?,?,?)';
// var rquHelper = 'select * from fileshelper where filename=?';
var queryHelper = 'INSERT INTO fileshelpermain (id,membername,filename,version,files,next) VALUES (?,?,?,?,?,?)';
var allFileReq = 'select filename,version,membername from fileshelpermain';
var allFileReqMember = 'select filename,version,membername from fileshelpermain where membername=?';
var allFileVersionReqMember = 'select filename,version,membername from fileshelpermain where membername=? and filename=?';
var rquHelper = 'select * from fileshelpermain where membername=? and filename=? and version=?';
var rquHelperMAXVersion = 'select id,membername,filename,MAX(version),files,next from fileshelpermain where membername=? and filename=?';
//createConnection();
var fileConf = config.files
//videoplayback.mp4
//codpaste-teachingpack.pdf
var client, PlainTextAuthProvider;

//set up connection with cassandra 
function createConnection() {
	PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
	client = new cassandra.Client({
		contactPoints: config.cassandra.ContactPoints,
		authProvider: new PlainTextAuthProvider(config.cassandra.Username, config.cassandra.Password), localDataCenter: config.cassandra.Datacenter, keyspace: config.cassandra.Keyspace
	});
	client.connect(function (err, result) {
		if (err == null) {
			// fileUpload(filename);
			// setTimeout(fileDownload, 10000, filename);
		}
		else {
			console.log("error", err);
		}
	});
}

//Working File Upload Helper 
function fileUpload(req, res, next, version) {
	var membername = req.query.membername
	var file = req.files.file
//	console.log("UPLOAD", file)
	var filename = file.name
	var data = file.data
	var offset = 0;
	var chunkSize = 8000000;
	//var chunkBuffer = Buffer.alloc(chunkSize);
	//var fp = fs.openSync(filename, 'r');
	var bytesRead = 0;
	var megaArray = [];
	var len = data.length;
	var i = 0;
	while (i < len) {

		//console.log("i = " + i, len)
		if (i + chunkSize > len) {
			megaArray.push(data.slice(i));
			i = len
		}
		else {
			var end = i + chunkSize

			//console.log("end = " + end)
			megaArray.push(data.slice(i, end))
			i = end
		}
	}
	// while (bytesRead = fs.readSync(fp, chunkBuffer = Buffer.alloc(chunkSize), 0, chunkSize, offset)) {
	// 	offset += bytesRead;
	// 	console.log(bytesRead, "bytesread");
	// 	if (bytesRead < chunkSize) {
	// 		chunkBuffer = chunkBuffer.subarray(0, bytesRead);
	// 	}
	// 	megaArray.push(chunkBuffer);
	// }
	var error = false;
	var random = Math.floor(Math.random() * Math.floor(999999))
	for (var i = 0; i < megaArray.length; i++) {
		//var tempStr = 'arch' + i;
		//console.log("INSERT " + i)
		var next;
		if (i == megaArray.length - 1)
			next = "END"
		else
			next = random + filename + (i + 1);
		//console.log("_____________________________" + filename)
		var ID = random + membername + filename + version + i;
		var params = [ID, membername, filename, version, megaArray[i], next];
		client.execute(queryHelper, params, { prepare: true }, function (err, result) {
			if (err == null) {
			//	console.log('insertion successful ', result);

			} else {
				//console.log('Insertion Unsuccessful! ', err)
				error = true
			}

		});

		if (error) {
			res.send("ERROR")
		}
		else {
			res.send("Success")
		}
	}
}

//NEW DOWNLOAD FUNCTION 29-01
function fileDownload(req, res, next, version) {
	var query,params
	var membername = req.query.membername;
	var filename = req.query.filename;
	var newArray = [];
	var rows = [];
	if(version==""){
		query = rquHelperMAXVersion
		params = [membername, filename]
	}
	else{
		query = rquHelper
		params = [membername, filename,version]
	}
	//console.log("DOWNLOAD CALL " + req.query.filename + req.query.membername)
	//console.log("Query " + query + " pArams " + params)
	
	// Reducing a large result
	
	client.eachRow(query, params, [],
		function (n, row) {
			rows.push(row)
		},
		function (err) {
			console.log("Error1 ",err)
			rows = sortByLink(rows)//sortByKey(rows, 'id')
			rows = rows.reverse();
			//console.log("\n\n\n\n\n\n")
			///
			//console.log("ROWS LENGTH ",rows.length);
			rows.forEach(function (element, index) {
				//console.log(element.id + "->");
				newArray.push(element.files);
			});
			var stream = fs.createWriteStream("./Download/P2P-" + membername + '-' + filename );
			stream.once('open', function (fd) {
				for (var p = 0; p < newArray.length; p++) {
					stream.write(newArray[p]);
				}
				stream.end();
			});
			stream.on('finish', function () {
				stream.end();

			//	console.log("Write completed.");
				var server = "./Download/P2P-"  + membername + '-' + filename;
				res.download(server, filename)
			});
			//console.log('Completed!')
			//console.log('retrieval successful');
		}
	);

	function sortByLink(rows) {
		var newRow = [];
		for (var i = 0; i < rows.length; i++) {
			if (rows[i].next == "END")
				newRow.push(rows[i])
		}
		for (var i = 0; i < newRow.length; i++) {
			for (var j = 0; j < rows.length; j++) {
				if (newRow[i].id == rows[j].next) {
					//console.log(rows[j].id + "<=row    new Row-> " + newRow[i].id)
					if (newRow.indexOf(rows[j]) == -1)
						newRow.push(rows[j])
					
					//	console.log("Already")
				}
			}
		}
		return newRow;
	}
}

router.post('/upload', function (req, res, next) {
	PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
	client = new cassandra.Client({
		contactPoints: config.cassandra.ContactPoints,
		authProvider: new PlainTextAuthProvider(config.cassandra.Username, config.cassandra.Password), localDataCenter: config.cassandra.Datacenter, keyspace: config.cassandra.Keyspace
	});
	client.connect(function (err, result) {
		if (err == null) {
			var listOfVersion = []
			var membername = req.query.membername
			var filename = req.files.file.name
			var params = [membername, filename];
			client.eachRow(allFileVersionReqMember, params, [],
				function (n, row) {
					listOfVersion.push(row)
				},
				function (err) {
					//console.log("List Generated")
					if (listOfVersion.length == 0) {

						fileUpload(req, res, next, '1');
					}
					else {
						var max = -1;
						for (var k = 0; k < listOfVersion.length; k++) {
							if (max < listOfVersion[k].version) {
								max = listOfVersion[k].version
							}
						}
						//console.log("MAX -----------------", max)

						fileUpload(req, res, next, (Number(max) + 1) + '');
					}
				});
			// setTimeout(fileDownload, 10000, filename);
		}
		else {
			console.log("error", err);
		}
	});
});

router.get('/download', function (req, res, next) {
	if (!req.query.membername) {
		res.send("membername  NOT provided")
	}
	else if (!req.query.filename) {
		res.send("Filename  NOT provided")
	}
	else {
		var version = req.query.version;
		//console.log("DOWNLOAD CALL " + req.query.filename)
		PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
		client = new cassandra.Client({
			contactPoints: config.cassandra.ContactPoints,
			authProvider: new PlainTextAuthProvider(config.cassandra.Username, config.cassandra.Password), localDataCenter: config.cassandra.Datacenter, keyspace: config.cassandra.Keyspace
		});
		client.connect(function (err, result) {
			if (err == null) {

				if (!req.query.version) {
					fileDownload(req, res, next, "");
				}
				else{
				fileDownload(req, res, next, version);
				}
			}
			else {
				console.log("error", err);
			}
		});
	}
});

router.get('/listAll', function (req, res, next) {
	var listOfFiles = [];
	var params = [];
	var query;
	if (req.query.membername) {
		params = [req.query.membername];
		query = allFileReqMember;
	}
	else {
		params = []
		query = allFileReq;
	}

	//console.log("List CALL " + req.query.membername)

	PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
	client = new cassandra.Client({
		contactPoints: config.cassandra.ContactPoints,
		authProvider: new PlainTextAuthProvider(config.cassandra.Username, config.cassandra.Password), localDataCenter: config.cassandra.Datacenter, keyspace: config.cassandra.Keyspace
	});
	client.connect(function (err, result) {
		if (err == null) {
			client.eachRow(query, params, [],
				function (n, row) {
					listOfFiles.push(row)
				},
				function (err) {
					//console.log("List Generated")
					res.send({ data: listOfFiles })
				});
		}
		else {
			console.log("error", err);
		}
	});

	

});


router.get('/listVersions', function (req, res, next) {
	var listOfFiles = [];
	if (!req.query.membername) {
		res.send("membername  NOT provided")
	}
	else if (!req.query.filename) {
		res.send("Filename  NOT provided")
	}
	else {

		//console.log("List CALL ")
		var membername = req.query.membername;
		var filename = req.query.filename;
		listVersions(membername, filename, res)

	//	console.log("_________________________________")

	}
});

function listVersions(membername, filename, res) {

	var listOfVersion = []
	var params = [membername, filename]
	PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
	client = new cassandra.Client({
		contactPoints: config.cassandra.ContactPoints,
		authProvider: new PlainTextAuthProvider(config.cassandra.Username, config.cassandra.Password), localDataCenter: config.cassandra.Datacenter, keyspace: config.cassandra.Keyspace
	});
	client.connect(function (err, result) {
		if (err == null) {
			client.eachRow(allFileVersionReqMember, params, [],
				function (n, row) {
					listOfVersion.push(row)
				},
				function (err) {
				//	console.log(listOfVersion)
					res.send({ data: listOfVersion })
				});
		}
		else {
			//console.log("error", err);
		}
	});

}

module.exports = router;