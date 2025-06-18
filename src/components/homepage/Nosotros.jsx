import { Card, CardBody, CardHeader } from "@heroui/react";

export default function Nosotros() {
  return (
    <div id="nosotros" className="h-[100vh] flex justify-center bg-background">
      <Card className="bg-secondary w-[80vw] h-[90%] p-6 m-6">
        {/* <CardHeader>
          <b>¿Quién diría que decidiendo de última hora ir a una peda de Halloween me haría conocer a mi persona favorita?</b>
        </CardHeader> */}
        <CardBody className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex flex-col w-full md:w-1/2 gap-4">
            <h3 className="text-2xl">
              <b>
                ¿Quién diría que decidiendo de última hora ir a una fiesta de
                Halloween vestido como "el Vítor" me haría conocer a mi persona
                favorita?
              </b>
            </h3>
            <p className="text-justify">
              No encuentro las palabras suficientes para expresar todo lo que
              has hecho en mí en estos últimos meses, por lo que, decidí plasmar
              un poco de nosotros en esta página (:
            </p>
            <h2>Te amo muchísimo🖤</h2>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="../../src/assets/nosotros.jpg"
              alt="nosotres"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
