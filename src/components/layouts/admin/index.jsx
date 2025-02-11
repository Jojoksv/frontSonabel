import { Outlet } from "react-router-dom"

function AdminLayout() {
  return (
    <div>
        <div>
          <div>
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default AdminLayout