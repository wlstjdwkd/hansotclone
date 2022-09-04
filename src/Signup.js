import Top from "./Top";
import {Link} from "react-router-dom";

function Signup(){
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
                        <dt>아이디</dt>
                        <input type="text" placeholder="아이디를 입력해 주세요"/>
                        <dt>비밀번호</dt>
                        <input type="text" placeholder="비밀번호를 입력해 주세요"/>
                        <dt>이메일</dt>
                        <input type="text" placeholder="이메일 주소를 입력해 주세요"/>
                        <dt>휴대폰</dt>
                        <input type="text" placeholder="휴대폰 번호를 입력해 주세요"/>
                        <div>
                            <button className="btn-warning">
                                <Link to="/">가입하기</Link>
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </>
    ) ;
}
export default Signup;