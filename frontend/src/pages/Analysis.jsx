// import React, { useEffect, useState } from 'react';
// import { BASE_URL } from '../utils/config.js'; // Adjust path as needed
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
// import '../styles/analysis.css';

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// const Analysis = () => {
//     const [tourCount, setTourCount] = useState(null); // State to store tour count
//     const [userCount, setUserCount] = useState(null);// State to store user count
//     const [bookingCount, setBookingCount] = useState(null); // State to store tour count
//     const [reviewCount, setReviewCount] = useState(null);
//     const [error, setError] = useState(null); // State to handle errors
  
//     // Fetch the tour count when the component mounts
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await fetch(${BASE_URL}/tours/search/getTourCount, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
  
//           if (response.ok) {
//             const data = await response.json();
//             setTourCount(data.data); // Assuming response contains a 'data' field with the count
//           } else {
//             setError('Failed to fetch tour count');
//           }




//             /// user count //////////////////////////

//           const userResponse = await fetch(${BASE_URL}/users/search/count, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
      
//           // Log response status and body
//           console.log('User response status:', userResponse.status);
//           const userData = await userResponse.json();
//           console.log('User data:', userData); // Check the response content
      
//           if (userResponse.ok) {
//             setUserCount(userData.data); // Assuming response contains 'data'
//           } else {
//             setError('Failed to fetch user count');
//           }




//           // booking count /////////////////////

//           const bookingResponse = await fetch(${BASE_URL}/booking/search/getBookingsCount,{
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           })

//           if (bookingResponse.ok) {
//             const bookingData = await bookingResponse.json();
//             setBookingCount(bookingData.data); // Assuming response contains a 'data' field with the count
//           } else {
//             setError('No Bookings found');
//           }



//           //// reviews count /////////////////////////////


          
//           const reviewResponse = await fetch(${BASE_URL}/review/search/getTotalReviews,{
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           })

//           if (reviewResponse.ok) {
//             const reviewData = await reviewResponse.json();
//             setReviewCount(reviewData.data); // Assuming response contains a 'data' field with the count
//           } else {
//             setError('No Reviews Found');
//           }




//         } catch (err) {
//           setError('Error fetching data');
//           console.error(err);
//         }
//       };



      


  
//       fetchData();
//     }, []); // Empty dependency array ensures this runs once on mount
  
//     return (
//       <div className="analysis-container">
      
//       {error && <p className="error-message">{error}</p>}
  
//       <div className="count-cards">
//         <div className="count-card">
//           <h2>Total Tours</h2>
//           <p>{tourCount !== null ? tourCount : 'Fetching tour data...'}</p>
//         </div>
//         <div className="count-card">
//           <h2>Total Users</h2>
//           <p>{userCount !== null ? userCount : 'Fetching user count...'}</p>
//         </div>
//         <div className="count-card">
//           <h2>Total Bookings</h2>
//           <p>{bookingCount !== null ? bookingCount : 'Fetching Booking Count...'}</p>
//         </div>
//         <div className="count-card">
//           <h2>Total Reviews</h2>
//           <p>{reviewCount !== null ? reviewCount : 'Fetching total Reviews...'}</p>
//         </div>
//       </div>
//     </div>

//     );
  
// };

// export default Analysis;
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/config.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from 'chart.js';
import '../styles/analysis.css';

ChartJS.register(Title, Tooltip, Legend, BarElement,LineElement,PointElement, CategoryScale, LinearScale, ArcElement);

const Analysis = () => {
  const [tourCount, setTourCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [bookingCount, setBookingCount] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(`${BASE_URL}/tours/search/getTourCount`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTourCount(data.data);
        } else {
          setError('Failed to fetch tour count');
        }


        const userResponse = await fetch(`${BASE_URL}/users/search/count`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserCount(userData.data);
        } else {
          setError('Failed to fetch user count');
        }


        const bookingResponse = await fetch(`${BASE_URL}/booking/search/getBookingsCount`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (bookingResponse.ok) {
          const bookingData = await bookingResponse.json();
          setBookingCount(bookingData.data);
        } else {
          setError('No Bookings found');
        }


        const reviewResponse = await fetch(`${BASE_URL}/review/search/getTotalReviews`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (reviewResponse.ok) {
          const reviewData = await reviewResponse.json();
          setReviewCount(reviewData.data);
        } else {
          setError('No Reviews Found');
        }

        
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // // Data for charts
  // const chartData = {
  //   labels: ['Users', 'Tours', 'Bookings', 'Reviews'],
  //   datasets: [
  //     {
  //       label: 'Counts',
  //       data: [userCount, tourCount, bookingCount, reviewCount],
  //       backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f'],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // // Data for Pie Chart
  // const pieChartData = {
  //   labels: ['Users', 'Bookings'],
  //   datasets: [
  //     {
  //       data: [userCount, bookingCount],
  //       backgroundColor: ['#3498db', '#e74c3c'],
  //       hoverBackgroundColor: ['#2980b9', '#c0392b'],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const pieChartOptions = {
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       position: 'bottom',
  //     },
  //   },
  // };



    // Data for Bar Chart
    const barChartData = {
      labels: ['Users', 'Tours', 'Bookings', 'Reviews'],
      datasets: [
        {
          label: 'Counts',
          data: [userCount, tourCount, bookingCount, reviewCount],
          backgroundColor: [
            'rgba(52, 152, 219, 0.6)', // Blue
            'rgba(231, 76, 60, 0.6)', // Red
            'rgba(46, 204, 113, 0.6)', // Green
            'rgba(241, 196, 15, 0.6)', // Yellow
          ],
          borderColor: ['#2980b9', '#c0392b', '#27ae60', '#f39c12'],
          borderWidth: 2,
          hoverBackgroundColor: [
            'rgba(52, 152, 219, 1)', // Blue
            'rgba(231, 76, 60, 1)', // Red
            'rgba(46, 204, 113, 1)', // Green
            'rgba(241, 196, 15, 1)', // Yellow
          ],
        },
      ],
    };
  
    // Data for Pie Chart
    const pieChartData = {
      labels: ['Users', 'Bookings'],
      datasets: [
        {
          data: [userCount, bookingCount],
          backgroundColor: [
            'rgb(216, 110, 174)', // Blue
            'rgb(130, 209, 96)', // Red
          ],
          hoverBackgroundColor: [
            'rgb(174, 65, 130)', // Blue
            'rgb(98, 174, 65)', // Red
          ],
        },
      ],
    };
  
    // Pie Chart Options
    const pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },

        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}`;
            },
          },
        },
        elements: {
          arc: {
            // Apply shadow to arcs (pie segments)
            shadowColor: 'rgba(0, 0, 0, 0.7)', // Shadow color
            shadowBlur: 20, // Amount of blur (higher values create a more blurred shadow)
            shadowOffsetX: 6, // Horizontal shadow offset
            shadowOffsetY: 6, // Vertical shadow offset
          },
        }
      },
    };
  

  // Data for Doughnut Chart
  const doughnutChartData = {
    labels: ['Total Tours', 'Total Reviews'],
    datasets: [
      {
        data: [tourCount, reviewCount],
        backgroundColor: ['rgb(180, 150, 254)', 'rgb(109, 181, 115)'], // Colors for each section
        hoverBackgroundColor: ['rgb(105, 91, 143)', 'rgb(81, 123, 85)'], // Hover colors
        borderWidth: 2,
      },
    ],
  };

  // Options for Doughnut Chart
  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
      doughnutLabel: {
        // Center label inside the doughnut
        display: true,
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#2c3e50',
        text: `${((tourCount / (tourCount + reviewCount)) * 100).toFixed(1)}%`,
      },
    },
    animation: {
      animateScale: true, // Animate scale (enlarges the chart)
      animateRotate: true, // Animate rotation (rotates on loading)
    },
    cutout: '60%', // The size of the hole in the middle (adjustable)
    hoverOffset: 6, // Slight offset effect when hovering
    elements: {
      arc: {
        shadowColor: 'rgba(0, 0, 0, 0.5)',  // Darker shadow for more visibility
        shadowBlur: 20,                     // Increased blur
        shadowOffsetX: 6,                   // Increased offset for more visible shadow
        shadowOffsetY: 6,                   // Increased vertical offset
      },
    },
  };

  


  

  return (
    <div className="analysis-container">
      {error && <p className="error-message">{error}</p>}

      <div className="count-cards">
        <div className="count-card">
          <h2>Total Tours</h2>
          <p>{tourCount !== null ? tourCount : 'Fetching tour data...'}</p>
        </div>

        <div className="count-card">
          <h2>Total Users</h2>
          <p>{userCount !== null ? userCount : 'Fetching user count...'}</p>
        </div>

        <div className="count-card">
          <h2>Total Bookings</h2>
          <p>{bookingCount !== null ? bookingCount : 'Fetching Booking Count...'}</p>
        </div>

        <div className="count-card">
          <h2>Total Reviews</h2>
          <p>{reviewCount !== null ? reviewCount : 'Fetching total Reviews...'}</p>
        </div>

        {/* <div className="count-card">
          <h2>Total Amount Received</h2>
          <p>{totalAmount !== null ? $${totalAmount} : 'Fetching total amount...'}</p>
        </div> */}

      </div>

      <div className="charts">
        <div className="chart" style={{ width: '400px', height: '400px' }} >
          <h3>Bar Chart</h3>
          <Bar data={barChartData} />
        </div>      
      </div>


      <div className="charts">
        <div className="chart" style={{ width: '400px', height: '400px' }}>
          <h3>Pie Chart: Users vs Bookings</h3>
          {userCount !== null && bookingCount !== null ? (
            <Pie data={pieChartData} options={pieChartOptions} />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </div>
      <br /><br /><br /><br /><br /><br />

      <div className="charts">
        <div className="chart"  style={{ width: '400px', height: '400px' }}>
        
          {error && <p className="error-message">{error}</p>}
          <h3>Doughnut Chart: Tours vs Reviews</h3>
          {tourCount !== null && reviewCount !== null ? (
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          ) : (
            <p>Loading chart...</p>
          )}

        </div>
      </div>
      
    </div>


  );
};

export default Analysis;