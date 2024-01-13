import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faHandHoldingHeart,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons"; // Import additional icon
import "./Style/About.css"

const AboutUs = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="regular-text-about">About CharityWorld</h1>
          <h2 className="about-heading-about">
            We're here to help people help each other
          </h2>

          <p className="first-paragraph-about">
            Cambodia's first crowdfunding platform! Help support local causes
            and the people you love from near and far. CharityWorld is a trusted
            and fully transparent system created to simplify making an immediate
            impact on people's lives.
          </p>

          <img src="./images/2024-01-13 11.33.28.jpg" alt="CharityWorld Image" />
          <Row>
            <div className="container-about">
              <div className="text-box-about left">
                <h1>Mission</h1>
                <p>
                  KhmerCare aims to provide an open platform for people to raise
                  funds for those most at need. KhmerCare is a not-for-profit
                  platform that prides itself on making sure 100% of funds
                  raised reaches its beneficiary.
                </p>
              </div>
              <div className="text-box-about center">
                <h1>Vision</h1>
                <p>
                  We pride ourselves on being transparent and all-inclusive on
                  our platform, giving all those in need a fair opportunity to
                  raise funds for their cause. We do this by providing a secure
                  environment that our Fundraisers can rely on to help them
                  reach their fundraising goals and guaranteeing every cent
                  raised reaches them.
                </p>
              </div>
              <div className="text-box-about right">
                <h1>Values</h1>
                <p>
                  We aim to be the most trusted fundraising platform in
                  Cambodia, with innovative design through technology
                  advancement, trusted partners, effective helpdesk and absolute
                  transparency to our users.
                </p>
              </div>
            </div>
          </Row>
          <div>
            <h2 className="block-header-about">
              Your easy, powerful, and trusted home for help.
            </h2>
            <Row className="row-card0-about">
              <Col>
                <div className="icon-text-container-about">
                  <FontAwesomeIcon
                    icon={faListCheck}
                    style={{ fontSize: "3em", color: "#000000" }}
                  />
                  <div className="text-content-about">
                    <h3>Easy</h3>
                    <p>Start fundraising in just a few steps.</p>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="icon-text-container-about">
                  <FontAwesomeIcon
                    icon={faHandHoldingHeart}
                    style={{ fontSize: "3em", color: "#000000" }}
                  />
                  <div className="text-content-about">
                    <h3>Powerful</h3>
                    <p>Connect with your community and amplify your cause.</p>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="icon-text-container-about">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    style={{ fontSize: "3em", color: "#000000" }}
                  />
                  <div className="text-content-about">
                    <h3>Trusted</h3>
                    <p>Chosen by over 100 million donors worldwide.</p>
                  </div>
                </div>
              </Col>
            </Row>

            <Button variant="success" className="button-start-fundraising-about">
              Start a GoFundMe
            </Button>
          </div>

          <Link to="/aboutus"></Link>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
