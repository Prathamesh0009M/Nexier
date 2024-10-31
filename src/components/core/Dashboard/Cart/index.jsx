import { useSelector } from "react-redux"

import RenderTotalAmount from "../Cart/RenderTotalAmount"
import RenderCartItem from "./RenderCartItem";


export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (<div className="text-white" >
    <h1>Your Cart</h1>
    <p>{totalItems} Items in Cart</p>
    {
      total > 0 ? (<div>
        <RenderCartItem />
        <RenderTotalAmount />
      </div>) : (
          <p>Your Cart is Empty</p>
      )
    }

  </div>)
}
