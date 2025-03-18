// import React, { useContext, useState } from 'react';
// import './LoginForm.css';
// import { useParams, useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../utils/config';
// import { AuthContext } from '../context/AuthContext'; // Import the context

// const LoginForm = () => {
//   const { emaill } = useParams();
//   const navigate = useNavigate(); 
//   const [email, setEmail] = useState(emaill || '');
//   const [otp, setOtp] = useState('');
//   const { dispatch } = useContext(AuthContext); // Access dispatch from context

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Email:', email);
//     console.log('OTP:', otp);

//     try {
//       const response = await fetch(`${BASE_URL}/auth/login/otp`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ email, otp }),
//       });

//       if (response.ok) {
//         const result = await response.json();

//         // Dispatch the LOGIN_SUCCESS action to save user info in context
//         dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
        
//         navigate("/home");
        
//       } else {
//         alert("OTP not verified");
//       }
      
//     } catch (error) {
//       console.error('An error occurred:', error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="form-container">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-field">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               readOnly
//               required
//             />
//           </div>
//           <div className="input-field">
//             <label htmlFor="otp">OTP</label>
//             <input
//               type="text"
//               id="otp"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="submit-btn">Submit</button>
//         </form>
//       </div>
//       <div className="image-container">
//         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2mXd1Ux1JWvXSnRpPbhWq3oO4u8jUVQCGaw&s" alt="Login" />
//       </div>
//     </div>
//   );
// };

// export default LoginForm;



import React, { useContext, useState } from 'react';
import './LoginForm.css';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext'; // Import the context
import { toast, ToastContainer } from 'react-toastify'; // Import toastify

const LoginForm = () => {
  const { emaill } = useParams();
  const navigate = useNavigate(); 
  const [email, setEmail] = useState(emaill || '');
  const [otp, setOtp] = useState('');
  const { dispatch } = useContext(AuthContext); // Access dispatch from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('OTP:', otp);

    try {
      const response = await fetch(`${BASE_URL}/auth/login/otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        const result = await response.json();

        // Dispatch the LOGIN_SUCCESS action to save user info in context
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
        
        // Show a success toast
        toast.success('Login successful!');
        
        navigate("/home");
        
      } else {
        // Show an error toast if OTP is not verified
        toast.error('OTP not verified. Please try again.');
      }
      
    } catch (error) {
      console.error('An error occurred:', error);
      // Show an error toast in case of an error
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
      <div className="image-container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2mXd1Ux1JWvXSnRpPbhWq3oO4u8jUVQCGaw&s" alt="Login" />
      </div>

      {/* ToastContainer to display toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;

