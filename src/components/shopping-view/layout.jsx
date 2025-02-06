import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import bgImage from "../../assets/bgd.jpg"; 

function ShoppingLayout() {
  return (
    <div 
      className=" flex flex-col bg-[#040c1b] overflow-hidden"
      
    >
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;