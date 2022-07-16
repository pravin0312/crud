const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const mssql = require('mssql');

const app = express();

app.use(cors());
app.use(bodyParser.json());




// database connection

const db = ({
    user: "Interadmin",
    password: "IN^$#@~!()",
    server: "192.168.30.95",
    database: "DB_INTERNSHIP",
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true,

    }
});

mssql.connect(db, err => {
    if (err) { console.log(err, 'err'); }

    console.log('database connected...');
})

// ge all data


app.get('/user', (req, res) => {

    let qr = 'select * from praveen';

    mssql.query(qr, (err, result) => {
        console.log(result)
        if (err) {
            console.log(err, 'errs');
        }

        else (result.recordset.length > 0);
        {
            res.json({
                message: 'all user data',
                data: result.recordset
            });
        }
    });
});


app.get('/user/:id', (req, res) => {

    // console.log(req.params.id,'getid==>')

    let gID = req.params.id;

    let qr = `select * from praveen where id = ${gID}`;

    mssql.query(qr, (err, result) => {

        if (err) { console.log(err); }

        else if (result.recordset.length > 0) {
            res.json({
                message: 'get single data',
                data: result.recordset
            });
        }
        else {
            res.json({
                message: 'data not found',
            });
        }
    });
});


//create data

app.post('/user', (req, res) => {
    console.log(req.body, 'createdata')

    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;

    let qr = `insert into praveen(name,password,email) 
          values('${name}','${password}','${email}')`;

    mssql.query(qr, (err, result) => {


        if (err) { console.log(err); }
            console.log(result,'result')
            res.json({
                message: 'data inserted',
            });
        
    });


});


//update data

app.put('/user/:id',(req,res)=>{

    console.log(req.body,'updatedata');
    
    let gID = req.params.id;
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;

    let qr = `update praveen set name= '${name}',password='${password}',email='${email}'
    where id = '${gID}'`;

    mssql.query(qr,(err,result)=>{

        if(err) {console.log(err);
        }else{
            res.json({
                message:'data updated'
            })
        }

        
    })
})

//delete data 

app.delete('/user/:id',(req,res)=>{
    console.log(req.body,'deletedata');

    let sID = req.params.id

    let qr = `delete from praveen where id='${sID}'`

    mssql.query(qr,(err,result)=>{

        if(err) {console.log(err);
        }else{
            res.json({
                message:'data deleted'
            });
        }
    });

});


app.listen(3000, () => {
    console.log('server running..')
})