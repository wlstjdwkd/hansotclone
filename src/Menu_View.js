import Top from "./Top";
import {Link, useLocation} from "react-router-dom";
import blossom from './img/blossom.jpg';
import azalea from './img/Azalea.jpg';
import React from "react";


function Menu_View(){
    const { state } = useLocation();
    console.log("menu_view_state: "+state[1]);
    let img_url;
    if(state[0]==2){
        img_url = blossom;
    }
    else if(state[0]==3){
        img_url = azalea;
    }

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
                        <img src={img_url}/>

                        {/*<img src={require('./img/newMenu1.jpg')}/>*/}
                    </div>
                    <div className="col-7">
                        <h3>
                            {state[1]}
                        </h3>
                        <p>
                            {state[2]}
                        </p>
                        <div>
                        {/*    option*/}
                        </div>
                        <div className="total">
                            <dd>
                                <span>
                                    {state[4]}
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
                        {state[5]}
                        <span></span>
                        Kcal
                    </p>
                </div>
            </div>
        </>
    );
}

export default Menu_View;