// import React from 'react'
// import { Card, CardBody } from 'reactstrap'
// import { Link } from 'react-router-dom'
// import './tour-card.css'
// import calculateAvgRating from '../utils/avgRating'

// const TourCard = ({ tour }) => {

//    const { _id, title, city, photo, price, featured, reviews } = tour

//    const { totalRating, avgRating } = calculateAvgRating(reviews)

//    return (
//       <div className='tour__card'>
//          <Card>
//             <div className="tour__img">
//                <img src={photo} alt="tour-img" />
//                {featured && <span>Featured</span>}
//             </div>

//             <CardBody>
//                <div className="card__top d-flex align-items-center justify-content-between">
//                   <span className="tour__location d-flex align-items-center gap-1">
//                      <i class='ri-map-pin-line'></i> {city}
//                   </span>
//                   <span className="tour__rating d-flex align-items-center gap-1">
//                      <i class='ri-star-fill'></i> {avgRating === 0 ? null : avgRating}
//                      {totalRating === 0 ? ('Not rated') : (<span>({reviews.length})</span>)}

//                   </span>
//                </div>

//                <h5 className='tour__title'><Link to={`/tours/${_id}`}>{title}</Link></h5>

//                <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
//                   <h5>${price} <span> /per person</span></h5>
//                   <Link to={`/tours/${_id}`}>
//                      <button className=' booking__btn'>Book Now</button>
//                   </Link>
//                </div>
//             </CardBody>
//          </Card>
//       </div>
//    )
// }

// export default TourCard


import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import './tour-card.css'
import calculateAvgRating from '../utils/avgRating'
import { toast } from 'react-toastify' // Import toastify
import 'react-toastify/dist/ReactToastify.css' // Import toastify styles

const TourCard = ({ tour }) => {

   const { _id, title, city, photo, price, featured, reviews } = tour
   const { totalRating, avgRating } = calculateAvgRating(reviews)
   const navigate = useNavigate()

   const handleBooking = () => {
      // Simulate a booking action
      if (!localStorage.getItem("user")) {
         toast.error('Please sign in to book the tour!') // Show error if user is not logged in
      } else {
         toast.success('Booking successful!') // Show success if booking is successful
         // You can also navigate to a booking page or trigger another action here
         navigate(`/tours/${_id}`) // Navigate to the tour details page
      }
   }

   return (
      <div className='tour__card'>
         <Card>
            <div className="tour__img">
               <img src={photo} alt="tour-img" />
               {featured && <span>Featured</span>}
            </div>

            <CardBody>
               <div className="card__top d-flex align-items-center justify-content-between">
                  <span className="tour__location d-flex align-items-center gap-1">
                     <i className='ri-map-pin-line'></i> {city}
                  </span>
                  <span className="tour__rating d-flex align-items-center gap-1">
                     <i className='ri-star-fill'></i> {avgRating === 0 ? null : avgRating}
                     {totalRating === 0 ? ('Not rated') : (<span>({reviews.length})</span>)}
                  </span>
               </div>

               <h5 className='tour__title'>
                  <Link to={`/tours/${_id}`}>{title}</Link>
               </h5>

               <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                  <h5>${price} <span> /per person</span></h5>
                  <button 
                     className='booking__btn' 
                     onClick={handleBooking} // Trigger the booking handler on click
                  >
                     Book Now
                  </button>
               </div>
            </CardBody>
         </Card>
      </div>
   )
}

export default TourCard
