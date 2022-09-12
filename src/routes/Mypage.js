import Top from "./Top";
import {useLocation} from "react-router-dom";

function Mypage(){
    const { state } =useLocation();
    state.push([null,null,null,null,null,null]);

    console.log(state);
    const rendering = () =>{
        const result = [];
        for(let i=0; i<state.length; i++){
            if(state[i][4]!=null){
                console.log(state[i][3]);
                if(state[i][3]==state[i+1][3]){
                    state[i][4] +=  state[i+1][4];
                    state[i+1][4] =null;
                }
            }
            result.push(
                //todo: option
                //내용
                <div className="row d-flex text-center bg-secondary align-items-center ">
                    <div className="border col-2">
                        {state[i][0]}
                    </div>
                    <div className="border col-6">
                        {state[i][1]}
                    </div>
                    <div className="border col-2">
                        {state[i][2]}
                    </div>
                    <div className="border col-2">
                        {state[i][4]}
                    </div>
                </div>

            );
        }


        return result;

    }

    return (<>
        <Top></Top>
        <div className="container">
            <div className="row d-flex text-center bg-secondary align-items-center ">
                <div className="border col-2">
                    주문일자
                </div>
                <div className="border col-6">
                    상품정보
                </div>
                <div className="border col-2">
                    상품구매금액
                </div>
                <div className="border col-2">
                    주문처리상태
                </div>
            </div>
            {rendering()}

        </div>
        </>);
}

export default Mypage;