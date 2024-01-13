import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { v4 as uuid4 } from "uuid";

import { supabase } from "../supabase/client";

const RaiseFundsPage = ({ token }) => {
  const backgroundImageUrl =
    "https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const backgroundImageUrlForFormSection =
    "https://mkzsygoszpytisrpuqna.supabase.co/storage/v1/object/public/project_images/stacked-peaks-haikei.png";

  const [showModal, setShowModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null); // Store the uploaded image

  const handleClose = () => {
    setShowModal(false);
    // Reset the selected category when the modal is closed
    setSelectedCategory("");
    setMessage("");
    setImage(null);
  };
  const handleShow = () => setShowModal(true);

  //For useState around the duration and the amount of donations
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [amountError, setAmountError] = useState("");
  const [durationError, setDurationError] = useState("");
  //for error checking
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setAmountError(isNaN(value) ? "Please enter a valid number" : "");
  };
  //for error checking
  const handleDurationChange = (e) => {
    const value = e.target.value;
    setDuration(value);
    setDurationError(isNaN(value) ? "Please enter a valid number" : "");
  };

  const [imageFileName, setImageFileName] = useState("");
  const handleImageChange = (e) => {
    // Handle the image change and set it in the state
    const file = e.target.files[0];

    // Generate a unique name for the image using uuidv4
    const uniqueFileName = `${uuid4()}-${file.name}`;

    // Set the image and unique file name in the states
    setImage(file);
    setImageFileName(uniqueFileName);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check the form for errors
    if (!amount || !duration || isNaN(amount) || isNaN(duration)) {
      alert("Please fill in valid values for both fields");
      return;
    }

    try {
      // Upload the image to Supabase Storage in the 'normal_images' bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("normal_images")
        .upload(imageFileName, image);

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        // Handle error as needed
        return;
      }

      // Get the public URL of the uploaded image
      const folderName = "normal_images";
      const { data: imageData } = supabase.storage
        .from(`${folderName}`)
        .getPublicUrl(`${imageFileName}`);

      // Store the image URL in the state or wherever you need it
      function extractImageUrl(obj) {
        if (obj && obj.publicUrl) {
          return obj.publicUrl.trim();
        } else {
          return null; // or any default value you prefer
        }
      }
      const onlyImageUrl = extractImageUrl(imageData);
      const imageUrl = onlyImageUrl;
      console.log("Image public URL:", imageUrl);

      // Insert data into Supabase table
      const { data, error } = await supabase.from("normal_campaigns").insert([
        {
          normal_campaign_name: e.target.elements.form4Example1.value,
          normal_campaign_category: selectedCategory,
          normal_campaign_text: e.target.elements.form4Example3.value,
          fundraiser: token.user.user_metadata.username,
          normal_campaign_total_donation: parseFloat(amount),
          normal_campaign_duration: parseInt(duration),
          normal_campaign_image_url: imageUrl, // Use the retrieved image URL
        },
      ]);

      if (error) {
        console.error("Error inserting data:", error);
        // Handle error as needed
      } else {
        console.log("Data inserted successfully:", data);
        // Handle success as needed
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error as needed
    }

    // Add your form submission logic here
    // Access the selected category, message, and image from the state
    console.log("Selected Category:", selectedCategory);
    console.log("Amount:", amount);
    console.log("Duration:", duration);
    console.log("Message:", message);
    console.log("Image:", image);
    handleClose(); // Close the modal after form submission
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   //Check the form if error
  //   if (!amount || !duration || isNaN(amount) || isNaN(duration)) {
  //     alert("Please fill in valid values for both fields");
  //     return;
  //   }
  //   //To supabase
  //   try {
  //     // Upload image to Supabase Storage
  //     const { data: imageUpload, error: imageUploadError } =
  //       await supabase.storage
  //         .from("normal_images") // Replace with your actual Storage bucket name
  //         .upload(`normal_images/${image.name}`, image);

  //     if (imageUploadError) {
  //       console.error("Error uploading image:", imageUploadError);
  //       // Handle image upload error as needed
  //       return;
  //     }

  //     // Get the URL of the uploaded image
  //     const imageUrl = imageUpload[0].url;

  //     // Insert data into Supabase table
  //     const { data, error } = await supabase.from("normal_campaigns").insert([
  //       {
  //         normal_campaign_name: e.target.elements.form4Example1.value,
  //         normal_campaign_category: selectedCategory,
  //         normal_campaign_text: e.target.elements.form4Example3.value,
  //         normal_campaign_total_donation: parseFloat(amount),
  //         normal_campaign_duration: parseInt(duration),
  //         normal_campaign_image_url: imageUrl, // Store the image URL in the table
  //       },
  //     ]);

  //     if (error) {
  //       console.error("Error inserting data:", error);
  //       // Handle error as needed
  //     } else {
  //       console.log("Data inserted successfully:", data);
  //       // Handle success as needed
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //     // Handle error as needed
  //   }

  //   // Add your form submission logic here
  //   // Access the selected category, message, and image from the state
  //   console.log("Selected Category:", selectedCategory);
  //   console.log("Amount:", amount);
  //   console.log("Duration:", duration);
  //   console.log("Message:", message);
  //   console.log("Image:", image);
  //   handleClose(); // Close the modal after form submission
  // };
  return (
    <div>
      {/* Hero Section of RaiseFunds */}
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
              <h1 className="display-3 fw-bold mb-3">RaiseFunds</h1>
              <p className="lead mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
                earum delectus autem harum incidunt doloremque!
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <button
                  type="button"
                  className="btn btn-light btn-lg px-4 gap-3"
                >
                  Free Consultation
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
      {/* Section for creating form for campaign */}
      <section
        className="px-5 py-6 py-xxl-10"
        style={{
          backgroundImage: `url('${backgroundImageUrlForFormSection}')`,
          backgroundSize: "cover",
          height: "70vh", // Set a specific height for the container
        }}
      >
        <div className="container">
          <div className="row justify-content-md-start">
            <div className="col-12 col-md-11 col-lg-9 col-xl-7 col-xxl-6 text-white">
              <h1 className="display-3 fw-bold mb-3">RaiseFunds</h1>
              <p className="lead mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
                earum delectus autem harum incidunt doloremque!
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-start">
                <button
                  type="button"
                  className="btn btn-light btn-lg px-4 gap-3"
                  onClick={handleShow}
                >
                  Create Campaign
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
      {/* Modal for creating form */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <FormGroup className="mb-4">
              <FormLabel htmlFor="form4Example1">Campaign's Name</FormLabel>
              <FormControl type="text" id="form4Example1" required />
            </FormGroup>

            <FormGroup className="mb-4">
              <FormLabel htmlFor="form4Example2">Category</FormLabel>
              <FormControl
                as="select"
                id="form4Example2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="Education">Education</option>
                <option value="Medical">Medical</option>
                <option value="Society">Society</option>
                <option value="Disaster">Disaster</option>
                <option value="Sport">Sport</option>
              </FormControl>
            </FormGroup>

            <FormGroup className="mb-4">
              <FormLabel htmlFor="form4ExampleAmount">
                Amount of Donation
              </FormLabel>
              <InputGroup hasValidation>
                <InputGroup.Text>$</InputGroup.Text>
                <FormControl
                  type="text"
                  id="form4ExampleAmount"
                  placeholder="Amount"
                  value={amount}
                  onChange={handleAmountChange}
                  isInvalid={!!amountError}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {amountError}
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>

            <FormGroup className="mb-4">
              <FormLabel htmlFor="form4ExampleDays">Durations</FormLabel>
              <InputGroup hasValidation>
                <InputGroup.Text>Days</InputGroup.Text>
                <FormControl
                  type="text"
                  id="form4ExampleDays"
                  placeholder="Days"
                  value={duration}
                  onChange={handleDurationChange}
                  isInvalid={!!durationError}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {durationError}
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>

            <FormGroup className="mb-4">
              <FormLabel htmlFor="form4Example3">Message</FormLabel>
              <FormControl as="textarea" rows={4} id="form4Example3" required />
            </FormGroup>

            <FormGroup className="mb-4">
              <FormLabel htmlFor="form4ExampleImage">Upload Image</FormLabel>
              <Form.Control
                type="file"
                accept=".jpg, .jpeg, .png"
                id="form4ExampleImage"
                onChange={handleImageChange}
                required
              />
            </FormGroup>

            <FormGroup className="d-flex justify-content-center mb-4">
              <Form.Check
                type="checkbox"
                id="form4Example4"
                label="Send me a copy of this message"
                defaultChecked
              />
            </FormGroup>

            <Button type="submit" className="mb-4" block>
              Create Campaign
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RaiseFundsPage;
