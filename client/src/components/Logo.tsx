import "./Logo.css";

import logoWeArt from "../assets/images/Logo.png";

function Logo() {
  return (
    <div className="logoWeArt">
      <a href="/">
        <img src={logoWeArt} alt="WeArt Logo" />
      </a>
    </div>
  );
}

export default Logo;
