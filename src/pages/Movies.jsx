import CustomNavbar from "../components/layout/CustomNavbar";
import Footer from "../components/layout/Footer";
import ContenidoMubis from "../components/mubis/ContenidoMubis";

export default function Movies() {
  return (
    <div className="flex flex-col">
      <CustomNavbar />
      <ContenidoMubis />
      <Footer />
    </div>
  );
}
