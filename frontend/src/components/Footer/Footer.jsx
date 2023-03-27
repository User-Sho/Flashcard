import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaRegEnvelope } from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer__container">
      <div className="footer__social">
        <a
          href="https://github.com/User-Sho"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <FaGithub />
          </div>
        </a>
        <a
          href="https://www.linkedin.com/in/sho-watanabe/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <FaLinkedin />
          </div>
        </a>

        <a
          href="https://twitter.com/CodingZamurai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <FaTwitter />
          </div>
        </a>
      </div>
      <div className="footer__contact">
        <div>
          <FaRegEnvelope />
        </div>
        <a href="mailto:coding.zamurai@gmail.com?subject=From your flashcard app - &body= Hi Sho!">
          Contact Me
        </a>
      </div>
      <div className="footer__copyright">
        <div>{`© 2022 - ${currentYear} Sean Watanabe. All Rights Reserved.`}</div>
      </div>
    </div>
  );
};
export default Footer;
