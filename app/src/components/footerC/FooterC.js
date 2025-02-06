import React from 'react';
import "./footer.css"

const FooterC = () => {
    return (
        <footer className="footerContainer">
                <div className="footerSection aboutUs">
                    <h2>A propos de nous</h2>
                    <ul className="footerLinks">
                        <li><p>Confidentialité</p></li>
                        <li><p>FAQ</p></li>
                    </ul>
                </div>
                <div className="footerSection legal">
                    <h2>Informations légales</h2>
                    <ul className="footerLinks">
                        <li><p>Mentions légales</p></li>
                        <li><p>Conditions générales</p></li>
                    </ul>
                </div>
                <div className="footerSection questions">
                    <h2 className="highlighted">Des questions ?</h2>
                    <p>Contactez-nous à : <a href="mailto:support@example.com">support@example.com</a></p>
                </div>
            </footer>
    );
};

export default FooterC;