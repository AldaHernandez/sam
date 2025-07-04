import { Card, CardBody, CardHeader } from "@heroui/react";

export default function Nosotros() {
  return (
    <div
      id="nosotros"
      className="min-h-screen flex items-center justify-center bg-background px-4 py-8"
    >
      <Card
        isBlurred
        className="bg-secondary w-full max-w-5xl max-h[90vh] md:max-h-[80vh] overflow-y-auto p-6 rounded-2xl shadow-lg"
      >
        <CardBody className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex flex-col w-full md:w-1/2 gap-4">
            <h3 className="text-xl md:text-2xl font-bold">
              ¿Quién diría que decidiendo de última hora ir a una fiesta de
              Halloween vestido como "el Vítor" me haría conocer a mi persona
              favorita?
            </h3>
            <p className="text-justify text-base md:text-lg leading-relaxed">
              No encuentro las palabras suficientes para expresar todo lo que
              has hecho en mí en estos últimos meses, por lo que, decidí plasmar
              un poco de nosotros en esta página (:
            </p>
            <h2 className="text-lg md:text-xl font-semibold">
              Te amo muchísimo🖤
            </h2>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="../../src/assets/nosotres.jpg"
              alt="nosotres"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
