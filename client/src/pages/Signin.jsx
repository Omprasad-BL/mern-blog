import { Label,Button, TextInput, Alert, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData,setFormData]=useState({});
  const [errorMessage,setErrorMessage] = useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handlClick=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
    console.log(e.target.value);
  }
 
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!formData.email||!formData.password){
      return setErrorMessage("Please fill all fields");
    }
    console.log(formData);
    try {
      setLoading(true);
      setErrorMessage(null);
      const res= await fetch('/api/auth/sign-in',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data= await res.json();
      if (data.success==false) {
        return setErrorMessage("Fill out all the details")
      }
      setLoading(false);
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  // console.log(formData);
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl ">
            <span className="px-2 py-1  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Adiomi
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. That can sign up with your email and
            password with google
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
           
            <div className="">
              <Label value="Your email" />
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handlClick}  />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput type="password" placeholder="##############" id="password" onChange={handlClick}  />
            </div>
            <Button gradientDuoTone='purpleToPink' disabled={loading} type="submit">
              {loading?(
                <>
                <Spinner size='sm'/>
                <span className="pl-3"> Loading..</span>
                </>
              ): 'Sign In' }
              
            </Button>

          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have an account?</span>
              <Link to="/sign-up" className="text-blue-500">Sign Up</Link>
            
          </div>
          {
            errorMessage && (
              <Alert type="danger" color='failure' className="mt-5">
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
