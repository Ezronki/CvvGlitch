import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import dumpsImage from "../../assets/img/dp.jpg"; // Replace with your actual image paths
import skimmerImage from "../../assets/img/sk.jpg";
import cardedItemsImage from "../../assets/img/ci.jpg";
import tutorialsImage from "../../assets/img/tut.jpg";
import bankLoginsImage from "../../assets/img/bank.jpg";
import { useSearchParams } from "react-router-dom";
import ProductCarousel from "../../components/shopping-view/ProductCarousel"



import softwaresImage from "../../assets/img/sw.jpg";
import {
  Airplay,
  BabyIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bannerImage from "../../assets/header.gif"
import sudo from "../../assets/sudo.jpg"
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Link, useNavigate } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";


const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );


  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();


  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }
  function CardSection() {
    const navigate = useNavigate();

    // Array of card data
    const cards = [
      {
        id: 1,
        title: "Dumps + Pins",
        image: dumpsImage,
        path: "/shop/listing?category=dumps",
      },
      {
        id: 2,
        title: "Skimmer",
        image: skimmerImage,
        path: "/shop/listing?category=skimmers",
      },
      {
        id: 3,
        title: "Carded Items",
        image: cardedItemsImage,
        path: "/shop/listing?category=carded_productss",
      },
      {
        id: 4,
        title: "Tutorials",
        image: tutorialsImage,
        path: "/shop/home",
      },
      {
        id: 5,
        title: "Bank Logins",
        image: bankLoginsImage,
        path: "/shop/listing?category=usa_banks",
      },

      {
        id: 7,
        title: "Softwares",
        image: softwaresImage,
        path: "/shop/listing?category=tools",
      },
    ];
    return (
      <section className="bg-black py-8 mt-8 mx-4 lg:mx-20 rounded-2xl">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl mt-1 mb-2 text-white font-extrabold text-center" >Select what suits you best</h1>
          <div className="flex flex-row justify-between items-stretch flex-wrap">
            {cards.map((card) => (
              <div
                key={card.id}

                className="flex-1 mx-2 rounded-lg shadow-lg transition-all duration-300 cursor-pointer hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] max-w-[220px]"
              >
                <a className="block">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-24 object-cover rounded-t-lg transition-all duration-300"
                  />
                </a>
                <div className="p-2">
                  <p className="text-center text-sm font-semibold text-white">
                    <a href={card.path}>{card.title}</a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>






    )
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);



  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");




  return (
    <div className="mt-14 flex flex-col min-h-screen">
      



      <section className="bg-black py-12 mt-3 mx-4 lg:mx-20 rounded-2xl">
        <div className="container mx-auto px-4 lg:px-20">
          <p className="text-3xl font-bold text-center text-[#ff9900] mb-6">
            WELCOME TO CVV GLITCH
          </p>
          

        </div>
       
        <ProductCarousel />


        <CardSection />
      </section>
     




      <div

        className="mt-5 px-4 border-l-[10px] border-r-[10px] p-2 border-2 border-gray-800 bg-[#FFA500] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mx-5 md:mx-20"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-white text-center whitespace-nowrap">
          Best Online Hacking Tools
        </h2>
      </div>
      <div

        className="mt-6 px-4 border-l-[10px] border-r-[10px] p-2 border-2 border-gray-800 bg-[#FFA500] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mx-5 md:mx-20"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-white text-center whitespace-nowrap">
          Bank Wire Transfer Hacking
        </h2>
      </div>


      <section className="bg-black py-12 mt-8 mx-4 lg:mx-20 rounded-2xl">
        <div className="container mx-auto px-4 lg:px-20">
          {/* Main Title */}
          <h1 className="text-3xl font-bold text-center text-[#ff9900] mb-8">
            CARDING CC CCASHOUT
          </h1>

          {/* Introductory Paragraph */}
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Over the years, the Cvv Glitch team has been rugged in online carding and cashing out of stolen/hacked credit card numbers (CC Fullz). We have perfected several CC hacking/sniffing methods via spamming, malware spreading and asking everyone in the streets for their card details. Hey you Moda fuckal!, I’m Captain Jack Sparrow! Your cards numbers!
          </p>

          {/* Second Paragraph */}
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            So to say brothers and lovers of high balanced CC Fullz, we have the best team to supply you fresh hacked CC to meet your demand for money and all carding and CC Fullz cashing out tricks to work for you. Methods change, as a team of pentesters constantly trying to study shopping platforms like Amazon, Ebay and other sites vulnerable to CC carding and refund methods. In July, 20, 2022, a member of our CC cashout research team discovered you can use a crypto site by simply verifying your SSN details and submitting the required scan documents—they don’t care about the cards, at least for now while they’re trying to make money and upgrade their site security against fraudulent credit card charges. We will share this crypto site and carding guide to customers who enroll for our buy CC Fullz and carding mentorship.
          </p>
          <p className="text-xl font-bold text-left text-[#ff9900] mb-6">
            RELIABLE SPAMMING TOOLS
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Spamming is not for the faint of heart; poor spamming setup and low-quality tools can easily result in financial loss. Finding legitimate spam sellers is the next challenging task, and the Sudohackers.com team is attempting to close the gap in this area.

            A highly dependable customer Before he discovered Sudohackers, Adrian was following all the rules, but in the end his links were not impervious and would eventually die out, raising a warning on the victim’s browser. Brothers, this is bad for business.

            We developed a new way for this brother and used blockchain technology to construct a bulletproof link; the results he received as a consequence are astounding.

            Like Felix there maybe little things you’re not doing correctly, maybe you need to change your letter, encrypt it and make your letter FUD.
          </p>
          <p className="text-xl font-bold text-left text-[#ff9900] mb-6">
            Order Quality Spamming Tools In 2024
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            We can code any fraud website you desire specifically for you and have updated scam pages for all banks. Fresh, legitimate SMTP is ensured to reach the mailbox of offices365 and other email providers. With 90–95% inbox delivery, we offer an SMS panel/gateway with any SENDER ID of your choosing. Simple sims, a GSM device, sham websites (Wells Fargo, RBFCU, PayPal, Netflix, USPS), SMTP sender, domains, leads, and Cpanels are examples of these.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            We provide good quality routes to which is stable for all countries sending bulk sms and also to prosper your work with many clicks. SMS gateway available for Spamming/clean traffic. Also, SMS panel available for use. We support almost all the countries you may want.
          </p>
          <p className="text-xl font-bold text-left text-[#ff9900] mb-6">
            OUR CAPABILITIES;
          </p>
          <ul className="list-disc list-inside text-lg text-gray-300 mb-6">
            <li>&gt; SMS panel available</li>
            <li>&gt; Free testing to any countries (Spam/Traffic)</li>
            <li>&gt; 100% delivery of bulk SMS</li>
            <li>&gt; No scamming zone</li>
            <li>&gt; We provide good job for work done</li>
            <li>&gt; No wasting of time on any work. You get great clicks from us.</li>

          </ul>



          {/* Emphasized Title */}
          <p className="text-xl font-bold text-left text-[#ff9900] mb-6">
            MAKE MONEY FROM CARDING AND CC CASHOUT 2025
          </p>

          {/* Third Paragraph */}
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            If you’re a newbie carder or a pro carder, the Sudohackers.com team understands your needs and offers only quality products and service. The following offer is available for customers who want to get started with carding without getting burnt. The best way to succeed is to learn from successful people—and you will save a lot of time. This offer costs $350, and here’s what you will learn. You will receive two guides that are currently working for everyone, no matter your country.
          </p>

          {/* Bullet List */}
          <ul className="list-disc list-inside text-lg text-gray-300 mb-6">
            <li>How to Setup your Computer Properly for Carding.</li>
            <li>Best Site to Buy CC For Carding All Trusted Dumps Shop List</li>
            <li>Best CC Shop – Carding Forum</li>
            <li>How to confirm the balance on CC without killing the card.</li>
            <li>List of Card Shops – Sites to buy CC CVV – CC to Buy</li>
            <li>Valid CCV Shop: Sale Good CC worldwide Fresh and Cheap</li>
            <li>FRESH CVV FULLZ Live Fullz – Buy live CC with balance</li>
            <li>CVV Fullz Credit Card Dumps, CC ATM Track 1/2 + SMTP…</li>
            <li>Hot Seller CVV Good 2024 – NON VBV Credit Card/Debit Card</li>
            <li>
              Buy Western Union Money Transfer CVV CC Dumps track 1 &amp; 2; PayPal and Cashapp transfers also available
            </li>
            <li>
              Credit Cards CVV CC Shops &amp; Sellers (Verified) – CVV SHOP
            </li>
            <li>How to Identify Card-able sites on your own.</li>
            <li>How to Cashout your money to bank drop or to your bitcoin wallet.</li>
            <li>Top legit Sites to Buy high balance CC Fullz in 2024.</li>
            <li>Currently hitting websites for carding CC fullz to bitcoin.</li>
            <li>2024 fire BIN list, hitting high balance.</li>
          </ul>

          {/* Closing Paragraph */}
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            You need to learn Carding to do it yourself, make fast money, and become stinking rich.
          </p>

          {/* Secondary Title */}
          <p className="text-xl font-bold text-left text-[#ff9900] mb-6">
            TO ALL THE BADDIES WHO KNOWS THE GAME
          </p>

          {/* Final Paragraph */}
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            If you’re a good carder already, worry not—because we have updated methods to get you earning immediately. Also, you should take a look at the products listed below and check them out in our store.
          </p>

          {/* Second Bullet List */}
          <ul className="list-disc list-inside text-lg text-gray-300">
            <li>Credit card details, account balance up to 5,000 ~ $180</li>
            <li>Credit card details, account balance up to 10,000 and more – $150</li>
            <li>USA hacked credit card details with CVV – $185</li>
            <li>Australia hacked credit card details with CVV – $145</li>
            <li>Canada hacked credit card details with CVV – $150</li>
            <li>UK hacked credit card details with CVV – $165</li>
            <li>Stolen online banking logins – From $180</li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Left Section: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Cvvglitch. All rights reserved.
            </p>
          </div>
        </div>
      </section>


      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
