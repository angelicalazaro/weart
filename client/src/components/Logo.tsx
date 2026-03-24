import "./Logo.css";
import logoWeArt from "../assets/images/Logo.png";

function Logo() {
  return (
    <div className="logoWeArt">
      <img src={logoWeArt} alt="WeArt Logo" />
    </div>
  );
}

export default Logo;
