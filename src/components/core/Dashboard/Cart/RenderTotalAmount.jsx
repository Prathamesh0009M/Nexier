import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
// import { buyCourse } from '../../../../services/operations/studentFeaturesApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {
  const {total} = useSelector((state) => state.cart)
  const { cart } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

//   const  hanleBuyCourse= () => {
//     const courses = cart.map((course) => course._id);
//     console.log("Bought these courses",courses)
//     // todo integrate payment
//     buyCourse(token, courses, user, navigate, dispatch);
    //   }
    
  return (
    <div>
      <p>Total: </p>
      <p>Rs {total}</p>

      <IconBtn
        text={"Buy Now"}
        // onclick={hanleBuyCourse}
        customClasses={"w-full justify-center"}
      />
    </div>
  )
}

export default RenderTotalAmount