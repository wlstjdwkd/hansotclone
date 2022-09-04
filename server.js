const express = require('express');
const path=require('path');
const app = express();
const http = require('http').createServer(app);
// const home = require("./src/App");

const oracledb = require('oracledb');
const dbConfig=require("./dbconfig");
const {password} = require("./dbconfig");
oracledb.initOracleClient({ libDir: 'C:\\workspace\\instantclient_21_6' });
oracledb.autoCommit=true;

//회원가입

var conn;

//DB Select
async function selectDatabase(){
    let connection = await oracledb.getConnection(dbConfig);
    let binds = {};
    let options= {
        outFormat: oracledb.OUT_FORMAT_OBJECT
    }

    let result = await connection.execute("select * from member", binds, options);
    console.log(result.rows);
    for(var i=0; i<result.rows; i++){
        console.log(result.rows[i]);
    }
    await connection.close();
}

oracledb.getConnection(dbConfig,function(err,con){
    if(err){
        console.log("접속이 실패했습니다.",err);
    }
    conn=con;
});
// let binds = {};
// let options= {
//     outFormat: oracledb.OUT_FORMAT_OBJECT
// }

app.use( '/', express.static( path.join(__dirname, 'build') ) );

app.get('/', function(request, response){
    response.sendFile( path.join(__dirname, 'build/index.html') )
});

//회원가입
app.post("/users/register",(req, res)=>{
    var web_id=req.body.web_id;
    var pwd=req.body.password;
    var email=req.body.email;
    var phone=req.body.phone_number;

    conn.execute("insert into Member(member_id,web_id,password,email,phone_number) values (member_seq.nextval,  "+web_id+","+password+","+email+","+phone+")",function(err,result){
        if(err){
            console.log("등록중 에러가 발생했어요!!", err);
            res.writeHead(500, {"ContentType":"text/html"});
            res.end("fail!!");
        }else{
            console.log("result : ",result);
            res.writeHead(200, {"ContentType":"text/html"});
            res.end("success!!");
        }
    });
});

//로그인
app.post("/users/login",(req,res)=>{

})

app.listen(3000,function (){
    console.log('listening on 3000');
})