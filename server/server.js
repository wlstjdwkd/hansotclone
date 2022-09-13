const express = require('express');
const path=require('path');
const cors = require("cors");
const app = express();
const http = require('http').createServer(app);
const session = require("express-session");
const memorystore=require("memorystore");
const MemoryStore= memorystore(session);
const bodyParser = require("body-parser");
const multer = require("multer");
const form_data = multer();
const cookieParser=require("cookie-parser");
const httpProxy = require('http-proxy');
const proxy = httpProxy.createServer({});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(form_data.array());
app.use(express.json());
app.use(cookieParser());


const maxAge = 1000 * 60 * 5; //Specifies the number (in milliseconds)

const sessionObj = {
    secret: "se",
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({ checkPeriod: maxAge }),
    cookie: {
        maxAge: maxAge,
    },
};
const mySession = session(sessionObj);
app.use(mySession);


const oracledb = require('oracledb');
const dbConfig=require("./db/dbconfig");
const {password} = require("./db/dbconfig");
const bcrypt = require("bcrypt");
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
    else{
        console.log("db접속 성공");
    }
    conn=con;
});

app.use('/', express.static( path.join(__dirname, 'build') ) );

app.get('/', function(req, res){
    res.sendFile( path.join(__dirname, '../public/index.html') );
    proxy.web(req,res, {target:'http://localhost:3000/'});

    console.log("메인페이지");
});

//회원가입
app.post("/signup",async (req, res) => {
    res.setHeader('Access-Control-Allow-origin', '*');
    const salt = await bcrypt.genSalt(10);

    console.log("회원가입 서버 받음");
    var web_id = req.body.web_id;
    var pwd = await bcrypt.hash(req.body.password, salt);
    var email = req.body.email;
    var phone = req.body.phone_number;

    conn.execute("insert into Member(member_id,web_id,password,email,phone_number) values (member_seq.nextval, '" + web_id + "','" + pwd + "','" + email + "','" + phone + "')", function (err, result) {
        if (err) {
            console.log("등록중 에러가 발생했어요!!", err);
            res.status(401).send({message: "회원가입 실패"});

            res.writeHead(500, {"ContentType": "text/html"});
            res.end("fail!!");
        } else {
            console.log("result : ", result);
            res.status(200).send({message: "회원가입 성공"});

            //res.writeHead(200, {"ContentType": "text/html"});
            res.end("success!!");
        }
    });
});


//로그인
async function isLoggedIn(req, res, next){
    if(req.session.isLoggedIn && req.session.user){
        next();
    } else{
        res.status(400).send({ error: "Did not login"});
    }
}

app.get("/login", (req, res)=>{
    res.setHeader('Access-Control-Allow-origin','*');
    console.log("getLogin ses.user:" ,req.session.user);
    console.log("getLogin  ses.isLogIn?: ",req.session.isLoggedIn);
    if(req.session.user){
        res.send({isLoggedIn:true, user:req.session.user});
    } else{
        res.send({isLoggedIn:false});
    }
});

app.post("/login", async (req, res) => {
    res.setHeader('Access-Control-Allow-origin', '*');

    console.log("로그인 백 받음");
    var web_id = req.body.web_id;
    var password = req.body.password;
    console.log("MemberInfo Client Login: ", web_id, password);

    const getPWQuery = "SELECT * FROM Member WHERE web_id = :1";
    const Member = await queryResult(getPWQuery, web_id);

    //
    function queryResult(query, web_id) {
        return new Promise((resolve, reject) => {
            conn.execute(
                query,
                [web_id],
                {outFormat: oracledb.OUT_FORMAT_OBJECT},
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        //성공
                        resolve(...result.rows);
                    }
                }
            );
        });
    }
    if (Member) {
        console.log("USER exists 😁");
        const comparePW = await bcrypt.compare(password,Member.PASSWORD);
        console.log(Member.PASSWORD, password, comparePW);

        if (comparePW) {
            //----------------------session ---------------------------
            //로그인 성공
            console.log("USER can Login 😍");
            console.log("USER: ", Member);
            console.log("session::    ", req.session);
            const sessionUser = {
                web_id: Member.web_id,
                email: Member.EMAIL,
                company: Member.COMPANY,
            };
            req.session.user = sessionUser;
            req.session.isLoggedIn = true;
            console.log("member_id:    ", Member.MEMBER_ID);

            res.status(200).send({message: "로그인 성공",
                id:Member.MEMBER_ID,
            });

            //----------------------session ---------------------------
        } else {
            console.log("USER password not correct 🤬");
            res.status(401).send({ message: "USER password not correct 🤬" });
        }
    } else {
        console.log("USER not exists 🥵");
        res.status(401).send({ message: "USER not exists 🥵" });
    }
})

//메뉴 조회
app.get("/menu_list" , (req,res)=>{
//    select * from menu;
    console.log("메뉴 조회 백 받음");
    conn.execute("select * from menu", function (err, result) {
        if (err) {
            console.log("메뉴 조회중 에러가 발생했어요!!", err);
            res.status(401).send({message: "메뉴 조회 실패"});
            res.writeHead(500, {"ContentType": "text/html"});
            res.end("fail!!");
        } else {
            //메뉴 조회 성공
            console.log("result : ", result);
            res.send(result);
        }
    });
})

//메뉴 상세 조회
app.get("/menu_view", (req,res)=>{
    console.log("메뉴 상세 조회 백 받음");
    conn.execute("select * from option1", function (err,result){
        if (err) {
            console.log("메뉴 상세 조회중 에러가 발생했어요!!", err);
            res.status(401).send({message: "메뉴 상세 조회 실패"});
            res.writeHead(500, {"ContentType": "text/html"});
            res.end("fail!!");
        } else {
            //메뉴 상세 조회 성공
            console.log("result : ", result);

            res.send(result);
        }
    })
})

//주문
app.post("/order", (req,res)=>{
    console.log("주문 백 받음");
    var member_id=req.body.member_id;
    var menu_id=req.body.menu_id;
    var option=req.body.option_id;

    console.log("order number", member_id,menu_id);

    conn.execute("insert into order1(order1_id, order_date, member_id, menu_id) values (order1_seq.nextval, to_char(sysdate,'yyyy.mm.dd hh24:mi'), '" + member_id + "','" + menu_id + "')", function (err, result) {

        if (err) {
            console.log("등록중 에러가 발생했어요!!", err);
            res.status(401).send({message: "주문 실패"});

            res.end("fail!!");
        } else {
            //주문 성공
            console.log("주문 성공");
            console.log("option : ", option);

            for(let i=0; i<option.length; i++){
                conn.execute("insert into order1_option1 values (order1_option1_seq.nextval, order1_seq.currval,'" + option[i] + "')", function (err,result){
                    if (err) {
                    } else {
                        //메뉴 상세 조회 성공
                        console.log("result : ", result);

                    }
                })
            }


            res.status(200).send({message: "주문 성공"});
            res.end("success!!");        }
    });
});

//마이페이지
app.post("/myPage",(req,res)=>{
    var memberID= req.body.member_id;

    console.log("마이페이지 백 받음");
    console.log("멤버아이디: "+req.body.member_id);
    conn.execute("select o.order_date, m.name, m.price, o.order1_id, p.option_name, p.price from menu m join order1 o on m.menu_id= o.menu_id left outer join order1_option1 r on o.order1_id=r.order1_id left outer join option1 p on p.option1_id=r.option1_id where member_id = :1 order by o.order_date asc",[memberID] ,function (err,result){
        if (err) {
            console.log("마이페이지 조회 중 에러가 발생했어요!!", err);
            res.status(401).send({message: "메뉴 조회 실패"});
            res.end("fail!!");
        } else {
            //마이페이지 조회 성공

            console.log("result : ", result);
            res.send(result);
        }
    });
})

app.listen(5000,function (){
    console.log('listening on 5000');
})