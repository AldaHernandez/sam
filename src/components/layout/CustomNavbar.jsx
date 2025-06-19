import { Navbar, NavbarContent, NavbarItem } from "@heroui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CustomNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="">
      <Navbar
        // className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
        className={`items-center fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-[#EAEBD0/80]" : "bg-white/10 backdrop-blur-sm"
        }`}
      >
        <NavbarContent className="items-center justify-center! text-[20px]">
          <NavbarItem>
            <Link to="/">inicio</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="#nosotros">nosotros</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="#">música</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/peliculas">películas</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/lugares">por visitar</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
