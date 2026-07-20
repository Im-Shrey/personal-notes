import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate }
  from "react-router-dom";
import { Link } from "react-router-dom";

import api from "../api/axios";

import {
  setCredentials,
} from "../features/auth/authSlice";

import {
  useSelector,
} from "react-redux";

import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const token = useSelector(
    (state) =>
      state.auth.accessToken
  );

  const navigate = useNavigate();

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true);

      const response =
        await api.post("token/", {
          username,
          password,
        });

      dispatch(
        setCredentials(
          response.data
        )
      );

      navigate("/dashboard");

      localStorage.setItem(
        "token",
        response.data.access
      );

      setLoading(false);

      // console.log(
      //   "Logged In Successfully"
      // );

      toast.success(
        "Login Successful"
      );

    } catch (error) {
      console.error(
        error.response?.data
      );
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-600
        via-indigo-700
        to-purple-700
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-6xl
          grid
          md:grid-cols-2
          bg-white/10
          backdrop-blur-lg
          rounded-3xl
          overflow-hidden
          shadow-2xl
        "
      >
        <div
          className="
            text-white
            p-12
            flex
            flex-col
            justify-center
          "
        >

          <h1
            className="
              text-5xl
              font-extrabold
              mb-6
            "
          >
            📒 Personal Notes
          </h1>

          <p
            className="
              text-lg
              leading-8
              text-blue-100
            "
          >
            Organize your thoughts,
            manage your work,
            and never lose an idea again.
          </p>

          <div
            className="
              mt-10
              space-y-4
              text-lg
            "
          >

            <p>✅ Secure Authentication</p>

            <p>📂 Categories</p>

            <p>🔍 Smart Search</p>

            <p>📌 Pin Important Notes</p>

            <p>🌙 Dark Mode</p>

          </div>

        </div>

        <div
          className="
            flex
            items-center
            justify-center
            bg-white
            p-8
            md:p-12
          "
        >

          <div
            className="
              w-full
              max-w-md
            "
          >

            <h1>Login</h1>

            <h2
              className="
                text-4xl
                font-bold
                text-gray-800
                mb-2
              "
            >
              Welcome Back 👋
            </h2>

            <p
              className="
                text-gray-500
                mb-8
              "
            >
              Login to continue managing your notes.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              /> */}

              <div>

                <label
                  htmlFor="username"
                  className="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    mb-2
                  "
                >
                  Username
                </label>

                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    px-4
                    py-3
                    border
                    border-gray-300
                    rounded-xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    transition
                  "
                  required
                />

              </div>

              <br />
              <br />

              {/* <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              /> */}

              <div>

                <label
                  htmlFor="password"
                  className="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    mb-2"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="
                        w-full
                        px-4
                        py-3
                        border
                        border-gray-300
                        rounded-xl
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        transition
                      "
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-xl
                      "
                  >
                    {
                      showPassword
                        ? "🙈"
                        : "👁️"
                    }
                  </button>

                </div>

              </div>

              {/* <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "🙈"
                  : "👁"}
              </button> */}

              <br />
              <br />

              {/* <button
                className="hover:-translate-y-1
                transition-all
                duration-300
                "
                onClick={handleSubmit}
              >
                Login
              </button> */}

              <button
                type="submit"
                disabled={loading}
                className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                hover:-translate-y-1
                transition-all
                duration-300
                text-white
                py-3
                rounded-xl
                font-semibold
                disabled:opacity-60
                disabled:cursor-not-allowed"
              >
                {
                  loading
                    ? "Logging In..."
                    : "Login"
                }
              </button>

              {/* <button
                disabled={loading}
              >
                {
                  loading
                    ? "Logging In..."
                    : "Login"
                }
              </button> */}

              {/* <p>
                Token:
                {token
                ? " Logged In"
                : " Not Logged In"}
                </p> */
              }

            </form>
            <br />
            <br />

            <div
              className="
                mt-8
                text-center
              "
            >

              <p className="text-gray-600">

                Don't have an account?

                <span
                  onClick={() =>
                    navigate("/register")
                  }
                  className="
                    ml-2
                    text-blue-600
                    font-semibold
                    cursor-pointer
                    hover:underline
                  "
                >
                  Create Account
                </span>

              </p>

            </div>

            <div
              className="
                mt-10
                text-center
                text-sm
                text-gray-400
              "
            >

              Built with ❤️ using
              React • Redux • Django REST • Tailwind CSS

            </div>

            {/* <Link to="/register">
              Don't have an account?
              Register
            </Link> */}
          </div>
        </div>
      </div>
    </div >
  );
}

export default Login;