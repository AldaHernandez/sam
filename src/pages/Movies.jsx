import CustomNavbar from "../components/layout/CustomNavbar";
import ContenidoMubis from "../components/mubis/ContenidoMubis";

export default function Movies() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      <ContenidoMubis />
    </div>
  );
}
