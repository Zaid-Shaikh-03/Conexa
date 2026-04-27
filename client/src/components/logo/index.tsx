import { Link } from "react-router-dom";
import logoPng from "../../assets/Conexa.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  url?: string;
  showText?: boolean;
  imgClass?: string;
  textClass?: string;
}

const Logo = ({
  url = "/",
  showText = true,
  imgClass = "size-[30px]",
  textClass,
}: LogoProps) => (
  <Link to={url} className="flex items-center gap-2 w-fit">
    <img src={logoPng} alt="Conexa" className={cn(imgClass)} />
    {showText && (
      <span className={cn("font-semibold text-lg leading-tight")}></span>
    )}
  </Link>
);

export default Logo;
