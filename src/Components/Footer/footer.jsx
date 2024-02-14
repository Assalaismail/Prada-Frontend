import React from "react";
import '../Footer/footer.css';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function Footer() {
return (
<footer>
    <main className="footer-main">
        <section className="column">
            <h5 className="footer-title">Subscribe to newsletter</h5>
            <ul className="footer-ul">
                <div className="email-arrow">
                    <input type="email" id="email" name="email" placeholder="Email *" required
                        className="footer-email" />
                    <FaArrowRight className="arrow-icon" />
                </div>
                <p className="privacy-policy">I have read and understood <span className="privacy-policy-span" ><Link to="/privacy-policy">Kyveli's privacy policy </Link></span>and i agree to receive the newsletter and other marketting communication.</p>
            </ul>
        </section>

        <section className="column">
            <h5 className="footer-title">Do you need help?</h5>
            <ul className="footer-ul">
                <li className="footer-li"><a href="/">Call us +961 70522333 </a></li>
                <li className="footer-li"><a href="/">KYVELI S.a.r.l. Sin el Fil, Horsh Tabet, Center ST. Georges, Beirut </a></li>
            </ul>
        </section>

        <section className="column">
            <h5 className="footer-title">Exclusive Services</h5>
            <ul className="footer-ul">
                <li className="footer-li"><a href="/">Work with us</a></li>
            </ul>
        </section>

        <section className="column">
            <h5 className="footer-title">Countries</h5>
            <ul className="footer-ul">
                <li className="footer-li"><a href="/">International</a></li>
                <li className="footer-li"><a href="/">Lebanon</a></li>
                <li className="footer-li"><a href="/">Jordan</a></li>
                <li className="footer-li"><a href="/">UAE</a></li>
            </ul>
        </section>

        <section className="column">
            <h5 className="footer-title">Legal terms and conditions</h5>
            <ul className="footer-ul">
                <li className="footer-li"><a href="/cookie-policy">Cookie Policy</a></li>
                <li className="footer-li"><a href="/terms-conditions">Terms & Conditions</a></li>
            </ul>
        </section>
    </main>
</footer>
);
}

export default Footer;
