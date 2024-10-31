import React from 'react'

const productBuilder = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { item } = useSelector((state) => state.item);

  const { token } = useSelector((state) => state.auth);


  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);



  return (
    <div>
      
    </div>
  )
}

export default productBuilder
