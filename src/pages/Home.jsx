import { Card, CardBody } from "@heroui/react";
import CustomNavbar from "../components/layout/CustomNavbar";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col mih-h-screen">
      <CustomNavbar />
      <section className="h-[90vh] flex items-center justify-center px-6">
        <Card className="bg-blue-500 max-w-3xl w-full h-64 shadow-lg">
          <CardBody className="flex justify-center">
            <p className="text-4xl text-white text-justify italic">
              "You make my days bright as the sun, each moment with you I
              adore..."
            </p>
          </CardBody>
        </Card>
      </section>
      <section className="flex-1 bg-white px-6 py-10">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Nuestra historia
        </h2>
        <p className="text-center text-gray-600"></p>
      </section>
      <Footer />
    </div>
  );
}
