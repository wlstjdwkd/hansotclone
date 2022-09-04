import Top from "./Top";
import {Link} from "react-router-dom";

function SignupAgree(){
    return(
        <>
        <Top></Top>
        <div className="container">
            <h2>회원가입</h2>
            <div className="row">
                <div className="col-4">
                    <h3>
                        01
                        <br/>
                        약관동의
                    </h3>
                    <p>
                    <span className="d-block">
                        회원가입을 위해서
                        <em>
                            이용약관 및
                        </em>
                    </span>
                        <span className="d-block">
                        <em>
                            개인정보 수집 및 이용
                        </em>
                        에 대한
                    </span>
                        <span className="d-block">
                        안내를 읽고
                        <em>
                            동의
                        </em>
                        해주세요.
                    </span>

                    </p>
                </div>

                {/**/}

                <div className="col-8">
                    <h4>이용약관</h4>
                    <div>

                    </div>

                    <div className="all_check">
                        <input type="checkbox" id="allCheck"/>
                        <label htmlFor="allCheck">
                            위 약관에 모두 동의합니다
                        </label>
                    </div>
                    <div>
                        <button className="btn-warning">
                            <Link to="/signup">다음</Link>
                        </button>
                    </div>
                </div>
            </div>


        </div>
        </>
    );
}
export default SignupAgree;