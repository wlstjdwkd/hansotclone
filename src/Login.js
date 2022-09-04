import React, {useState} from "react";
import {Link} from "react-router-dom";

function Login(){
    const [web_id,setWeb_id] = useState("");
    const [password,setPassword] = useState("");

    const onIDHandeler = (e) =>{

    }

    return(<>
        <div className="col-7">
            <h2>
                로그인
            </h2>
            <form action="">
                <input type="text" name='web_id'  placeholder="아이디"/>
                <input type="text" name='password' placeholder="비밀번호"/>

                <div>
                    <button className="btn-warning">
                        <Link to="/">로그인</Link>
                    </button>
                </div>
            </form>
        </div>
        <div className="col-5">

        </div>
    </>);
}

export default Login;