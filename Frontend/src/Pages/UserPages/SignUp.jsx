import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";

import { userSignup } from "../../Api/userApi";
import { setUserDetails } from "../../Redux/UserSlice/userSlice";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Card, Input, Button, Typography } from '@material-tailwind/react'

function SignUp() {


  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name.trim() === "") {
        toast("Please enter your name");
      } else if (number.trim() === "") {
        toast("Please enter your number");
      } else if (email.trim() === "") {
        toast("Please enter your email");
      } else if (password.trim() === "") {
        toast("Please enter your password");
      } else if (/\s/.test(name) || /\s/.test(number) || /\s/.test(email) ) {
        // Check if there is whitespace in any of the fields
        toast("Fields should not contain spaces");
      }
       else {
        const response = await userSignup({ name, number, email, password });
        if (response.data.status) {
          localStorage.setItem("token", response.data.token);
          const { _id, name, email, number,image, is_admin } = response.data.userData;
          dispatch(
            setUserDetails({
              id: _id,
              name: name,
              mobile : number,
              email: email,
              image : image,
              is_admin: is_admin,
            })
          );

          navigate("/");
        } else {
          toast(response.data.alert)
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className="w-full flex justify-center">
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray" className="text-start">
        Sign Up
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="lg"
            label="Name"
          />
          <Input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            size="lg"
            label="Number"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            label="Email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            size="lg"
            label="Password"
          />
        </div>
        <Button className="mt-6" type="submit" fullWidth>
          Register
        </Button>

        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to={"/login"} className="font-medium text-gray-900">
            Sign In
          </Link>
        </Typography>
        
      </form>
      <ToastContainer />
    </Card>
  </div>
  );
}

export default SignUp;
