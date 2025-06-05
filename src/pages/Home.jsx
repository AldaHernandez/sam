import { Card, CardBody } from "@heroui/react";
import CustomNavbar from "../components/layout/CustomNavbar";

export default function Home() {
  return (
    <>
      <CustomNavbar />
      <div className="h-90vh flex items-center justify-center p-6">
        <Card className="bg-blue-500">
          <CardBody>
            <p className="text-4xl text-white text-justify italic">
              "You make my days bright as the sun, each moment with you I
              adore..."
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
