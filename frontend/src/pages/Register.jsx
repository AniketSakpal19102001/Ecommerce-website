import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleRegister(e) {
    e.preventDefault();

    if (email.trim() && password.trim) {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/register",
          {
            name,
            username: email,
            password,
          }
        );
        const result = response.data;
        if (result.message === "user registered succesfully") {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
      setEmail("");
      setPassword("");
      setName("");
    }
  }
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="shadow-xl border border-gray-200 rounded-lg w-[28rem]">
          <form action="" onSubmit={handleRegister}>
            <div className="w-full flex justify-center py-6 ">
              <h1 className="text-4xl font-semibold">Register</h1>
            </div>
            <div className="flex flex-col mx-5 mb-5 gap-4">
              <div className="w-full text-lg text-gray-700 grid gap-2">
                <label htmlFor="fName">Enter Name</label>
                <input
                  placeholder="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:ring-4"
                />
              </div>
              {/* <div className="w-full text-lg text-gray-700 grid gap-2">
                <label htmlFor="lName">Last Name</label>
                <input
                  placeholder="Last Name"
                  type="text"
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:ring-4"
                />
              </div> */}
              <div className="w-full text-lg text-gray-700 grid gap-2">
                <label htmlFor="email">Email address</label>
                <input
                  placeholder="Enter email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:ring-4"
                />
              </div>
              <div className="w-full text-lg text-gray-700 grid gap-2">
                <label htmlFor="password">Enter Password</label>
                <input
                  placeholder="Password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:ring-4"
                />
              </div>
              <div to={"/login"} className="w-full text-lg text-gray-700">
                <button className="w-full h-full bg-blue-500 text-white rounded-md py-2">
                  Register
                </button>
              </div>
              <div className="w-full flex justify-center">
                <p>
                  Already a user ?{" "}
                  <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
                    <NavLink to={"/login"}>sign in</NavLink>
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
