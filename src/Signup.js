import Top from "./Top";
import {Link} from "react-router-dom";
import React, {useState} from "react";

function Signup(props){
    const [web_id,setWeb_id] =useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [phone_number,setPhone_Number] = useState("");
    const [regErrStatus, setRegErrStatus] = useState(false);
    const [regErrorMsg, setRegErrorMsg] = useState({
        web_id: "",
        password: "",
        email: "",
        phone_number: "",
    });

    const onRegister = async (e)=>{
        console.log("front signup");
        e.preventDefault();
        const req = {
            web_id:web_id,
            password:password,
            email:email,
            phone_number:phone_number,
        };
        const res = await fetch("http://localhost:5000/signup",{
            method:"POST",
            headers: { "Content-Type": "application/json"},
            body:JSON.stringify(req),
        });

        console.log("res: ", res);
        const data = await res.json();
        if (res.ok) {
            setRegErrStatus(false);
            alert(data.message);
            console.log(data);
        } else {
            if (res.status === 400) {
                console.log("data: ", data);
                setRegErrStatus(true);
                setRegErrorMsg({
                    web_id: data.idErr ? data.idErr.msg : "",
                    password: data.pwdErr ? data.pwdErr.msg : "",
                    email: data.emailErr ? data.emailErr.msg : "",
                    phone_number: data.numErr ? data.numErr.msg : "",
                });
                console.log(regErrorMsg);
            } else {
                //500
                alert(data.message);
            }
        }
    }

    return(
        <>
            <Top></Top>
            <div className="container">
                <h2>회원가입</h2>
                <div className="row">
                    <div className="col-4">
                        <h3>
                            03
                            <br/>
                            개인정보 입력
                        </h3>
                        <p>
                    <span className="d-block">
                        간단한 개인정보를 입력해주시면 회원가입이 완료됩니다.
                    </span>

                        </p>
                    </div>

                    {/**/}

                    <div className="col-8">
                        <h4>필수 입력 사항</h4>
                        <form onSubmit={(e)=>{
                            onRegister(e);
                        }}>
                            <dt>아이디</dt>
                            <input type="text" onChange={(e)=>{
                                setWeb_id(e.target.value);
                            }} placeholder="아이디를 입력해 주세요"/>
                            {regErrStatus ? regErrorMsg.web_id : ""}
                            <dt>비밀번호</dt>
                            <input type="text" onChange={(e)=>{
                                setPassword(e.target.value);
                            }} placeholder="비밀번호를 입력해 주세요"/>
                            {regErrStatus ? regErrorMsg.password : ""}

                            <dt>이메일</dt>
                            <input type="text" onChange={(e)=>{
                                setEmail(e.target.value);
                            }} placeholder="이메일 주소를 입력해 주세요"/>
                            {regErrStatus ? regErrorMsg.email : ""}

                            <dt>휴대폰</dt>
                            <input type="text" onChange={(e)=>{
                                setPhone_Number(e.target.value);
                            }} placeholder="휴대폰 번호를 입력해 주세요"/>
                            {regErrStatus ? regErrorMsg.phone_number : ""}

                            <div>
                                <button type="submit" className="btn-warning">
                                    가입하기
                                </button>
                            </div>
                        </form>

                    </div>
                </div>


            </div>
        </>
    ) ;
}
export default Signup;