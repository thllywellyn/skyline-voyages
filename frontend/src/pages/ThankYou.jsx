// import React from 'react'
// import { Container, Row, Col, Button } from 'reactstrap'
// import { Link } from 'react-router-dom'
// import '../styles/thank-you.css'

// const ThankYou = () => {
//    return (
//       <section>
//          <Container>
//             <Row>
//                <Col lg='12' className='pt-5 text-center'>
//                   <div className="thank__you">
//                      <span><i class='ri-checkbox-circle-line'></i></span>
//                      <h1 className='mb-3 fw-semibold'>Thank You</h1>
//                      <h3 className='mb-4'>Your Tour Is Booked</h3>

//                      <Button className='btn primary__btn w-25'><Link to='/home'>Back To Home</Link></Button>
//                   </div>
//                </Col>
//             </Row>
//          </Container>
//       </section>
//    )
// }

// export default ThankYou



import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles
import '../styles/thank-you.css'

const ThankYou = () => {
   useEffect(() => {
      // Show a success toast when the component is loaded
      toast.success('Your tour is successfully booked!') 
   }, []);

   return (
      <section>
         <Container>
            <Row>
               <Col lg='12' className='pt-5 text-center'>
                  <div className="thank__you">
                     <span><i className='ri-checkbox-circle-line'></i></span>
                     <h1 className='mb-3 fw-semibold'>Thank You</h1>
                     <h3 className='mb-4'>Your Tour Is Booked</h3>

                     <Button className='btn primary__btn w-25'>
                        <Link to='/home'>Back To Home</Link>
                     </Button>
                  </div>
               </Col>
            </Row>
         </Container>
         <ToastContainer />  {/* ToastContainer to display toasts */}
      </section>
   )
}

export default ThankYou
