import {  LogOut, Menu, ShoppingCart, UserCog, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Label } from "../ui/label";
import track4Logo from "../../assets/logo2/logo-2.gif";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";

import SearchBar from "./SearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import { useEffect, useState } from "react";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
function MenuItems({ onItemClick, isMobile }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [hoveredDropdownId, setHoveredDropdownId] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const handleNavigate = (getCurrentMenuItem) => {
    sessionStorage.removeItem('filters');
    const currentFilter =
      getCurrentMenuItem.id !== 'home' &&
        getCurrentMenuItem.id !== 'products' &&
        getCurrentMenuItem.id !== 'search' &&
        getCurrentMenuItem.id !== 'about'
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem('filters', JSON.stringify(currentFilter));

    if (location.pathname.includes('listing') && currentFilter !== null) {
      // Set category in the query string for filtering products
      setSearchParams({ category: getCurrentMenuItem.id });
    } else {
      navigate(getCurrentMenuItem.path);
    }

    if (isMobile && onItemClick) {
      onItemClick();
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <nav className={isMobile ? 'flex flex-col gap-2' : 'flex items-center gap-4'}>
      {shoppingViewHeaderMenuItems.map((item) => (
        <div
          key={item.id}
          onMouseEnter={!isMobile && item.dropdown ? () => setHoveredDropdownId(item.id) : undefined}
          onMouseLeave={!isMobile && item.dropdown ? () => setHoveredDropdownId(null) : undefined}
        >
          {!isMobile && item.dropdown ? (
            <DropdownMenu open={hoveredDropdownId === item.id}>
              <DropdownMenuTrigger asChild>
                <div className="block py-2 cursor-pointer">
                  <span className="transition-colors duration-200 hover:text-[#ff6900] flex items-center gap-1">
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onMouseEnter={() => setHoveredDropdownId(item.id)}
                onMouseLeave={() => setHoveredDropdownId(null)}
                style={{ pointerEvents: 'auto' }}
              >
                {item.dropdown.map((subItem) => (
                  <DropdownMenuItem
                    key={subItem.id}
                    onClick={() => {
                      handleNavigate(subItem); // Handle navigation for sub-items
                      if (isMobile) {
                        setOpenDropdownId(null); // Close dropdown on mobile after selection
                      }
                    }}
                    className="cursor-pointer"
                  >
                    {subItem.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div
              onClick={() => {
                if (isMobile && item.dropdown) {
                  toggleDropdown(item.id);
                } else {
                  handleNavigate(item); // Handle navigation for regular items
                }
              }}
              className="block py-2 cursor-pointer"
            >
              <span className="transition-colors duration-200 hover:text-[#ff6900]">
                {item.label}
                {isMobile && item.dropdown && (
                  <ChevronDown className="h-4 w-4 inline-block ml-1" />
                )}
              </span>
            </div>
          )}

          {isMobile && item.dropdown && openDropdownId === item.id && (
            <div className="pl-4 border-l-2 border-gray-200 max-h-48 overflow-y-auto">
              {item.dropdown.map((subItem) => (
                <div
                  key={subItem.id}
                  onClick={() => {
                    handleNavigate(subItem); // Handle navigation for mobile sub-items
                    setOpenDropdownId(null); // Close dropdown on mobile after selection
                  }}
                  className="block py-1 hover:text-primary cursor-pointer"
                >
                  {subItem.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

function HeaderButtons({ onItemClick, isMobile }) {
  const navigate = useNavigate();

  return (
    <div className="flex text-black items-center gap-2">
      <Button
        className="bg-[#04D94F] font-extrabold hover:bg-white text-black rounded-md "
        onClick={() => {
          navigate('/shop/cart');
          onItemClick();
        }}
      >
        Top Up
      </Button>
      <label className="bg-[#F2F2F2] px-4 py-2 font-extrabold rounded-md  text-black">
        $0.00
      </label>
      <Button
        className="bg-yellow-500  text-black hover:bg-white font-extrabold px-4 py-2 rounded-md transition-all"
        onClick={() => {
          navigate('/shop/Orders');
          onItemClick();
        }}
      >
        Orders
      </Button>



    </div>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="text-black w-6 h-6" />
          <span className="absolute top-[-5px] text-black right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-white text-black font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex items-center font-bold text-white border-b bg-black">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 w-full max-w-7xl mx-auto">
        <Link to="/shop/home">
          <img src={track4Logo} alt="Track4 Logo" className=" h-12 w-auto" />
        </Link>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="text-black h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <HeaderButtons onItemClick={() => setIsSheetOpen(false)} isMobile={true} />
            <div className="mt-4 ">
              <SearchBar />
            </div>
            <div className="mt-4">

              <MenuItems onItemClick={() => setIsSheetOpen(false)} isMobile={true} />
              <HeaderRightContent />
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <HeaderButtons isMobile={false} />
          <div className="flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>
          <MenuItems isMobile={false} />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;