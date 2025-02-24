
import Navbar from '../Navbar/Navbar'

const Forget = () => {
  return (
    <>
      <Navbar/>
      <div className='min-h-screen pt-10'>
        <div className="container mx-auto pt-[50px]">
          
                <h1 className='text-black font-medium text-3xl my-3'>please enter your verification email</h1>
<form >
  {/* email input */}
  <div className="mb-5">

    <input type="email" id="email" className=" border  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=' Email:'  />
  </div>
  <button type='submit' className='border border-gray-500 text-gray-400 text-[20px] rounded-md px-4 py-2 mx-auto'>Verfiy</button>
</form>

        </div>
      </div>
    </>
  )
}

export default Forget
