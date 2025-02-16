import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (

    <div className="flex flex-1 items-center justify-center bg-background">
        <Outlet />
      </div>
  
  );
}

export default AuthLayout;
