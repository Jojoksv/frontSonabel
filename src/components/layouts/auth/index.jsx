import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <div className="authBody">
        <div>
          <div>
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default AuthLayout