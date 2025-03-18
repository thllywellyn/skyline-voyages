import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const quick__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* Logo and Description Section */}
          <Col className="col">
            <div className="logo">
              <h2>
                Skyline Voyages
                <span className="description">
                  <br />
                  Experience the joy of exploring the world with Skyline Voyages.
                  From breathtaking adventures to serene retreats, your perfect
                  journey awaits.
                </span>
              </h2>
            </div>
          </Col>

          {/* Discover Links */}
          <Col className="col">
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {quick__links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          {/* Contact Information */}
          <Col className="col">
            <h5 className="footer__link-title">Contact</h5>
            <div className="contact-item">
              <h6>
                <i className="ri-map-pin-line"></i> Address:
              </h6>
              <p>123 Skyline Avenue, Wanderlust City</p>
            </div>
            <div className="contact-item">
              <h6>
                <i className="ri-mail-line"></i> Email:
              </h6>
              <p>contact@skylinevoyages.com</p>
            </div>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row>
          <Col className="text-center pt-4">
            <p className="copyright">
              © {year} Skyline Voyages. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
