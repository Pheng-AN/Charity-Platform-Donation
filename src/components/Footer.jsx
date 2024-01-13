import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faGem,
  faHome,
  faEnvelope,
  faPhone,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div>
      <footer className="bg-light text-center text-lg-start text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="/" className="me-4 text-reset">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="/" className="me-4 text-reset">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="/" className="me-4 text-reset">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="/" className="me-4 text-reset">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="/" className="me-4 text-reset">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="/" className="me-4 text-reset">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </section>

        <section className="">
          <Container className="text-center text-md-start mt-5">
            <Row className="mt-3">
              <Col md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <FontAwesomeIcon icon={faGem} className="me-3" />
                  KhmerDonor&nbsp;<i class="fa-solid fa-heart-circle-check"></i>
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </Col>

              <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="/" className="text-reset">
                    Angular
                  </a>
                </p>
                <p>
                  <a href="/" className="text-reset">
                    React
                  </a>
                </p>
                <p>
                  <a href="/" className="text-reset">
                    Vue
                  </a>
                </p>
                <p>
                  <a href="/" className="text-reset">
                    Laravel
                  </a>
                </p>
              </Col>

              <Col md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="/" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="/" className="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="/" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="/" className="text-reset">
                    Help
                  </a>
                </p>
              </Col>

              <Col md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  {/* before me-2 */}
                  <FontAwesomeIcon icon={faHome} className="me-3" />
                  Siem Reap, Cambodia
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                  info@example.com
                </p>
                <p>
                  <FontAwesomeIcon icon={faPhone} className="me-3" /> + 01 234
                  567 88
                </p>
                <p>
                  <FontAwesomeIcon icon={faPrint} className="me-3" /> + 01 234
                  567 89
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            Team13
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
