// import React, { useState } from 'react'
// import CommonSection from './../shared/CommonSection'
// import { Container, Row, Col } from 'reactstrap'
// import { useLocation } from 'react-router-dom'
// import TourCard from '../shared/TourCard'


// const SearchResultList = () => {
//    const location = useLocation()

//    const [data] = useState(location.state)

//    return (
//       <>
//          <CommonSection title={'Tour Search Result'} />
//          <section>
//             <Container>
//                <Row>
//                   {
//                      data.length === 0 ? <h4 className='text-center'>No Tour Found</h4> : data?.map(tour => 
//                      <Col lg='3' className='mb-4' key={tour._id}> <TourCard tour={tour}/> </Col>)
//                   }
//                </Row>
//             </Container>
//          </section>
//       </>
//    )
// }

// export default SearchResultList



import React, { useState, useEffect } from 'react'
import CommonSection from './../shared/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import TourCard from '../shared/TourCard'
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles

const SearchResultList = () => {
   const location = useLocation()
   const [data, setData] = useState([])

   useEffect(() => {
      // Checking if data exists in location state
      if (location.state && location.state.length > 0) {
         setData(location.state)
      } else {
         toast.error('No tours found for your search');  // Show an error if no data is found
      }
   }, [location.state])

   return (
      <>
         <CommonSection title={'Tour Search Result'} />
         <section>
            <Container>
               <Row>
                  {
                     data.length === 0 ? <h4 className='text-center'>No Tours Found</h4> : data?.map(tour => 
                        <Col lg='3' className='mb-4' key={tour._id}> <TourCard tour={tour}/> </Col>
                     )
                  }
               </Row>
            </Container>
         </section>
         <ToastContainer />  {/* ToastContainer to display toasts */}
      </>
   )
}

export default SearchResultList
