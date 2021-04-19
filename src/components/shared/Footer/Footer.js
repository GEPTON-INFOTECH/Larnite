import {Link} from 'react-router-dom';
import '../Footer/Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <footer>
            <Link to="/about" className="footer-link">ABOUT</Link>
            <Link to="/contact" className="footer-link">CONTACT</Link>
            <Link to="/pricing" className="footer-link">PRICING</Link>
            <Link to="/privacy" className="footer-link">PRIVACY</Link>
            <Link to="/terms" className="footer-link">TERMS</Link>
            <Link to="/refund" className="footer-link">REFUND</Link>
        </footer>
        </div>
    );
}
 
export default Footer;