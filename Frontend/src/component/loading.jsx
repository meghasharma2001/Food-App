import Loader from "../assets/loader.gif"
const Loading = () => {
    return (
        <>
            <div>
                <img src={Loader} alt="Loading.." style={{width:"200px" , height:"200px" ,  margin:"20px 45vw",
            color:"lightgrey", display:"flex" , justifyContent:"center" , alignItems:"center"}}/>
            </div>
        </>
    )
}

export default Loading

