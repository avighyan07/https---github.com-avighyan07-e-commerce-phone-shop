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
  link2Text: "Login",
  link3Text:"Signup",
  link4Text: "Search", 
  link5Text: "About",
  link1Url: "/",
  link2Url: "/login",
  link3Url:"/signup",
  link4Url: "/search", 
  link5Url: "/about",
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
    <div className="entire-page">
      <ReactNavbar {...options} />
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