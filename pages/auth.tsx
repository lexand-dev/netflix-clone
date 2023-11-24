import Input from "@/components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login")

  const toggleVariant = useCallback(() => {
      setVariant((currentVariant) => currentVariant === "login" ? "register" : "login")
    }
    , [])

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      })
    }
    catch (error) {
      console.log(error)
    }
  }
  , [email, password])

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        name,
        email,
        password
      })
      login()
    }
    catch (error) {
      console.log(error)
    }
  }
  , [email, name, password, login])

  return ( 
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-fixed">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
              <Input 
                id="name"
                label="Username"
                type="text"
                onChange={(ev) => setName(ev.target.value)}
                value={name}
              />
              )}
                <Input 
                id="email"
                label="Email"
                type="email"
                onChange={(ev) => setEmail(ev.target.value)}
                value={email}
              />
                <Input 
                id="password"
                label="Password"
                type="password"
                onChange={(ev) => setPassword(ev.target.value)}
                value={password}
              />
            </div>
            <button onClick={variant === "login" ? login : register } className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === "login" ? "Sign In" : "Sign Up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="
                  w-10
                  h-10
                  bg-white
                  rounded-full
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                "
              >
                <FcGoogle/>
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="
                  w-10
                  h-10
                  bg-white
                  rounded-full
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                "
              >
                <FaGithub/>
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login" ? "First time using Netflix?" : "Already have an account?"}
              <a onClick={toggleVariant} href="#" className="text-white ml-1 hover:underline">
                {variant === "login" ? "Create an account" : "Sign In now."}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Auth;