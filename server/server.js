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
// let binds = {};
// let options= {
//     outFormat: oracledb.OUT_FORMAT_OBJECT
// }

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

            // res.cookie("web_id",Member.member_id);

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
            //res.status(200).send({message: "메뉴조회 성공"});

            // res.writeHead(200, {"ContentType": "text/html"});

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
            //res.status(200).send({message: "메뉴조회 성공"});

            // res.writeHead(200, {"ContentType": "text/html"});

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
                        //res.status(200).send({message: "메뉴조회 성공"});

                        // res.writeHead(200, {"ContentType": "text/html"});

                    }
                })
            }

            // res.writeHead(200, {"ContentType": "text/html"});

            res.status(200).send({message: "주문 성공"});
            //res.writeHead(200, {"ContentType": "text/html"});
            res.end("success!!");        }
    });
});

//마이페이지
app.post("/myPage",(req,res)=>{
    var memberID= req.body.member_id;

    console.log("마이페이지 백 받음");
    console.log("멤버아이디: "+req.body.member_id);
    conn.execute("select o.order_date, m.name, m.price from menu m join order1 o on m.menu_id= o.menu_id where member_id = :1",[memberID] ,function (err,result){
        if (err) {
            console.log("마이페이지 조회 중 에러가 발생했어요!!", err);
            res.status(401).send({message: "메뉴 조회 실패"});
            // res.writeHead(500, {"ContentType": "text/html"});
            res.end("fail!!");
        } else {
            //마이페이지 조회 성공

            console.log("result : ", result);
            //res.status(200).send({message: "메뉴조회 성공"});

            // res.writeHead(200, {"ContentType": "text/html"});

            res.send(result);
        }
    });
})

app.listen(5000,function (){
    console.log('listening on 5000');
})

// const express = require("express");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const PORT = 5000;
// require("dotenv").config({ path: "../env/.env" });
//
// const { body, validationResult } = require("express-validator");
//
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const MongoStore = require("connect-mongo"); //just to store Session Info
//
// const oracle = require("oracledb");
// const dbConfig = {
//     user            :   "system",
//     password        :   "1234",
//     connectString   :  "localhost",
//     externalAuth    :   false
// };
// let db;
// oracle.getConnection(dbConfig, (error, connection) => {
//     if (error) {
//         console.log("OracleDB Connection Error 💥: ", error.message);
//         return;
//     }
//     console.log("OracleDB 🚀");
//     db = connection;
// });
//
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// //app.use(bodyParser.urlencoded({ extended: true })); //4.16version express⬆ has bodyParser
// app.use(cookieParser());
// app.use(
//     cors({
//         origin: ["http://localhost:3001"],
//         methods: ["POST", "PUT", "GET"],
//         credentials: true,
//     })
// );
//
// app.use(
//     session({
//         store: MongoStore.create({
//             mongoUrl: process.env.MONGO_URL,
//             ttl: 1 * 24 * 60 * 60, //this is One day
//         }),
//         secret: process.env.MONGO_SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             expires: 60 * 60 * 1000, //one hour
//         },
//         //5000 === 5sec
//     })
// );
//
// //----------------------------validation ----------------------------
// const schema = [
//     body("userName").isLength({ min: 6, max: 10 }).withMessage("username: 6~10"),
//     body("email").isEmail().withMessage("!valid email "),
//     body("password").isLength({ min: 6, max: 10 }).withMessage("pw: 6~10"),
// ];
// //validation function as middle ware
// function registerVali(req, res, next) {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         const errObj = errors.mapped(); //=> making it to be object {userName:''}
//         console.log(errObj);
//         return res.status(400).send({
//             nameErr: errObj.userName,
//             emailErr: errObj.email,
//             pwErr: errObj.password,
//         });
//     }
//     next();
// }
// //----------------------------validation ----------------------------
//
// //----------------------------login middle ware-----------------------
// async function isLoggedIn(req, res, next) {
//     if (req.session.isLoggedIn && req.session.user) {
//         next();
//     } else {
//         res.status(400).send({ error: "Did not login 🚫" });
//     }
// }
//
// //------------------------Routers-------------------------------
//
// app.get("/", (req, res) => {
//     res.send("Hello World ");
// });
// app.post("/logout", (req, res) => {
//     req.session.destroy();
//     res.send({ message: "logout Successful" });
// });
// //if Admin, give all the users
// app.get("/users", isLoggedIn, async (req, res) => {
//     console.log("getAllusers ses: ", req.session.user.userName);
//     const loggedInUser = req.session.user.userName;
//     // const user
//     // const selectUsersQuery = "SELECT * FROM SCM_USER WHERE USERNAME != :1";
//     const selectUsersQuery =
//         "SELECT USERNAME, EMAIL,COMPANY FROM SCM_USER WHERE USERNAME != :1 ";
//     const allUsers = await queryResult(selectUsersQuery);
//     function queryResult(query) {
//         return new Promise((resolve, reject) => {
//             db.execute(
//                 query,
//                 [loggedInUser],
//                 { outFormat: oracle.OUT_FORMAT_OBJECT },
//                 (err, result) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(result.rows);
//                     }
//                 }
//             );
//         });
//     }
//     if (allUsers) {
//         res.status(200).send(allUsers);
//     } else {
//         res.status(500).send({ message: "Something wrong with db" });
//     }
// });
// //create User
// app.post("/user", schema, registerVali, async (req, res) => {
//     const salt = await bcrypt.genSalt(10);
//     const userName = req.body.userName;
//     const email = req.body.email;
//     const company = req.body.company;
//     const password = await bcrypt.hash(req.body.password, salt);
//
//     console.log("UserInfo Client Reg: ", userName, email, company, password);
//     const insertUserQuery =
//         "INSERT INTO SCM_USER(USERNAME, EMAIL,COMPANY,PASSWORD) VALUES (:1, :2, :3, :4)";
//     await db.execute(
//         insertUserQuery,
//         [userName, email, company, password],
//         (err, result) => {
//             if (err) {
//                 res.status(500).send({ message: `Cannot Insert User: ${userName}❌` });
//             }
//             console.log(`Inserted User  ${userName} succeed! 👌`);
//             db.commit();
//             res
//                 .status(201)
//                 .send({ message: `Inserted User  ${userName} succeed! 👌` });
//         }
//     );
// });
//
// app.get("/login", (req, res) => {
//     console.log("getLogin ses.user:  ", req.session.user);
//     console.log("getLogin ses.isLogIn?:  ", req.session.isLoggedIn);
//     if (req.session.user) {
//         res.send({ isLoggedIn: true, user: req.session.user });
//     } else {
//         res.send({ isLoggedIn: false });
//     }
// });
//
// //login User.
// app.post("/login", async (req, res) => {
//     const userName = req.body.userName;
//     const password = req.body.password;
//     console.log("UserInfo Client Login: ", userName, password);
//     const getPWQuery = "SELECT * FROM SCM_USER WHERE USERNAME = :1";
//     const User = await queryResult(getPWQuery, userName);
//
//     function queryResult(query, userName) {
//         return new Promise((resolve, reject) => {
//             db.execute(
//                 query,
//                 [userName],
//                 { outFormat: oracle.OUT_FORMAT_OBJECT },
//                 (err, result) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(...result.rows);
//                     }
//                 }
//             );
//         });
//     }
//     if (User) {
//         console.log("USER exists 😁");
//         const comparePW = await bcrypt.compare(password, User.PASSWORD);
//
//         if (comparePW) {
//             //----------------------session ---------------------------
//             console.log("USER can Login 😍");
//             console.log("USER: ", User);
//             console.log("session::    ", req.session);
//             const sessionUser = {
//                 userName: User.USERNAME,
//                 email: User.EMAIL,
//                 company: User.COMPANY,
//             };
//             req.session.user = sessionUser;
//             req.session.isLoggedIn = true;
//             console.log("session:User:    ", req.session.user);
//             console.log("session:User:    ", req.session.isLoggedIn);
//             res.status(200).send(User);
//             //----------------------session ---------------------------
//         } else {
//             console.log("USER password not correct 🤬");
//             res.status(401).send({ message: "USER password not correct 🤬" });
//         }
//     } else {
//         console.log("USER not exists 🥵");
//         res.status(401).send({ message: "USER not exists 🥵" });
//     }
// });
// //------------------------Routers-------------------------------
// app.listen(PORT, () => {
//     console.log(`Server 🚀: ${PORT}`);
// });