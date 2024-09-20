import React from "react";
import Logo from "./Logo";
import HeaderNav from "./HeaderNav";

const Header = () => {
  return (
    <div className="p-3 flex">
      <Logo />
      <HeaderNav />
    </div>
  );
};

export default Header;
