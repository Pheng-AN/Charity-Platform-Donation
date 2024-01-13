import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import { supabase } from "../supabase/client";

const NormalCharityCard = ({ campaign }) => {
  // const originalText =
  //   "Some quick example text to build on the card title and make up the bulk of the card's content. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis excepturi vero praesentium id placeat perferendis ullam perspiciatis, aspernatur ex veniam minus, suscipit voluptatum magnam tempora necessitatibus quo. Optio, suscipit at fugiat omnis ut a ipsa nesciunt, aliquam dolorum tempora reiciendis alias perspiciatis quos recusandae nisi porro. Maxime placeat doloremque rem.";

  const originalText = campaign.normal_campaign_text;
  const words = originalText.split(" ");
  const limitedText = words.slice(0, 15).join(" ");

  // const fullscreenValue = true;
  // const [fullscreen, setFullscreen] = useState(fullscreenValue);
  // const [show, setShow] = useState(false);
  const currentAmount = campaign.normal_campaign_current_donation; // Replace with the actual current donation amount

  const totalAmount = campaign.total_campaign_donation;
  // function handleShow() {
  //   setFullscreen(fullscreenValue);
  //   setShow(true);
  // }

  const [show, setShow] = useState(false);
  function handleShow() {
    setShow(true);
  }

  const campaignName = campaign.normal_campaign_name;
  const campaignCategory = campaign.normal_campagin_category;
  const campaignImageURL = campaign.normal_campaign_image_url;
  const fundraiser = campaign.fundraiser;

  //Click on the donation button
  const [donationLink, setDonationLink] = useState("");

  useEffect(() => {
    const fetchDonationLink = async () => {
      // Replace 'your_table_name' with the actual table name in your Supabase database
      const tableName = "profiles";

      // Query the Supabase database to get the paymentQR_link based on display_name and campaign.fundraiser
      const { data, error } = await supabase
        .from(tableName)
        .select("paymentQR_link")
        .eq("display_name", fundraiser) // Assuming display_name is the same as fundraiser
        .single();

      if (error) {
        console.error("Error fetching data from Supabase:", error.message);
        return;
      }

      if (data) {
        setDonationLink(data.paymentQR_link);
      }
    };

    fetchDonationLink();
  }, []);

  const handleButtonClick = () => {
    // Show a confirmation alert before opening the new tab
    const isConfirmed = window.confirm("Are you sure you want to donate?");

    if (isConfirmed) {
      window.open(donationLink, "_blank");
    }
  };

  return (
    <div>
      {/* <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="..." alt="..." />
        <Card.Body>
          <Card.Title>{featureCampaign.feature_campaign_name}</Card.Title>
          <Card.Text>
            {limitedText}
            {words.length > 15 && (
              <span style={{ color: "green" }}> ...see more</span>
            )}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card> */}

      <Card
        style={{
          width: "18rem",
          height: "27rem",
          position: "relative",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "rgba(144, 238, 144, 0.7)",
            padding: "5px",
            borderRadius: "5px",
            color: "black",
          }}
        >
          {campaign.normal_campaign_category}
        </div>
        <Card.Img
          variant="top"
          src={campaignImageURL}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{campaignName}</Card.Title>
          <Card.Text>
            {limitedText}
            {words.length > 15 && (
              <span style={{ color: "green" }}> ...see more</span>
            )}
          </Card.Text>
          {/* For donation */}
          <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
            <Button
              variant="primary"
              onClick={handleButtonClick}
              disabled={!donationLink}
            >
              Donate Now!
            </Button>
          </div>
          {/* Learn more about the donation */}
          <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
            <Button variant="secondary" onClick={handleShow}>
              Learn More
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} size="lg" onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{campaignName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ position: "relative" }}>
            <img
              src={campaignImageURL}
              alt="Image Alt Text"
              style={{
                // display: "block",
                // margin: "auto",
                // maxWidth: "100%",
                // height: "auto",
                // borderRadius: "10px", // Set the border radius here

                display: "block",
                margin: "auto",
                width: "300px", // Set the desired width here
                height: "200px", // Set the desired height here
                objectFit: "cover", // Optional: maintain aspect ratio and cover the container
                borderRadius: "10px",
              }}
            />

            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: "14px",
                background: "rgba(144, 238, 144, 0.7)",
                padding: "5px",
                borderRadius: "5px",
                color: "black",
              }}
            >
              {campaign.normal_campaign_category}
            </div>
          </div>

          <Card
            style={{ width: "100%", marginTop: "20px", textAlign: "center" }}
          >
            <Card.Body>
              <Card.Title style={{ marginBottom: "10px", fontSize: "18px" }}>
                Fundraiser: <span>{fundraiser}</span>
              </Card.Title>
            </Card.Body>
          </Card>

          <Card
            style={{ width: "100%", marginTop: "20px", textAlign: "center" }}
          >
            <Card.Body>
              <Card.Title>Additional Information</Card.Title>
              <p>{originalText}</p>
            </Card.Body>
          </Card>

          <Card
            style={{ width: "100%", marginTop: "20px", textAlign: "center" }}
          >
            <Card.Body>
              <Card.Title>Current Amount of Donation</Card.Title>
              <ProgressBar
                animated
                now={(currentAmount / totalAmount) * 100}
                label={`${currentAmount} / ${totalAmount}`}
              />
              <Button
                variant="primary"
                style={{ marginTop: "10px" }}
                onClick={handleButtonClick}
                disabled={!donationLink}
              >
                Donate Now
              </Button>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NormalCharityCard;
