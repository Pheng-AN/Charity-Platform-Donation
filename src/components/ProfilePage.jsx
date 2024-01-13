import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Breadcrumb,
  ProgressBar,
  ListGroup,
  Modal,
  Table,
  Form,
} from "react-bootstrap";

import { supabase } from "../supabase/client";

export default function ProfilePage({ token }) {
  const [showModal, setShowModal] = useState(false);

  //Ask for confirmation
  const handleClose = () => {
    // Check if there are unsaved changes (you are editing)
    if (editingCampaignId !== null) {
      const isConfirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to close the modal?"
      );

      if (!isConfirmed) {
        // If the user cancels, do not close the modal
        return;
      }
    }

    // If no unsaved changes or user confirmed, close the modal
    setShowModal(false);
    // Optionally, reset editing state here if needed
    setEditingCampaignId(null);
  };
  const handleShow = () => setShowModal(true);

  //For fetching the data of profile from supabse
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!token || !token.user || !token.user.id) {
          // Ensure the token and user information are available
          return;
        }

        // Assuming 'profiles' is the name of your table in Supabase
        const { data, error } = await supabase
          .from("profiles")
          .select(
            "display_name, email, rank, profile_image_url, origin, paymentQR_link"
          )
          .eq("id", token.user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchProfileData();
  }, [token]);

  const username = profileData?.username;
  const rank = profileData?.rank;
  const email = profileData?.email;
  const imageUrl = profileData?.profile_image_url;

  // Assuming 'Admin' is the value you want to check against
  const isAdmin = rank === "Admin";

  //For the table for admins
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaignId, setEditingCampaignId] = useState(null);
  const [updatedDuration, setUpdatedDuration] = useState("");

  // Fetch the data
  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from("normal_campaigns") // Replace with your actual table name
        .select("*");

      if (error) {
        console.error("Error fetching campaigns:", error.message);
      } else {
        setCampaigns(data);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error.message);
    }
  };

  useEffect(() => {
    // Fetch campaigns from Supabase when the component mounts
    fetchCampaigns();
  }, []); // Empty dependency array to fetch campaigns only once on mount

  //Use to update cmapaigns
  const handleUpdateDuration = (campaignId) => {
    setEditingCampaignId(campaignId);
    const campaignToUpdate = campaigns.find(
      (campaign) => campaign.id === campaignId
    );
    setUpdatedDuration(campaignToUpdate.normal_campaign_duration);
  };
  // Update the duration
  const handleSaveDuration = async () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to save the updated duration?"
    );

    if (isConfirmed) {
      try {
        await supabase
          .from("normal_campaigns") // Replace with your actual table name
          .update({
            normal_campaign_duration: updatedDuration,
          })
          .eq("id", editingCampaignId);

        // Reset the editing state
        setEditingCampaignId(null);

        // Automatically fetch updated data after a successful update
        fetchCampaigns();

        // Log success message to the console
        console.log("Campaign duration updated successfully!");
      } catch (error) {
        console.error("Error updating campaign duration:", error.message);
      }
    }
  };

  //For handling Accept or Reject the campaigns
  const handleDecision = async (campaignId, decision) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to ${
        decision === "confirm" ? "confirm" : "reject"
      } this campaign?`
    );

    if (!isConfirmed) {
      // If the user cancels, do not proceed with the decision
      return;
    }

    try {
      // Update normal_campaign_approval based on the decision
      const updatedApproval = decision === "confirm";

      await supabase
        .from("normal_campaigns")
        .update({
          normal_campaign_approval: updatedApproval,
        })
        .eq("id", campaignId);

      // Automatically fetch updated data after a successful update
      fetchCampaigns();

      // Log success message to the console
      console.log(`Campaign ${decision}ed successfully!`);
    } catch (error) {
      console.error(`Error ${decision}ing campaign:`, error.message);
    }
  };

  //Payment QR related
  // State for Payment QR Link
  const [paymentQRLink, setPaymentQRLink] = useState("");

  // ... (existing code)

  // Handle Save Function with Confirmation Alert for Changing paymentQR_link
  const handleSave = () => {
    const confirmSave = window.confirm(
      `Are you sure you want to save / override the Payment QR link?
  Your action might lead to disastrous consequences!!`
    );

    if (confirmSave) {
      savePaymentQRLink();
    } else {
      // Set paymentQRLink to an empty string to show the placeholder
      setPaymentQRLink("");
    }
  };

  const savePaymentQRLink = async () => {
    try {
      if (!token || !token.user || !token.user.id) {
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({ paymentQR_link: paymentQRLink })
        .eq("id", token.user.id);

      if (error) {
        throw error;
      }

      console.log("Payment QR link saved successfully!");
    } catch (error) {
      console.error("Error saving payment QR link:", error.message);
    }
  };

  return (
    <div>
      <section style={{ backgroundColor: "#eee" }}>
        <Container className="py-5">
          <Row>
            <Col lg="4">
              <Card className="mb-4">
                <Card.Body className="text-center">
                  <Card.Img
                    src={imageUrl}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                  <p className="text-muted mb-1">{profileData?.username}</p>
                  <p className="text-muted mb-1">{rank}</p>
                  <p className="text-muted mb-4">{profileData?.origin}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <Button>Follow</Button>
                    <Button variant="outline" className="ms-1">
                      Message
                    </Button>

                    <div>
                      {isAdmin && (
                        <Button
                          variant="outline"
                          className="ms-1"
                          onClick={handleShow}
                        >
                          Campaign_Permissions
                        </Button>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Modal show={showModal} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                  <Modal.Title>Campaign Permissions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>CampaignName</th>
                        <th>Amount</th>
                        <th>Duration</th>
                        <th>Approval</th>
                        <th>Decision</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign) => (
                        <tr key={campaign.id}>
                          <td>{campaign.id}</td>
                          <td>{campaign.fundraiser}</td>
                          <td>{campaign?.normal_campaign_name}</td>
                          <td>{campaign.normal_campaign_total_donation}</td>
                          {editingCampaignId === campaign.id ? (
                            <td>
                              <input
                                type="text"
                                value={updatedDuration}
                                onChange={(e) =>
                                  setUpdatedDuration(e.target.value)
                                }
                              />
                              <Button
                                variant="success"
                                onClick={handleSaveDuration}
                              >
                                Save
                              </Button>
                            </td>
                          ) : (
                            <td>{campaign.normal_campaign_duration}</td>
                          )}
                          <td>{campaign.normal_campaign_approval}</td>
                          <td>
                            <Button
                              className="mr-2 mb-2"
                              variant="success"
                              onClick={() =>
                                handleDecision(campaign.id, "confirm")
                              }
                            >
                              Confirm
                            </Button>{" "}
                            <Button
                              className="mr-2 mb-2"
                              variant="danger"
                              onClick={() =>
                                handleDecision(campaign.id, "reject")
                              }
                            >
                              Reject
                            </Button>{" "}
                            <Button
                              className="mr-2 mb-2"
                              variant="info"
                              onClick={() => handleUpdateDuration(campaign.id)}
                            >
                              Update Duration
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Modal.Body>
              </Modal>
              {/* <Card className="mb-4 mb-lg-0">
              <Card.Body className="p-0">
                <ListGroup variant="flush" className="rounded-3">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <Card.Text>https://mdbootstrap.com</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <i
                      className="fab fa-github fa-lg"
                      style={{ color: "#333333" }}
                    ></i>
                    <Card.Text>mdbootstrap</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <i
                      className="fab fa-twitter fa-lg"
                      style={{ color: "#55acee" }}
                    ></i>
                    <Card.Text>@mdbootstrap</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <i
                      className="fab fa-instagram fa-lg"
                      style={{ color: "#ac2bac" }}
                    ></i>
                    <Card.Text>mdbootstrap</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <i
                      className="fab fa-facebook fa-lg"
                      style={{ color: "#3b5998" }}
                    ></i>
                    <Card.Text>mdbootstrap</Card.Text>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card> */}
            </Col>
            <Col lg="8">
              <Card className="mb-4">
                <Card.Body>
                  <Row>
                    <Col sm="3">
                      <Card.Text>Username</Card.Text>
                    </Col>
                    <Col sm="9">
                      <Card.Text className="text-muted">
                        {profileData?.display_name}
                      </Card.Text>
                    </Col>
                  </Row>
                  <hr />
                  {/* Continue with the rest of the profile information */}
                  <Row>
                    <Col sm="3">
                      <Card.Text>Email</Card.Text>
                    </Col>
                    <Col sm="9">
                      <Card.Text className="text-muted">{email}</Card.Text>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="3">
                      <Card.Text>Full Name</Card.Text>
                    </Col>
                    <Col sm="9">
                      <Card.Text className="text-muted">KUnknw</Card.Text>
                    </Col>
                  </Row>
                  <hr />
                  {/* ammount of donation campaigns */}
                  <Row>
                    <Col sm="3">
                      <Card.Text>Donation Campaigns</Card.Text>
                    </Col>
                    <Col sm="9">
                      <Card.Text className="text-muted">0</Card.Text>
                    </Col>
                  </Row>
                  <hr />
                  {/* PaymentQR */}
                  <Row>
                    <Col sm="3">
                      <Card.Text>Payment QR</Card.Text>
                    </Col>
                    <Col sm="6">
                      <Form.Control
                        type="text"
                        placeholder={profileData?.paymentQR_link}
                        value={paymentQRLink}
                        onChange={(e) => setPaymentQRLink(e.target.value)}
                      />
                    </Col>
                    <Col sm="3">
                      <Button variant="primary" onClick={handleSave}>
                        Save
                      </Button>
                    </Col>
                  </Row>
                  <hr />
                  {/* Continue with the rest of the profile information */}
                </Card.Body>
              </Card>

              {/* Continue with the rest of the content */}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
