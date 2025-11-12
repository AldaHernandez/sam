import { Link } from "@mui/material";

export default function Footer() {
  return (
    <div className="w-full h-14 bg-[#1C2321] flex items-center justify-center">
      <p className="text-slate-100 text-center">
        hecho con <span className="inline-flex animate-bounce">❤️</span> por{" "}
        {""}
        <Link
          className="pr-1"
          target="_blank"
          href="https://github.com/AldaHernandez"
        >
          Alda
        </Link>
        (●'◡'●)
      </p>
    </div>
  );
}
