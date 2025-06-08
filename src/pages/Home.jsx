import { Card, CardBody } from "@heroui/react";
import CustomNavbar from "../components/layout/CustomNavbar";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col mih-h-screen">
      <CustomNavbar />
      <section className="h-[90vh] bg-[#E7EFC7] flex items-center justify-center px-6">
        {/* La frase se puede cambiar por otra */}
        <h2 className="w-[80vw] font-lora text-6xl text-justify italic">
          "You make my days bright as the sun, each moment with you I adore..."
        </h2>
      </section>
      <section className="flex-1 bg-[#AEC8A4] px-6 py-10">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Nuestra historia
        </h2>
        <p className="text-center text-gray-600"></p>
      </section>
      <Footer />
    </div>
  );
}
