export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "usa_banks", label: "USA Banks" },
      { id: "uk_banks", label: "UK Banks" },
      { id: "canada_banks", label: "Canada Banks" },
      { id: "cc_cvv", label: "CC & CVV" },
      { id: "stealth_accountss", label: "Stealth Accounts" },
      { id: "fullzz", label: "Fullz" },
      { id: "toolss", label: "Tools" },
      { id: "e_gift_cardss", label: "E-Gift Cards" },
      { id: "cloness", label: "Clones" },
      { id: "carded_productss", label: "Carded Products" },
      { id: "cashapp", label: "CashApp Logs" },
      { id: "paypal", label: "PayPal Logs" },
      { id: "clm", label: "Cashapp li" },
      { id: "ppm", label: "Paypal li" },
      { id: "applepaym", label: "Apple Pay" },
      { id: "venmom", label: "Venmo" },
      { id: "gpaym", label: "Google Pay" },
      { id: "dumps", label: "Dumps" },
      
    ],
  }
  ,
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "lloyds", label: "Lloyds Banking Group" },
      { id: "barclays", label: "Barclays Bank" },
      { id: "rbs", label: "Royal Bank of Scotland" },
      { id: "standard_chartered", label: "Standard Chartered Bank" },
      { id: "schroders", label: "Schroders Bank" },
      { id: "bank_of_america", label: "Bank of America" },
      { id: "chase", label: "Chase" },
      { id: "citi_bank", label: "Citi Bank" },
      { id: "huntington", label: "Huntington" },
      { id: "discover_bank", label: "Discover Bank" },
      { id: "greendot_bank", label: "Greendot Bank" },
      { id: "citizen", label: "Citizen" },
      { id: "usaa", label: "USAA" },
      { id: "chime", label: "Chime" },
      { id: "woodforest", label: "Woodforest" },
      { id: "nfcu", label: "NFCU" },
      { id: "navy_federal", label: "Navy Federal" },
      { id: "td_bank", label: "TD Bank" },
      { id: "tangerine", label: "Tangerine Bank" },
      { id: "rbc", label: "Royal Bank of Canada" },
      { id: "bmo", label: "Bank of Montreal" },
      { id: "bns", label: "Bank of Nova Scotia" },
      { id: "hsbc_canada", label: "HSBC Bank" },
      { id: "nbc", label: "National Bank of Canada" },
      { id: "td_canada", label: "TD Canada Trust Bank" },
      { id: "cc_cvv", label: "CC & CVV" },
      { id: "stealth_accounts", label: "Stealth Accounts" },
      { id: "fullz", label: "Fullz" },
      { id: "tools", label: "Tools" },
      { id: "e_gift_cards", label: "E-Gift Cards" },
      { id: "clones", label: "Clones" },
      { id: "carded_products", label: "Carded Products" },
      { id: "cashapp", label: "CashApp li" },
      { id: "paypal", label: "PayPal li" },
      { id: "cl", label: "Cashapp" },
      { id: "pp", label: "Paypal" },
      { id: "applepay", label: "Apple Pay" },
      { id: "venmo", label: "Venmo" },
      { id: "gpay", label: "Google Pay" },
      { id: "cc", label: "CC & CVV" },
      { id: "stealth", label: "Stealth Accounts" },
      { id: "full", label: "Fullz" },
      { id: "tool", label: "Tools" },
      { id: "e_gift_card", label: "E-Gift Cards" },
      { id: "clone", label: "Clones" },
      { id: "carded_product", label: "Carded Products" },
      { id: "cashappl", label: "CashApp Logs" },
      { id: "paypall", label: "PayPal Logs" },
    ],
  }
  ,
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Balance",
    name: "balance",
    componentType: "input",
    type: "number",
    placeholder: "Enter Balalnce",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "shop",
    label: "Shop",
    path: "/shop/listing",
    dropdown: [
      { id: "usa_banks", label: "USA Banks", path: "/shop/listing?category=usa_banks" },
      { id: "uk_banks", label: "UK Banks", path: "/shop/listing?category=uk_banks" },
      { id: "canada_banks", label: "Canada Banks", path: "/shop/listing?category=canada_banks" },
      { id: "cc_cvv", label: "CC & CVV", path: "/shop/listing?category=cc_cvv" },
      { id: "stealth_accounts", label: "Stealth Accounts", path: "/shop/listing?category=stealth_accounts" },
  
      { id: "tools", label: "Tools", path: "/shop/listing?category=toolss" },
      { id: "e_gift_cards", label: "E-Gift Cards", path: "/shop/listing?category=e_gift_cards" },
     
      { id: "carded_products", label: "Carded Products", path: "/shop/listing?category=carded_products" },
      { id: "cashapp", label: "CashApp", path: "/shop/listing?category=cashapp" },
      { id: "paypal", label: "PayPal", path: "/shop/listing?category=paypal" },
      { id: "dumps", label: "Dumps", path: "/shop/listing?category=dumps" }
    ],
  },
  {
    id: "linkable Debits",
    label: "Linkables",
    path: "/shop/linkables",
    dropdown: [
      { id: "cl", label: "Cashapp", path: "/shop/listing?category=cashapp-linkables" },
      { id: "pp", label: "Paypal", path: "/shop/listing?category=paypal-linkabes" },
      { id: "venmo", label: "Venmo", path: "/shop/listing?category=venmo" },
      { id: "applepay", label: "ApplePay", path: "/shop/listing?category=apple-pay" },
      { id: "gpay", label: "GooglePay", path: "/shop/listing?category=google-pay" },
    ],
  },
  {
    id: "about",
    label: "About",
    path: "/shop/about",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  usa_banks: "USA Banks",
  uk_banks: "UK Banks",
  canada_banks: "Canada Banks",
  cc_cvv: "CC & CVV",
  stealth_accountss: "Stealth Accounts",
  fullzz: "Fullz",
  toolss: "Tools",
  e_gift_cardss: "E-Gift Cards",
  cloness: "Clones",
  carded_productss: "Carded Products",
  cashapp: "CashApp Logs",
  paypal: "PayPal Logs",
  clm: "Cashapp li",
  ppm: "Paypal li",
  applepaym: "Apple Pay",
  venmom: "Venmo",
  gpaym: "Google Pay"
};

export const brandOptionsMap = {
  lloyds: "Lloyds Banking Group",
  barclays: "Barclays Bank",
  rbs: "Royal Bank of Scotland",
  standard_chartered: "Standard Chartered Bank",
  schroders: "Schroders Bank",
  bank_of_america: "Bank of America",
  chase: "Chase",
  citi_bank: "Citi Bank",
  huntington: "Huntington",
  discover_bank: "Discover Bank",
  greendot_bank: "Greendot Bank",
  citizen: "Citizen",
  usaa: "USAA",
  chime: "Chime",
  woodforest: "Woodforest",
  nfcu: "NFCU",
  navy_federal: "Navy Federal",
  td_bank: "TD Bank",
  tangerine: "Tangerine Bank",
  rbc: "Royal Bank of Canada",
  bmo: "Bank of Montreal",
  bns: "Bank of Nova Scotia",
  hsbc_canada: "HSBC Bank",
  nbc: "National Bank of Canada",
  td_canada: "TD Canada Trust Bank",
  cc_cvv: "CC & CVV",
  stealth_accounts: "Stealth Accounts",
  fullz: "Fullz",
  tools: "Tools",
  e_gift_cards: "E-Gift Cards",
  clones: "Clones",
  carded_products: "Carded Products",
  cashapp: "CashApp li",
  paypal: "PayPal li",
  cl: "Cashapp",
  pp: "Paypal",
  applepay: "Apple Pay",
  venmo: "Venmo",
  gpay: "Google Pay",
  cc: "CC & CVV",
  stealth: "Stealth Accounts",
  full: "Fullz",
  tool: "Tools",
  e_gift_card: "E-Gift Cards",
  clone: "Clones",
  carded_product: "Carded Products",
  cashappl: "CashApp Logs",
  paypall: "PayPal Logs"
}
;

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
