import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { path } from "framer-motion/client";
import { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";

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
    { name: "inicio", path: "/#top" },
    { name: "nosotros", path: "/#nosotros" },
    { name: "musica", path: "/#" },
    { name: "peliculas", path: "/peliculas" },
    { name: "por visitar", path: "/lugares" },
  ];

  return (
    <Navbar
      // className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
      className={`[&>header]:justify-center items-center fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#EAEBD0/80]" : "bg-white/10 backdrop-blur-sm"
      }`}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Menú Móvil */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              to={item.path}
              size="lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      {/* Menú Desktop */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.path}>
            <Link to={item.path} smooth>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
