import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

function OrdersPage() {
  const navigate = useNavigate();

  return (
    <div className="  text-center mt-12 mb-48">
      <h2 className="mt-12 text-xl text-muted-foreground">You have no Orders yet.</h2>
      <Button 
        className="mt-10 bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => navigate("/shop/listing")}
      >
        Browse Products
      </Button>
      <div className="mt-10 mb-0 flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Left Section: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400 font-extrabold">
              &copy; {new Date().getFullYear()} TRACK4. All rights reserved.
            </p>
          </div>
        </div>
    </div>
    
  );
}

export default OrdersPage;
