import { Outlet } from "react-router-dom"
import './index.css'

function AuthLayout() {
  return (
    <div className="auth-layout">
        <div className="auth-layout-container">
          <div className="auth-left-container"></div>
          <div className="auth-outlet-container">
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default AuthLayout