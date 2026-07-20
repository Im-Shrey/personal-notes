// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

// function App() {
//   return (
//     <h1>Personal Notes App</h1>
//   );
// }

// export default App

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard
  from "./pages/Dashboard";

import Login from "./pages/Login";

import ProtectedRoute
  from "./components/ProtectedRoute";

import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;