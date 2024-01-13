// components/DonationAmount.js
import { useEffect, useState } from 'react';
// import { supabase } from '../supabase/client'; // Create a supabase.js file to initialize Supabase client
import "./Style/DonationAmount.css";

const DonationAmount = () => {
  const [amount, setAmount] = useState(0);

  // useEffect(() => {
  //   // Set up a real-time subscription to listen for changes in the donation table
  //   const subscription = supabase
  //     .from('donations')
  //     .on('INSERT', (payload) => {
  //       // Update the donation amount when a new donation is added
  //       setAmount((prevAmount) => prevAmount + payload.new.amount);
  //     })
  //     .subscribe();

  //   // Fetch the initial donation amount
  //   const fetchAmount = async () => {
  //     const { data, error } = await supabase
  //       .from('donations')
  //       .select('amount')
  //       .sum('amount');

  //     if (!error) {
  //       setAmount(data[0].sum || 0);
  //     }
  //   };

  //   fetchAmount();

  //   // Cleanup subscription on component unmount
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, []);

  return (
    <div className='donation_feed'>
      <h2 className='donation_text'></h2>
      <p className='donation_text_small'></p>
      <div className="btn-group">
        <button type="button" className="btn btn-success">Sort By</button>
        {/* <button onClick={() => handleSortBy('amount')} type="button" className="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-expanded="false">
          <span className="sr-only">Toggle Dropdown</span>
        </button> */}
        <div className="dropdown-menu">
          <a className="dropdown-item" href="#">All</a>
          <a className="dropdown-item" href="#">Following</a>
          <a className="dropdown-item" href="#">Favorite</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Others</a>
        </div>
      </div>
      <p className='donation_text'>Total Amount: ${amount}</p>
      <div className="media">
      <img src="./images/zeeconvert-com.webp" class="mr-3" alt="..."/>
      <div class="media-body">
        <h5 class="mt-0">Richard KUY</h5>
        <p>donated $0.00 to
          
        </p>
        <div class="media mt-3">
          <a class="mr-3" href="#">
            <img src="./images/IMG_90271.jpg" class="mr-4" alt="..."/>
          </a>
          <div class="media-body">
            <h5 class="mt-0">Support a family to stay together</h5>
            <p className='overflow-hidden'>
              During daily activities we see people struggling, some growing, some not having opportunity to improve their life. We have met Lockman in 2018 and his health condition didn't allow him to greet us or even see the sunlight.
            </p>
          </div>
        </div>
      </div>
</div>
    </div>
  );
};

export default DonationAmount;
