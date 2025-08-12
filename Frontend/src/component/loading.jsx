const Loading = () => {
    return (
        <>
            <div class="spinner-border" role="status" style={{width:"200px" , height:"200px" ,   
            color:"lightgrey", display:"flex" , justifyContent:"center" , alignItems:"center"}}>
                <span class="sr-only">Loading...</span>
            </div>
        </>
    )
}

export default Loading

