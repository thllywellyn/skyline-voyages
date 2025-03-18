// import React, { useContext, useState } from 'react'
// import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
// import '../styles/login.css'
// import { Link, useNavigate } from 'react-router-dom'
// import userIcon from '../assets/images/user.png'
// import { AuthContext } from '../context/AuthContext'
// import { BASE_URL } from '../utils/config'

// const Login = () => {
//    const [credentials, setCredentials] = useState({
//       email: undefined,
//       password: undefined
//    })

//    const {dispatch} = useContext(AuthContext)
//    const navigate = useNavigate()

//    const handleChange = e => {
//       setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
//    }

//    const handleClick = async e => {
//       e.preventDefault()

//       dispatch({type:'LOGIN_START'})

//       try {
//          const res = await fetch(`${BASE_URL}/auth/login`, {
//             method:'post',
//             headers: {
//                'content-type':'application/json'
//             },
//             credentials:'include',
//             body: JSON.stringify(credentials)
//          })

//          const result = await res.json()
//          if(!res.ok) {alert(result.message);return;}
//          console.log(result.data)

//          dispatch({type:"LOGIN_SUCCESS", payload:result.data})


//          const otpp = await fetch(`${BASE_URL}/auth/send/otp`, {
//             method:'post',
//             headers: {
//                'content-type':'application/json'
//             },
//             credentials:'include',
//             body: JSON.stringify(credentials)

            
//          })

//          if(otpp.ok){
//             navigate(`/otp/${credentials.email}`)


//          }else{
//             alert("otp not send");
//          }

   
//       } catch(err) {
//          dispatch({type:"LOGIN_FAILURE", payload:err.message})
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
//                         <h2>Login</h2>

//                         <Form onSubmit={handleClick}>
//                            <FormGroup>
//                               <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
//                            </FormGroup>
//                            <FormGroup>
//                               <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
//                            </FormGroup>
//                            <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
//                         </Form>
//                         <p>Don't have an account? <Link to='/register'>Create</Link></p>
//                      </div>
//                   </div>
//                </Col>
//             </Row>
//          </Container>
//       </section>
//    )
// }

// export default Login



import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles

const Login = () => {
   const [credentials, setCredentials] = useState({
      email: undefined,
      password: undefined
   })

   const {dispatch} = useContext(AuthContext)
   const navigate = useNavigate()

   const handleChange = e => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const handleClick = async e => {
      e.preventDefault()

      dispatch({type:'LOGIN_START'})

      try {
         const res = await fetch(`${BASE_URL}/auth/login`, {
            method:'post',
            headers: {
               'content-type':'application/json'
            },
            credentials:'include',
            body: JSON.stringify(credentials)
         })

         const result = await res.json()
         if(!res.ok) {
            toast.error(result.message);  // Show error toast if login fails
            return;
         }
         console.log(result.data)

         dispatch({type:"LOGIN_SUCCESS", payload:result.data})

         // Attempt to send OTP
         const otpp = await fetch(`${BASE_URL}/auth/send/otp`, {
            method:'post',
            headers: {
               'content-type':'application/json'
            },
            credentials:'include',
            body: JSON.stringify(credentials)
         })

         if(otpp.ok){
            toast.success("OTP sent successfully");  // Show success toast if OTP is sent
            navigate(`/otp/${credentials.email}`)
         }else{
            toast.error("Failed to send OTP");  // Show error toast if OTP fails
         }

      } catch(err) {
         dispatch({type:"LOGIN_FAILURE", payload:err.message})
         toast.error(`Error: ${err.message}`);  // Show error toast if a fetch error occurs
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
                        <h2>Login</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
                        </Form>
                        <p>Don't have an account? <Link to='/register'>Create</Link></p>
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

export default Login
