import CustomNavbar from "../components/layout/CustomNavbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/homepage/Hero";
import Nosotros from "../components/homepage/Nosotros";
import CustomTimeline from "../components/homepage/CustomTimeline";
import CuentaRegresiva from "../components/homepage/CuentaRegresiva";

export default function Home() {
  return (
    <div className="flex flex-col mih-h-screen">
      <CustomNavbar />
      <Hero />
      <Nosotros />
      <CuentaRegresiva />
      {/* añadir countdown hacia fecha importante aquí */}
      <CustomTimeline />
      <Footer />
    </div>
  );
}
