import '@fortawesome/fontawesome-free/css/all.min.css';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { CartContext } from '../Context/CartContext';

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext)
  const navigate = useNavigate()
  function Logout() {
    localStorage.removeItem("tkn")
    setToken(null)
    navigate("/")
  }

  const {numOfItems}=useContext(CartContext)

  return (
    <>

      <nav className="bg-slate-50 border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div>
            <i className="fa-solid fa-cart-shopping text-green-600 text-3xl" ></i>
            <span className='text-black text-3xl mx-0.5 font-semibold'>fresh cart</span>
          </div>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200   " aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className='flex'>
  {token? <> 
   <NavLink to={"/home"}>home</NavLink>
    <NavLink to={"/cart"}  className='mx-3 '>cart</NavLink>
    <NavLink to={"/wishlist"}>wishlist</NavLink>
    <NavLink to={"/products"} className='mx-3'>product</NavLink>
    <NavLink to={"/CategoriesPage"}>categories</NavLink>
    <NavLink to={"/brands"} className='mx-3'>brands</NavLink>
    <NavLink to={"/AllOrders"} className='mx-3'>AllOrders</NavLink></>:""}

  </ul>
          </div>
          <div className='text-slate-500'>
  <ul className='flex'>
{token ? <>
<div className='flex items-center'>
  <div className='relative'>
  <li>
  <NavLink to={"/cart"}><i className='fa-solid fa-cart-shopping  text-3xl text-gray-600 mx-5'></i></NavLink>
    </li>
  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-700  rounded-md -top-2 -end-[-7px] ">{numOfItems}</div>
  </div>

<li><NavLink onClick={ Logout} to="/">logout</NavLink></li>

</div>

</> : <>    <li>
      <NavLink to="/register" className="mx-6">register</NavLink>
    </li>
    
    <li><NavLink to={"/"} >login</NavLink></li></>}

  </ul>



</div>
        </div>
      </nav>


      {/* <nav className='bg-slate-50 fixed top-0 left-0 w-full '>
        
        <div className="py-5 ">
            <div className="container mx-auto ">
                <div className='flex justify-between items-center'>
                   <div>
                   <i className="fa-solid fa-cart-shopping text-green-600 text-3xl" ></i>
                   <span className='text-black text-3xl mx-0.5 font-semibold'>fresh cart</span>
                    </div> 
<div className='mx-auto'>
  <ul className='flex'>
  {token? <>  <li>home</li>
    <li className='mx-3'>cart</li>
    <li>wishlist</li>
    <li className='mx-3'>product</li>
    <li>categories</li>
    <li className='mx-3'>brands</li></>:""}

  </ul>
</div>
                <div>
<div className='text-slate-500'>
  <ul className='flex'>
{token ? <>
<div className='flex items-center'>
  <li><i className='fa-solid fa-cart-shopping text-2xl text-gray-600 mx-5'></i></li>
<li><NavLink to="/">logout</NavLink></li>

</div>

</> : <>    <li>
      <NavLink to="/register" className="mx-6">register</NavLink>
    </li>
    <li><button onClick={ Logout}>login</button></li></>}

  </ul>



</div>

                </div>
                </div>
            </div>
        </div>
      </nav> */}
    </>
  )
}

export default Navbar
