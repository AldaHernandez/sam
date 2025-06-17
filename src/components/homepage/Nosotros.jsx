export default function Nosotros() {
  return (
    <>
      <section id="nosotros" className="flex-1 bg-background px-6 py-10">
        <h2 className="text-4xl text-black font-bold font-lora mb-4 text-center">
          Nuestra historia
        </h2>
      </section>
      <section className="flex flex-1 items-center gap-10 bg-gradient-to-b from-[#EAEBD0] via-[#F0D8CC] to-[#DA6C6C] px-6 py-10">
        <div className="w-1/2">
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at
            accumsan purus. Proin euismod consectetur dolor, non laoreet nunc
            pellentesque et. Mauris vitae massa eu elit pulvinar dictum a eu
            justo. Pellentesque posuere orci non ante placerat, sed viverra
            nulla pellentesque. Suspendisse lacinia tellus ut lorem consectetur,
            id efficitur nunc pharetra. Proin pretium non nunc nec bibendum.
            Phasellus in quam id ante volutpat tempor tempor at est. Etiam
            vehicula arcu eu eros consectetur ultricies. Nunc at euismod tortor.
            Donec dapibus neque nisl, et suscipit sapien mattis varius. Cras
            molestie magna ipsum, nec porttitor dolor blandit at. Praesent
            maximus efficitur neque, et maximus eros faucibus quis. Suspendisse
            ut viverra magna.
          </p>
        </div>
        <div className="w-1/2">
          <img
            src="../../src/assets/nosotros.jpg"
            alt="nosotres"
            className="rounded-xl"
          />
        </div>
      </section>
    </>
  );
}
