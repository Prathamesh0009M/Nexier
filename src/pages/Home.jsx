import React from 'react'
import UpdateSlider from '../components/UpdateSlider'
import AllProducts from "../components/core/Items/AllProducts"
const Home = () => {
  return (
    <div>
      {/* sction 1 */}
      <div className='relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between '>
        <div className='w-full  h-auto mt-5  '>

{/*           <UpdateSlider /> */}

        </div>

        

        <p className='mt-8 text-3xl'>Fresh recommendations</p>

        <div className='mt-2'>
          <AllProducts />
        </div>

      </div>
    </div>
  )
}

export default Home
