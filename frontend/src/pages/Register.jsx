
// import React, { useState, useContext } from 'react'
// import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
// import '../styles/login.css'
// import { Link, useNavigate } from 'react-router-dom'
// import userIcon from '../assets/images/user.png'
// import { AuthContext } from '../context/AuthContext'
// import { BASE_URL } from '../utils/config'

// const Register = () => {
//    const [credentials, setCredentials] = useState({
//       userName: '',
//       email: '',
//       password: '',
//    })
//    const [photo, setPhoto] = useState(null) // State for photo file
//    const { dispatch } = useContext(AuthContext)
//    const navigate = useNavigate()
//    const [loading, setLoading] = useState(false)

//    const handleChange = (e) => {
//       if (e.target.id === "photo") {
//          setPhoto(e.target.files[0]) // Handle photo upload
//       } else {
//          setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
//       }
//    }

//    const handleClick = async (e) => {
//       e.preventDefault()
//       setLoading(true)

//       if (!photo) {
//          alert('Photo is required!')
//          setLoading(false)
//          return
//       }

//       try {
//          // Prepare FormData
//          const formData = new FormData()
//          formData.append('username', credentials.userName)
//          formData.append('email', credentials.email)
//          formData.append('password', credentials.password)
//          formData.append('photo', photo)

//          const res = await fetch(`${BASE_URL}/auth/register`, {
//             method: 'POST',
//             body: formData, // Send form data
//          })
//          const result = await res.json()

//          if (!res.ok) {
//             alert(result.message || 'Something went wrong!')
//             setLoading(false)
//             return
//          }

//          dispatch({ type: 'REGISTER_SUCCESS' })
//          navigate('/login')
//       } catch (err) {
//          alert(err.message)
//          setLoading(false)
//       }
//    }

//    return (
//       <section>
//          <Container>
//             <Row>
//                <Col lg='8' className='m-auto'>
//                   <div className="login__container d-flex justify-content-between">
//                      <div className="login__form">
//                         <div className="user">
//                            <img src={userIcon} alt="" />
//                         </div>
//                         <h2>Register</h2>

//                         <Form onSubmit={handleClick}>
//                            <FormGroup>
//                               <input
//                                  type="text"
//                                  placeholder='Username'
//                                  id='userName'
//                                  onChange={handleChange}
//                                  required
//                               />
//                            </FormGroup>
//                            <FormGroup>
//                               <input
//                                  type="email"
//                                  placeholder='Email'
//                                  id='email'
//                                  onChange={handleChange}
//                                  required
//                               />
//                            </FormGroup>
//                            <FormGroup>
//                               <input
//                                  type="password"
//                                  placeholder='Password'
//                                  id='password'
//                                  onChange={handleChange}
//                                  required
//                               />
//                            </FormGroup>
//                            <FormGroup>
//                               <input
//                                  type="file"
//                                  id="photo"
//                                  accept="image/*"
//                                  onChange={handleChange}
//                                  required
//                               />
//                            </FormGroup>
//                            <Button className='btn secondary__btn auth__btn' type='submit' disabled={loading}>
//                               {loading ? 'Registering...' : 'Create Account'}
//                            </Button>
//                         </Form>
//                         <p>Already have an account? <Link to='/login'>Login</Link></p>
//                      </div>
//                   </div>
//                </Col>
//             </Row>
//          </Container>
//       </section>
//    )
// }

// export default Register



import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles

const Register = () => {
   const [credentials, setCredentials] = useState({
      userName: '',
      email: '',
      password: '',
   })
   const [photo, setPhoto] = useState(null) // State for photo file
   const { dispatch } = useContext(AuthContext)
   const navigate = useNavigate()
   const [loading, setLoading] = useState(false)

   const handleChange = (e) => {
      if (e.target.id === "photo") {
         setPhoto(e.target.files[0]) // Handle photo upload
      } else {
         setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
      }
   }

   const handleClick = async (e) => {
      e.preventDefault()
      setLoading(true)

      if (!photo) {
         toast.error('Photo is required!');  // Show error toast if no photo is uploaded
         setLoading(false)
         return
      }

      try {
         // Prepare FormData
         const formData = new FormData()
         formData.append('username', credentials.userName)
         formData.append('email', credentials.email)
         formData.append('password', credentials.password)
         formData.append('photo', photo)

         const res = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            body: formData, // Send form data
         })
         const result = await res.json()

         if (!res.ok) {
            toast.error(result.message || 'Something went wrong!');  // Show error toast if registration fails
            setLoading(false)
            return
         }

         dispatch({ type: 'REGISTER_SUCCESS' })
         toast.success('Registration successful!');  // Show success toast when registration is successful
         navigate('/login')
      } catch (err) {
         toast.error(`Error: ${err.message}`);  // Show error toast if an error occurs during the API call
         setLoading(false)
      }
   }

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Register</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input
                                 type="text"
                                 placeholder='Username'
                                 id='userName'
                                 onChange={handleChange}
                                 required
                              />
                           </FormGroup>
                           <FormGroup>
                              <input
                                 type="email"
                                 placeholder='Email'
                                 id='email'
                                 onChange={handleChange}
                                 required
                              />
                           </FormGroup>
                           <FormGroup>
                              <input
                                 type="password"
                                 placeholder='Password'
                                 id='password'
                                 onChange={handleChange}
                                 required
                              />
                           </FormGroup>
                           <FormGroup>
                              <input
                                 type="file"
                                 id="photo"
                                 accept="image/*"
                                 onChange={handleChange}
                                 required
                              />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit' disabled={loading}>
                              {loading ? 'Registering...' : 'Create Account'}
                           </Button>
                        </Form>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>

         {/* ToastContainer to display toasts */}
         <ToastContainer />
      </section>
   )
}

export default Register

