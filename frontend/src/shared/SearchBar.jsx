// import React, { useRef } from 'react'
// import './search-bar.css'
// import { Col, Form, FormGroup } from 'reactstrap'
// import { BASE_URL } from '../utils/config'
// import { useNavigate } from 'react-router-dom'

// const SearchBar = () => {
//    const locationRef = useRef('')
//    const daysRef = useRef(0)
//    const maxGroupSizeRef = useRef(0)
//    const navigate = useNavigate()

//    const searchHandler = async () => {
//       const location = locationRef.current.value
//       const days = daysRef.current.value
//       const maxGroupSize = maxGroupSizeRef.current.value

//       if (!location && !days && !maxGroupSize) {
//          return alert('At least one field is required!')
//       }
//       console.log(localStorage.getItem("user"))

//       const queryParams = new URLSearchParams({
//          city: location || '',
//          days: days || '',
//          maxGroupSize: maxGroupSize || ''
//       })

//       const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?${queryParams.toString()}`)

//       if (!res.ok) alert('Something went wrong')

//       const result = await res.json()

//       navigate(`/tours/search?${queryParams.toString()}`, { state: result.data })
//    }

//    return (
//       <Col lg="12">
//          <div className="search__bar">
//             <Form className='d-flex align-items-center gap-4'>
//                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
//                   <span><i className='ri-map-pin-line'></i></span>
//                   <div>
//                      <h6>Location</h6>
//                      <input type="text" placeholder='Where are you going?' ref={locationRef} />
//                   </div>
//                </FormGroup>
//                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
//                   <span><i className='ri-map-pin-time-line'></i></span>
//                   <div>
//                      <h6>Days</h6>
//                      <input type="number" placeholder='Number of days' ref={daysRef} />
//                   </div>
//                </FormGroup>
//                <FormGroup className='d-flex gap-3 form__group form__group-last'>
//                   <span><i className='ri-group-line'></i></span>
//                   <div>
//                      <h6>Max People</h6>
//                      <input type="number" placeholder='0' ref={maxGroupSizeRef} />
//                   </div>
//                </FormGroup>

//                <span className='search__icon' type='submit' onClick={searchHandler}>
//                   <i className='ri-search-line'></i>
//                </span>
//             </Form>
//          </div>
//       </Col>
//    )
// }

// export default SearchBar



import React, { useRef } from 'react'
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'
import { BASE_URL } from '../utils/config'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'  // Import Toastify
import 'react-toastify/dist/ReactToastify.css'  // Import Toastify CSS

const SearchBar = () => {
   const locationRef = useRef('')
   const daysRef = useRef(0)
   const maxGroupSizeRef = useRef(0)
   const navigate = useNavigate()

   const searchHandler = async () => {
      const location = locationRef.current.value
      const days = daysRef.current.value
      const maxGroupSize = maxGroupSizeRef.current.value

      if (!location && !days && !maxGroupSize) {
         toast.error('At least one field is required!')  // Show toast for empty search
         return
      }

      try {
         const queryParams = new URLSearchParams({
            city: location || '',
            days: days || '',
            maxGroupSize: maxGroupSize || ''
         })

         const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?${queryParams.toString()}`)

         if (!res.ok) {
            toast.error('Something went wrong')  // Show toast for fetch failure
            return
         }

         const result = await res.json()

         if (result?.data?.length === 0) {
            toast.info('No tours found with the given criteria')  // Show info toast if no results
         }

         navigate(`/tours/search?${queryParams.toString()}`, { state: result.data })

         toast.success('Tours found!')  // Show success toast after fetching tours
      } catch (error) {
         toast.error('An error occurred, please try again')  // Handle unexpected errors
      }
   }

   return (
      <Col lg="12">
         <div className="search__bar">
            <Form className='d-flex align-items-center gap-4'>
               <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                  <span><i className='ri-map-pin-line'></i></span>
                  <div>
                     <h6>Location</h6>
                     <input type="text" placeholder='Where are you going?' ref={locationRef} />
                  </div>
               </FormGroup>
               <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                  <span><i className='ri-map-pin-time-line'></i></span>
                  <div>
                     <h6>Days</h6>
                     <input type="number" placeholder='Number of days' ref={daysRef} />
                  </div>
               </FormGroup>
               <FormGroup className='d-flex gap-3 form__group form__group-last'>
                  <span><i className='ri-group-line'></i></span>
                  <div>
                     <h6>Max People</h6>
                     <input type="number" placeholder='0' ref={maxGroupSizeRef} />
                  </div>
               </FormGroup>

               <span className='search__icon' type='submit' onClick={searchHandler}>
                  <i className='ri-search-line'></i>
               </span>
            </Form>
         </div>

         {/* Include ToastContainer here to render toasts */}
         <ToastContainer />
      </Col>
   )
}

export default SearchBar

