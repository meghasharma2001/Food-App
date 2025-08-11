import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { logoutuser } from "../../actions/regActions";
import { searchAction } from "../../reducers/searchReducer"

import { getAllUserOrders } from "../../actions/orderAction"



const Navbar = () => {

  const cartstate = useSelector(state => state.addTocartStore.mycartItems)

  const loginstate = useSelector(state => state.loginReducerstore.locallogin)


  const [isOpen, setisOpen] = useState(false)
  const [userTyped, setuserTyped] = useState("")
  const [burger, setburger] = useState(true)




  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllUserOrders())
  }, [])
  const orders = useSelector(state => state.getAllUserOrdersReducerstore)

  const { error, loading, userorders } = orders

  console.log(error)

  const isvaliduser = (error === "jwt expired") ? false : true


  return (
    <>


      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{ position: "sticky", top: 0 }} >
        <div className="container-fluid med">

          <Link to="/" className="navbar-brand nav-link med" style={{ marginRight: "2vw", fontWeight: "bold", justifyContent: "flex-start" }}>FoodApp</Link>


          <div className="forflex med" style={{ display: "flex", justifyContent: "flex-end", width: "5vw", alignItems: "center" }}>

            <input value={userTyped} onChange={(e) => setuserTyped(e.target.value)} /> <button onClick={() => dispatch(searchAction(userTyped))} style={{ margin: "0px 2vw 0px 5px" }} className="regbtn">search</button>



            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent" >

              <ul className="navbar-nav ml-auto  mr-auto">




                <li className="nav-item ">
                  <Link className="nav-link navi" to="/cart">Cart{cartstate?.length}</Link>
                </li>


                {
                 isvaliduser && (loginstate) ?
                    <div>
                      <Link className="navi nav-link forflex" onClick={() => setisOpen(!isOpen)} style={{}}>{loginstate.name}{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</Link>

                      {isOpen && (
                        <div style={{ display: "flex", flexDirection: "column", textDecoration: "none" }} >
                          <Link className="nav-link" to="/orders">Orders</Link>
                          <Link className="nav-link" to="/" onClick={() => dispatch(logoutuser(loginstate._id))}>Logout</Link>
                        </div>)
                      }
                    </div>


                    : (<><li className="nav-item ">
                      <Link className="nav-link navi" to="/login" >Login</Link>
                    </li>
                      <li><Link className="nav-link navi" to="/register"  >Register</Link></li> </>)
                }
              </ul>
            </div>


          </div>
        </div>
      </nav>

    </>
  )
}
export default Navbar;


