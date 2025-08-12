import Loader from "../assets/loader.gif"
const Loading = () => {
    return (
        <>
            <div  style={{height:"100vh", display:"flex" , justifyContent:"center" , marginTop:"10vh"}}>
                <img src={Loader} alt="Loading.." style={{width:"100px" , height:"100px" }}/>
            </div>
        </>
    )
}

export default Loading

