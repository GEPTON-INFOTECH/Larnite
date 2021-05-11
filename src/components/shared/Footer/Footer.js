import { Link } from "react-router-dom";
import "../Footer/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <Link to="/about" className="footer-link">
          ABOUT
        </Link>
        <Link to="/contact" className="footer-link">
          CONTACT
        </Link>
        <Link to="/privacy" className="footer-link">
          PRIVACY
        </Link>
        <Link to="/terms" className="footer-link">
          TERMS
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
