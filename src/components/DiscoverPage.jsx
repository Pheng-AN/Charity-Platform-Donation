import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faHospital,
  faUsers,
  faExclamationTriangle,
  faFutbol,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import "./Style/Discover.css";
import { supabase } from "../supabase/client";

import CharityCard from "./CharityCard";
import NormalCharityCard from "./NormalCharityCard";

const DiscoverPage = () => {
  const categories = [
    { icon: faGraduationCap, keyword: "Education" },
    { icon: faHospital, keyword: "Medical" },
    { icon: faUsers, keyword: "Society" },
    { icon: faExclamationTriangle, keyword: "Disaster" },
    { icon: faFutbol, keyword: "Sport" },
  ];

  const dummyData = [
    {
      cardImage: "https://www.gstatic.com/webp/gallery/1.webp",
      cardTitle: "Card 1",
      cardText: "Some text for Card 1.",
      cardCategory: "Education",
    },
    {
      cardImage: "https://www.gstatic.com/webp/gallery/1.webp",
      cardTitle: "Card 2",
      cardText: "Some text for Card 2.",
      cardCategory: "Medical",
    },
    {
      cardImage: "https://www.gstatic.com/webp/gallery/1.webp",
      cardTitle: "Card 3",
      cardText: "Some text for Card 3.",
      cardCategory: "Education",
    },
    {
      cardImage: "https://www.gstatic.com/webp/gallery/1.webp",
      cardTitle: "Card 4",
      cardText: "Some text for Card 4.",
      cardCategory: "Society",
    },
  ];

  //For Fk no reason, just fk undefined here

  // const [fetchError, setFetchError] = useState(null);
  // const [featureCampaigns, setFeatureCampaigns] = useState(null);

  // useEffect(() => {
  //   const fetchFeatureCampaigns = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from("feature_campaigns")
  //         .select();

  //       if (error) {
  //         setFetchError("Couldn't fetch the feature campaigns");
  //         setFeatureCampaigns(null);
  //         console.error(error);
  //       }

  //       if (data) {
  //         setFeatureCampaigns(data);
  //         setFetchError(null);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching feature campaigns:", error);
  //       setFetchError("Couldn't fetch the feature campaigns");
  //       setFeatureCampaigns(null);
  //     }
  //   };

  //   fetchFeatureCampaigns();
  // }, []);
  const [fetchError, setFetchError] = useState(null);
  const [featureCampaigns, setFeatureCampaigns] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("feature_campaigns").select();

      if (error) {
        setFetchError("error");
        setFeatureCampaigns(null);
        console.log(error);
      }
      if (data) {
        console.log("Fetched Data:", data);
        setFeatureCampaigns(data);
        setFetchError(null);
      }
    };
    fetchSmoothies();
  }, []);

  //fetch normal campaign data
  const [normalCampaigns, setNormalCampaigns] = useState(null);

  useEffect(() => {
    const fetchNormalCampaigns = async () => {
      const { data, error } = await supabase
        .from("normal_campaigns")
        .select("*")
        .eq("normal_campaign_approval", true); // Add this line to filter by 'normal_campaign_approval'

      if (error) {
        setFetchError("error");
        setNormalCampaigns(null);
        console.error(error);
      }
      if (data) {
        console.log("Fetched Data:", data);
        setNormalCampaigns(data);
        setFetchError(null);
      }
    };

    fetchNormalCampaigns();
  }, []);

  ////Work for smoothies
  // const [fetchError, setFetchError] = useState(null);
  // const [smoothies, setSmoothies] = useState(null);

  // useEffect(() => {
  //   const fetchSmoothies = async () => {
  //     const { data, error } = await supabase.from("feature_campaigns").select();

  //     if (error) {
  //       setFetchError("error");
  //       setSmoothies(null);
  //       console.log(error);
  //     }
  //     if (data) {
  //       console.log("Fetched Data:", data);
  //       setSmoothies(data);
  //       setFetchError(null);
  //     }
  //   };
  //   fetchSmoothies();
  // }, []);

  //// For API
  // const [data, setData] = useState({
  //   cardImage: "",
  //   cardTitle: "",
  //   cardText: "",
  // });

  // useEffect(() => {
  //   // Replace 'your-api-endpoint' with the actual API endpoint you want to fetch data from
  //   fetch("your-api-endpoint")
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setData({
  //         cardImage: result.cardImage,
  //         cardTitle: result.cardTitle,
  //         cardText: result.cardText,
  //       });
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  const backgroundImageUrl =
    "https://images.pexels.com/photos/6590920/pexels-photo-6590920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  // Selected category section
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  // const [fetchError, setFetchError] = useState(null);

  // Reference for the Selected Campaigns section
  // References for the sections
  const exploreSectionRef = useRef(null);
  const selectedSectionRef = useRef(null);

  const handleClick = async (keyword) => {
    // Check if the category is already selected
    if (selectedCategories.includes(keyword)) {
      // If selected, remove it from the selectedCategories array
      setSelectedCategories([]);
      setSelectedCampaigns([]);
    } else {
      // If not selected, deselect the previously selected category
      setSelectedCategories([keyword]);

      // Fetch campaigns based on the selected category
      try {
        const { data, error } = await supabase
          .from("normal_campaigns")
          .select("*")
          .eq("normal_campaign_approval", true)
          .eq("normal_campaign_category", keyword);

        if (error) {
          throw error;
        }

        setSelectedCampaigns(data);
      } catch (error) {
        setFetchError("Error fetching campaigns");
        console.error("Error fetching campaigns", error);
      }
    }
    // No Scroll to the Selected Campaigns section when a category is selected
  };

  // const handleClick = (keyword) => {
  //   // Check if the category is already selected
  //   if (selectedCategories.includes(keyword)) {
  //     // If selected, remove it from the selectedCategories array
  //     setSelectedCategories((prevSelected) =>
  //       prevSelected.filter((category) => category !== keyword)
  //     );
  //   } else {
  //     // If not selected, add it to the selectedCategories array
  //     setSelectedCategories((prevSelected) => [...prevSelected, keyword]);
  //   }
  // };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  };

  return (
    <div>
      <section
        className="px-5 py-6 py-xxl-10 hcf-bp-center hcf-bs-cover hcf-overlay hcf-transform"
        style={{
          backgroundImage: `url('${backgroundImageUrl}')`,
          height: "100vh",
        }}
      >
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-11 col-lg-9 col-xl-7 col-xxl-6 text-center text-white">
              <h1 className="display-3 fw-bold mb-3">Discover</h1>
              <p className="lead mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
                earum delectus autem harum incidunt doloremque!
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <button
                  type="button"
                  className="btn btn-light btn-lg px-4 gap-3"
                >
                  Let G0!!
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  Buy Credits
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Explore Categories */}
      <section ref={exploreSectionRef}>
        <div
          className="px-5 py-5 category-section text-dark"
          style={{ background: "#90EE90" }}
        >
          <Container>
            <h2 className="text-left mb-2 p-5">Explore Categories</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              consequatur amet voluptatum. Maxime blanditiis voluptas quaerat
              eum eius libero officia vitae iusto debitis vero, provident
              suscipit minima odio voluptate. Ipsum.
            </p>
            <Row className="justify-content-center">
              {categories.map((category, index) => (
                <Col key={index} className="mb-3">
                  <Button
                    variant={
                      selectedCategories.includes(category.keyword)
                        ? "success"
                        : "outline-primary"
                    }
                    className="text-center p-3"
                    style={{
                      height: "150px",
                      width: "150px",
                    }}
                    onClick={() => handleClick(category.keyword)}
                  >
                    <FontAwesomeIcon icon={category.icon} size="3x" />
                    <div className="mt-2">
                      {selectedCategories.includes(category.keyword) && (
                        <FontAwesomeIcon icon={faCheck} className="tick-icon" />
                      )}
                      {category.keyword}
                    </div>
                  </Button>
                </Col>
              ))}
            </Row>
            {/* Add a button to scroll to the Selected Campaigns section */}
            <div className="text-center mt-4">
              <Button
                variant="outline-primary"
                onClick={() =>
                  selectedSectionRef.current.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Go to Selected Campaigns
              </Button>
            </div>
          </Container>
        </div>
        <div className="custom-shape-divider-top-1704355885">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
      {/* Special Campaigns */}
      <section>
        <div
          className="Special-Campaigns text-dark"
          style={{ background: "white" }}
        >
          <Container>
            <h2 className="text-left mb-2 p-5">Special Campaigns</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem,
              distinctio? Dolorum in asperiores ullam ipsam.
            </p>
            <Row className="justify-content-start">
              {fetchError && <p>{fetchError}</p>}
              {featureCampaigns && featureCampaigns.length > 0 ? (
                featureCampaigns.map((campaign) => (
                  <Col key={campaign.id} className="mb-4">
                    <CharityCard campaign={campaign} />
                  </Col>
                ))
              ) : (
                <p>No smoothies available.</p>
              )}
            </Row>
          </Container>
        </div>
      </section>

      {/* Active Campaigns */}
      <section>
        <div
          className="Active-Campaigns text-dark"
          style={{ background: "white" }}
        >
          <Container>
            <h2 className="text-left mb-2 p-5">Normal Campaigns</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem,
              distinctio? Dolorum in asperiores ullam ipsam.
            </p>
            <Row className="justify-content-start">
              {fetchError && <p>{fetchError}</p>}
              {normalCampaigns && normalCampaigns.length > 0 ? (
                normalCampaigns.map((campaign) => (
                  <Col key={campaign.id} className="mb-4">
                    <NormalCharityCard campaign={campaign} />
                  </Col>
                ))
              ) : (
                <p>No smoothies available.</p>
              )}
            </Row>
          </Container>
        </div>
      </section>

      {/* Selected Campaigns section */}
      <section ref={selectedSectionRef}>
        <div
          className="Active-Campaigns text-dark"
          style={{ background: "white", paddingBottom: "50px" }}
        >
          <Container>
            <h2 className="text-left mb-2 p-5">Selected Campaigns</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem,
              distinctio? Dolorum in asperiores ullam ipsam.
            </p>
            <Row className="justify-content-start">
              {fetchError && <p>{fetchError}</p>}
              {selectedCampaigns.length > 0 ? (
                selectedCampaigns.map((campaign) => (
                  <Col key={campaign.id} className="mb-4">
                    <NormalCharityCard campaign={campaign} />
                  </Col>
                ))
              ) : (
                <p>No campaigns available for the selected category.</p>
              )}
            </Row>
            <div className="text-center mt-4">
              <Button
                variant="outline-primary"
                onClick={() =>
                  exploreSectionRef.current.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Go back to Explore Categories
              </Button>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
};

export default DiscoverPage;
