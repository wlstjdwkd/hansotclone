import Top from "./Top";

function Mypage(){
    return (<>
        <Top></Top>
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-2">
                    주문일자
                </div>
                <div className="col-6">
                    상품정보
                </div>
                <div className="col-2">
                    상품구매금액
                </div>
                <div className="col-2">
                    주문처리상태
                </div>
            </div>
        </div>
        </>);
}

export default Mypage;