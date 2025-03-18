// import React, { useState, useEffect, useContext } from 'react';
// import './bookingDetails.css';
// import { AuthContext } from '../../context/AuthContext';
// import { BASE_URL } from '../../utils/config';

// const BookingDetails = () => {
//   const { user } = useContext(AuthContext);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserBookings = async () => {
//       if (!user) {
//         setError('User not logged in');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`${BASE_URL}/booking`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setBookings(data.data || []);
//         } else {
//           setError(data.message || 'Failed to fetch bookings');
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserBookings();
//   }, [user]);

//   if (loading) return <p>Loading your bookings...</p>;
//   if (error) return <p>{error}</p>;
//   if (!bookings.length) return <p>No bookings found.</p>;

//   return (
//     <div className='booking-details'>
//       <h2>Your Bookings</h2>
//       <div className="booking-cards">
//         {bookings.map((booking) => (
//           <div key={booking._id} className="booking-card">
//             <h3 className="card-title">Tour Information</h3>
//             <div className="card-body">
//               <p><strong>Tour Name:</strong> {booking.tourName}</p>
//               <p><strong>Full Name:</strong> {booking.fullName}</p>
//               <p><strong>Number of Guests:</strong> {booking.guestSize}</p>
//               <p><strong>Booking Date:</strong> {new Date(booking.bookAt).toLocaleDateString()}</p>
//               <p><strong>Phone:</strong> {booking.phone}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BookingDetails;


import React, { useState, useEffect, useContext } from 'react';
import './bookingDetails.css';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import { toast, ToastContainer } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the toast CSS

const BookingDetails = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!user) {
        setError('User not logged in');
        setLoading(false);
        toast.error('User not logged in'); // Show toast if user is not logged in
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/booking`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setBookings(data.data || []);
          toast.success('Bookings fetched successfully'); // Show success toast
        } else {
          setError(data.message || 'Failed to fetch bookings');
          toast.error(data.message || 'Failed to fetch bookings'); // Show error toast if the response is not ok
        }
      } catch (error) {
        setError(error.message);
        toast.error('An error occurred while fetching bookings'); // Show error toast for fetch errors
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [user]);

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p>{error}</p>;
  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div className='booking-details'>
      <h2>Your Bookings</h2>
      <div className="booking-cards">
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <h3 className="card-title">Tour Information</h3>
            <div className="card-body">
              <p><strong>Tour Name:</strong> {booking.tourName}</p>
              <p><strong>Full Name:</strong> {booking.fullName}</p>
              <p><strong>Number of Guests:</strong> {booking.guestSize}</p>
              <p><strong>Booking Date:</strong> {new Date(booking.bookAt).toLocaleDateString()}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ToastContainer to render toasts */}
      <ToastContainer />
    </div>
  );
};

export default BookingDetails;

