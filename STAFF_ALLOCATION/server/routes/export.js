var express = require('express');
var router = express.Router();
const fs = require('fs');

var PdfPrinter = require('pdfmake');
var XLSX = require('xlsx');
var fonts = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
  Symbol: {
    normal: 'Symbol'
  },
  ZapfDingbats: {
    normal: 'ZapfDingbats'
  }
};
var printer = new PdfPrinter(fonts);

router.post('/xlsx', function (req, res, next) {
  return generate_file_EXCEL(req, res, "test");
});
router.post('/pdf', function (req, res, next) {
  console.log("Post PDF CALLED")
  return generate_file_PDF(req, res, "test");
});
router.post('/csv', function (req, res, next) {
  return generate_file_CSV(req, res, "test");
});

function buildTableBody(data, columns) {
  var body = [];
  body.push(columns);
  data.forEach(function(row) {
      var dataRow = [];
      columns.forEach(function(column) {
          dataRow.push(row[column].toString());
      })
      body.push(dataRow);
  });
  return body;
}
function table(data, columns) {
  return {
    style: 'tableExample',
      table: {
          headerRows: 1,
          body: buildTableBody(data, columns)
      }
  };
}

function generate_file_PDF(req, res, file) {
  var userfile = req.query.filename
  var data = req.body.data
  
  // console.log("DATA",req.body)
  var date = new Date();
  var ds = date.getDate() + "-" + date.getMonth() + 1 + "-" + (date.getYear() - 100)
  var filename = file + "-" + ds + ".pdf";
  var keys = [];
  for(var k in data[0]) keys.push(k);
  // console.log("________",filename)
  var dd = {
    content: [
      { text: data.heading, style: 'header' },
      data.headingDetails,
      { text: 'Table1', style: 'subheader' },
      'Details of table 1',
       table(data,keys)
      
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      }
    },
    defaultStyle: {
      alignment: 'justify',
      font: 'Times'
    }
  }
  
  var pdfDoc = printer.createPdfKitDocument(dd);
  writeStream = fs.createWriteStream(filename);
  pdfDoc.pipe(writeStream);
  pdfDoc.end();
  writeStream.on('finish', function () {
    
    res.download(filename, userfile)
  });
}

function generate_file_EXCEL(req, res, file) {
  var userfile = req.query.filename
  var data = removeTime(req.body.data)
  //HEADER CHANGE
  console.log(data)
  var head = data[0]
  var oldData = JSON.stringify(data)  
  console.log("HEADER ",head)

  for (var key in head) {

      head[key] = titleCase(key)
      console.log("HEADER KEY",head[key] ,data[0][key])
  }

  var ol1 = JSON.parse(oldData)
  for(var j=0;j<ol1.length;j++)
  {console.log("laaaa",ol1[j])
    if(ol1[j]['emp_status']=='A')
      {
        ol1[j]['emp_status']='Active'
      }
      else{
        ol1[j]['emp_status']='Inactive'
      }
    if (ol1[j]['sal_alloc']) {
      ol1[j]['sal_alloc'] = ol1[j]['sal_alloc'].toFixed(2)
    }
    if (ol1[j]['alloc_percent']) {
      ol1[j]['alloc_percent'] = ol1[j]['alloc_percent'].toFixed(2)
    }
  }
  console.log("OLD",ol1)
  ol1.splice(0,0,head)

  // console.log("NEW",oldData)
data = ol1
  console.log(data)
  // console.log("DATA",req.body)
  var wb = make_excel_book(data);
  var date = new Date();
  var ds = date.getDate() + "-" + date.getMonth() + 1 + "-" + (date.getYear() - 100)
  var filename = file + "-" + ds + ".xlsx"
  var v = XLSX.writeFile(wb, filename)
  
  res.download(filename, userfile)
}

function generate_file_CSV(req, res, file) {
  var userfile = req.query.filename
  // console.log("DATA",req.body)
  var data = removeTime(req.body.data)
  var book = make_csv_book(data);
  var date = new Date();
  var ds = date.getDate() + "-" + date.getMonth() + 1 + "-" + (date.getYear() - 100)
  var filename = file + "-" + ds + ".csv"
  fs.writeFile(filename, book, function (err) {
    if (err)
      return console.log(err);
  res.download(filename, userfile)
  });
}

function make_excel_book(JSONdata) {
  var wb = XLSX.utils.book_new();
  var ws1 = XLSX.utils.json_to_sheet(JSONdata,{skipHeader:true})
  ws1['!cols']=[]
  for(var key in JSONdata[0]){
    ws1['!cols'].push({wpx:100})
  }
  XLSX.utils.book_append_sheet(wb, ws1, "Cost Sheet");
  return wb;
}

function make_csv_book(JSONdata) {

  var sheet = XLSX.utils.json_to_sheet(JSONdata,{skipHeader:true})
  var book = XLSX.utils.sheet_to_csv(sheet)
  return book
}

function removeTime(data){
  jsonOBJ=JSON.parse(JSON.stringify(data))
  var regex = /(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d\.\d\d\dZ/g
  for(var i=0;i<jsonOBJ.length;i++){
    var obj = JSON.parse(JSON.stringify(jsonOBJ[i]))
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var val = obj[key];
        if(typeof(val)=='string'){
          var matches = val.match(regex)
          if(matches)
          {
            var subs = val.split("-")
            var date = subs[2].split("T")
            val=date[0]+"/"+subs[1]+"/"+subs[0]
            jsonOBJ[i][key]=val
          }
        }
      }
    }
  }
  return jsonOBJ

}

function titleCase(str) {
  str = str.replace(/_/g," ")
  str = str.toLowerCase();
  str = str.split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  var s =  str.join(' ');
  // s = s.replace('A','Active')
  s = s.replace('Proj ','Project ')
  s = s.replace('Emp ','Employee ')
  s = s.replace('Doa','Date of Assignment')
  s = s.replace('Dob','Date Of Birth')
  s = s.replace('Dor','Date Of Release')
  s = s.replace('Doj','Date Of Joining')
  s = s.replace('Bill ','Billing')
  s = s.replace('Loc ','')
  s = s.replace('Dep ','Department')
  s = s.replace('Sal Alloc','Salary Allocation')
  s = s.replace('Alloc ','Allocation ')
  s = s.replace('Percent','Percentage')
  s = s.replace('Del ','Delivery ')
  return s
}
module.exports = router;



/*  Generate File Functions 
  
   PARAMETERS : req  : HTTP Request Body  ( Read Data to be stored on File )
                       Query Parameter : filename (To Be handled on client-side to give a popup to capture filename and location )
                res  : HTTP Response Body ( Serves the file )
                file : Filename           ( File saved as on the server )

                body : [
                          { title: 'NSEIT', id1: 1, id2: 2, id3: 3, id4: 4, id5: 5, id6: 6, id7: 7, id8: 8 },
                          { title: 'Veeral', id1: 21, id2: 22, id3: 23, id4: 24, id5: 25, id6: 26, id7: 27, id8: 28 },
                          { title: 'Deepak', id1: 31, id2: 32, id3: 33, id4: 34, id5: 35, id6: 36, id7: 37, id8: 38 },
                          { title: 'Sagar', id1: 41, id2: 42, id3: 43, id4: 44, id5: 55, id6: 46, id7: 47, id8: 48 }
                        ];
  
   Returns    :    null

                res.download("fileOnServer","FileSavedAsByClient")

   PDF  :  host:port/pdf?filename=fileToBeSavedAs.pdf
   XLSX :  host:port/xlsx?filename=fileToBeSavedAs.pdf
   CSV  :  host:port/csv?filename=fileToBeSavedAs.csv

*****************************************************************
                          CSV 
*****************************************************************

  const replacer = (key, value) => value === null ? '' : value
  const header = Object.keys(JSONdata.items[0])
  let csv = JSONdata.items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  csv.unshift(header.join(','))
  var book = csv.join('\r\n')
*/
