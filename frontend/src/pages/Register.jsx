import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";

import { toast } from "react-toastify";

function Register() {

    const navigate =
        useNavigate();

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const [showPassword,
        setShowPassword] =
        useState(false);

    const [loading,
        setLoading] =
        useState(false);

    const handleRegister =
        async (e) => {

            e.preventDefault();

            if (
                password !==
                confirmPassword
            ) {

                toast.error(
                    "Passwords do not match."
                );

                return;
            }

            try {

                setLoading(true);

                await api.post(
                    "notes/register/",
                    {
                        username,
                        email,
                        password,
                    }
                );

                toast.success(
                    "Registration Successful!"
                );

                navigate("/");

            } catch (error) {

                console.error(
                    error.response?.data
                );

                toast.error(
                    error.response?.data?.username?.[0]
                    ||
                    error.response?.data?.email?.[0]
                    ||
                    "Registration Failed"
                );

            } finally {

                setLoading(false);

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

                        <h1>
                            Register
                        </h1>

                        <h2
                            className="
                                text-4xl
                                font-bold
                                text-gray-800
                                mb-2
                            "
                        >
                            Create Account ✨
                        </h2>

                        <p
                            className="
                                text-gray-500
                                mb-8
                            "
                        >
                            Create your account to start organizing your notes.
                        </p>

                        <form
                            onSubmit={handleRegister}
                            className="space-y-5"
                        >

                            {/* Username */}

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
                                    placeholder="Choose a username"
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
                                        rounded-xl
                                        focus:ring-2
                                        focus:ring-green-500
                                        outline-none
                                        transition
                                    "
                                    required
                                />

                            </div>

                            {/* Email */}

                            <div>

                                <label
                                    htmlFor="email"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                        mb-2
                                    "
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        border
                                        rounded-xl
                                        focus:ring-2
                                        focus:ring-green-500
                                        outline-none
                                        transition
                                    "
                                    required
                                />

                            </div>

                            {/* Password */}

                            <div>

                                <label
                                    htmlFor="password"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                        mb-2
                                    "
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
                                        placeholder="Create a password"
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
                                            rounded-xl
                                            focus:ring-2
                                            focus:ring-green-500
                                            outline-none
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

                            {/* Confirm Password */}

                            <div>

                                <label
                                    htmlFor="confirmPassword"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                        mb-2
                                    "
                                >
                                    Confirm Password
                                </label>

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        border
                                        rounded-xl
                                        focus:ring-2
                                        focus:ring-green-500
                                        outline-none
                                        transition
                                    "
                                    required
                                />

                            </div>

                            {/* Register Button */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    w-full
                                    bg-green-600
                                    hover:bg-green-700
                                    hover:-translate-y-1
                                    transition-all
                                    duration-300
                                    text-white
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    disabled:opacity-60
                                    disabled:cursor-not-allowed
                                "
                            >
                                {
                                    loading
                                        ? "Creating Account..."
                                        : "Create Account"
                                }
                            </button>

                        </form>

                        <div
                            className="
                                mt-8
                                text-center
                            "
                        >

                            <p className="text-gray-600">

                                Already have an account?

                                <span
                                    onClick={() =>
                                        navigate("/")
                                    }
                                    className="
                                        ml-2
                                        text-blue-600
                                        font-semibold
                                        cursor-pointer
                                        hover:underline
                                    "
                                >
                                    Login
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
                    </div>
                </div>

                {/* <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(
                            e.target.value
                        )
                    }
                /> */}

                {/* <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                /> */}

                {/* <button
                    type="submit"
                    disabled={loading}
                    className="
                    w-full
                    bg-green-600
                    hover:bg-green-700
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                    disabled:opacity-60
                    "
                >
                    {
                        loading
                            ? "Creating Account..."
                            : "Create Account"
                    }
                </button> */}

                {/* <button
                        onClick={
                            handleRegister
                            }
                    >
                        Register
                    </button> */}

                {/* <div className="mt-8 text-center">

                    <p className="text-gray-600">

                        Already have an account?

                        <span
                            onClick={() =>
                                navigate("/")
                            }
                            className="
                            ml-2
                            text-blue-600
                            font-semibold
                            cursor-pointer
                            hover:underline
                        "
                        >
                            Login
                        </span>

                    </p>

                </div> */}

                {/* <Link to="/">
                        Already have an account?
                        Login
                    </Link> */}

                {/* <div
                    className="
                mt-10
                text-center
                text-sm
                text-gray-400
                "
                >

                    React • Redux • Django REST • Tailwind CSS

                </div> */}

            </div>
        </div>
    );
}

export default Register;