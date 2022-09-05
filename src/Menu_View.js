import Top from "./Top";
import {Link} from "react-router-dom";

function Menu_View(){
    return(
        <>
        <Top></Top>
            <div className="container">
                <h2>
                    <Link to="/menu_list">
                        전체 메뉴
                    </Link>
                </h2>
                <div className="row">
                    <div className="col-5">
                        {/*여기에 이미지 주소*/}
                        <img src={require('./img/newMenu1.jpg')}/>
                    </div>
                    <div className="col-7">
                        <h3>
                        {/*    여기에  name*/}
                        </h3>
                        <p>
                        {/*    description*/}
                        </p>
                        <div>
                        {/*    option*/}
                        </div>
                        <div className="total">
                            <dd>
                                <span>
                                    {/*    price*/}
                                </span>
                                <span>
                                {/*    option 비용*/}
                                </span>
                            </dd>
                            <div className="price_wrap">
                                {/*합계 */}
                                <em></em>
                                원
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>열량</h4>
                    <p>
                        {/*calorie*/}
                        <span></span>
                        Kcal
                    </p>
                </div>
            </div>
        </>
    );
}

export default Menu_View;