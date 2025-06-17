import Lottie from "lottie-react";
import animationData from "../../assets/sparkles.json";

export default function Hero() {
  return (
    <>
      <section className="relative h-[100vh] bg-background gap-10 flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          {/* La frase se puede cambiar por otra */}
          <h2 className="w-[80vw] text-center font-lora text-7xl/[1.2] text-black italic">
            "You make my days bright as the sun,{" "}
            <span className="text-primary underline">
              each moment with you I adore
            </span>
            ..."
          </h2>
        </div>
        {/* Poner animación de mano o flecha hacia abajo */}
      </section>
    </>
  );
}
