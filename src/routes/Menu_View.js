import Top from "./Top";
import {Link, useLocation, useParams} from "react-router-dom";
import blossom from '../img/blossom.jpg';
import azalea from '../img/Azalea.jpg';
import React, {useState} from "react";
import { useCookies } from "react-cookie";

function Menu_View(){
    const location = useLocation();
    const [cookies, setCookie, removeCookie] =useCookies(['id']);

    let { menuID } = useParams();

    console.log("params: "+menuID);
    let cookies_id=cookies.id;
    console.log("쿠키아이디 : "+cookies_id);
    console.log("menu_view_state_menu: "+location.state.menu);
    console.log("menu_view_state_option: "+location.state.option);
    const [member_id,setMember_id] = useState("");
    const [menu_id, setMenu_id] =useState("");
    const [order_date,setOrder_date]=useState("");
    const [option_id,setOption_id] = useState([]);

    const menu=location.state.menu;
    const option = location.state.option;
    let option_sum_txt;

    let total;
    const handleChange = (e)=>{
        option_sum_txt=document.getElementById("option_sum_txt");
        total = document.getElementById("total");
        if(e.target.checked){
            console.log(Number(option_sum_txt.innerHTML)+Number(e.target.value));
            option_sum_txt.innerHTML = Number(option_sum_txt.innerHTML)+ Number(e.target.value);
            total.innerHTML= Number(total.innerHTML)+ Number(e.target.value);
            setOption_id(option_id=>[...option_id, e.target.id]);
        }else{
            option_sum_txt.innerHTML = Number(option_sum_txt.innerHTML)- Number(e.target.value);
            total.innerHTML= Number(total.innerHTML) - Number(e.target.value);
            //setoption빼는거 구현안했음
        }
    }

    //img_url부분인데 좀 고쳐야할듯
    let img_url;
    if(menu[0]==2){
        img_url = blossom;
    }
    else if(menu[0]==3){
        img_url = azalea;
    }


    ////////////////////////////
    const onOrder = async (e)=>{
        //e.preventDefault();

        console.log("onOrder front");
        e.preventDefault();
        console.log(member_id);
        const req = {
            member_id:cookies_id,
            menu_id:menuID,
            // order_date:order_date,
            // option_id:option_id,
        };
        const res = await fetch("http://localhost:5000/order",{
            method:"POST",
            headers: { "Content-Type": "application/json"},
            body:JSON.stringify(req),
        });

        const data=await res.json();
        if(res.ok) {
            //주문 성공
            alert(data.message);
            window.location.href="/";
        }else{

        }
    }

    const rendering = () =>{
        const result = [];
        for (let i=0; i<option.length;i++){
            result.push(
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={option[i][2]} id={option[i][0]} onChange={handleChange}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {option[i][1]}     +{option[i][2]}원
                        </label>
                    </div>
                // <option value={option[i][2]}></option>
            );
        }
        return result;
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
                        <form onSubmit={(e)=>{
                            onOrder(e);
                        }}>
                            <h3>
                                {menu[1]}
                            </h3>
                            <p>
                                {menu[2]}
                            </p>

                            <div>
                                {rendering()}
                                {/*    option*/}
                            </div>

                            <br/>
                            <div className="total">
                                <dd>
                                <span>
                                    {menu[4]}
                                </span>
                                    <br/>
                                    <span id="option_sum_txt">
                                    0
                                </span>
                                </dd>
                                <div className="price_wrap">
                                <span id="total">
                                    {menu[4]}
                                </span>
                                    {/*합계 */}
                                    <em></em>
                                    원
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">
                                주문하기
                            </button>
                        </form>

                    </div>
                </div>
                <div>
                    <h4>열량</h4>
                    <p>
                        {menu[5]}
                        <span></span>
                        Kcal
                    </p>
                </div>
            </div>
        </>
    );
}

export default Menu_View;