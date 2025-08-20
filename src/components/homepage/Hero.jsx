import Lottie from "lottie-react";
import animationData from "../../assets/sparkles.json";
import { ChevronsDown } from "lucide-react";

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
        <div className="flex flex-col justify-center items-center gap-16 relative z-10 h-3/4 ">
          {/* La frase se puede cambiar por otra */}
          <h2 className="w-[80vw] text-center font-lora text-4xl/[1.2] sm:text-5xl/[1.2] text-black italic">
            "You make my days bright as the sun,{" "}
            <span className="text-primary underline">
              each moment with you I adore
            </span>
            ..."
          </h2>
          <a className="contents" href="#nosotros">
            <ChevronsDown className="animate-bounce w-12 h-12 md:w-16 md:h-16" />
          </a>
        </div>
        {/* Poner animación de mano o flecha hacia abajo */}
      </section>
    </>
  );
}
