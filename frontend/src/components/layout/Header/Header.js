import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../Header/logo.png";

const options = {
  burgerColorHover: "red",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Search",
  link3Text: "Samsung Store",
  link4Text: "Instagram Handle",
  link1Url: "/",
  link2Url: "/search",
  link3Url: "https://www.samsung.com/in/smartphones/galaxy-s24-ultra/buy/?cid=in_pd_ppc_google_im-all-all-all-dtc_sales_samsung-allproducts-all-2023_eshop-text-search_01jan2023-na_1ur-501322l-2024-eshop-bau-search-cpc_pfm-688104537051-12512103039-127630421468-kwd-10020211-samsung-b--g--&gad_source=1&gclid=Cj0KCQjwncWvBhD_ARIsAEb2HW_E3cgUuadYLF-KLHGGPqSxHaXccmn9qcvUPgw2mLGV-d3BcyvEodAaAtF5EALw_wcB",
  link4Url: "https://www.instagram.com/",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  nav5justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return (
    <div className="entire-page" style={{ backgroundColor: "blue" }}>
      {/* Wrap ReactNavbar in a div and apply background color style */}
      <div style={{ backgroundColor: "white" }}>
        <ReactNavbar {...options} />
      </div>
    </div>
  );
};

export default Header;



// Option 1:

// The ReactNavbar component provides a pre-styled navigation bar with options for customization.
// It might be more suitable if you prefer a ready-made solution and want a specific visual style for your navigation.
// Option 2:

// Manually creating links with "react-router-dom" gives you more control over the structure and style of your navigation.
// It's suitable if you want a custom layout or if you have specific styling requirements.