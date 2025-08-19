import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "inicio",
    "nosotros",
    "música",
    "películas",
    "por visitar",
  ];

  return (
    <Navbar
      // className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
      className={`[&>header]:justify-center items-center fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#EAEBD0/80]" : "bg-white/10 backdrop-blur-sm"
      }`}
      // className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      //   scrolled ? "bg-[#EAEBD0/80]" : "bg-white/10 backdrop-blur-sm"
      // }`}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
  );
}
