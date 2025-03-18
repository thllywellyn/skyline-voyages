

// import React from "react";
// import "./header.css";
// import { Container, Row, Col, Button } from "reactstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import image from "../../assets/images/logo.png"

// const navLinks = [
//   { path: "/home", display: "Home" },
//   { path: "/about", display: "About Us" },
//   { path: "/tours", display: "Tours" },
//   { path: "/contact", display: "Contact" },
// ];

// const Header = () => {
//   const { user, dispatch } = useContext(AuthContext); // Access the user and dispatch from context
//   const navigate = useNavigate(); // Initialize the navigate function to redirect

//   // Function to handle logout
//   const logout = () => {
//     dispatch({ type: "LOGOUT" }); // Dispatch LOGOUT action to clear user
//     navigate("/"); // Redirect to home or login page after logout
//   };

//   return (
//     <header className="header">
//       <Container>
//         <Row>
//           <Col lg="3">
//             <div className="logo d-flex align-items-center gap-2">
//               <img src={image} alt="Skyline Voyages Logo" className="logo__image" />
//               <h1 className="logo__name">Skyline Voyages</h1>
//             </div>
//           </Col>

//           <Col lg="6">
//             <nav className="navigation">
//               <ul className="nav__list d-flex justify-content-center gap-4">
//                 {navLinks.map((item, index) => (
//                   <li key={index} className="nav__item">
//                     <Link to={item.path}>{item.display}</Link>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </Col>

//           <Col lg="3">
//             <div className="nav__right d-flex align-items-center gap-4">
//               <div className="nav__btns d-flex align-items-center gap-2">
//                 {user ? (
//                   // If user is authenticated, show username and logout button
//                   <>
//                     <h5 className="mb-0">{user.username}</h5> {/* User's name displayed here */}
//                     <Button className="btn btn-dark" onClick={logout}>
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   // If no user is authenticated, show login and register buttons
//                   <>
//                     <Button className="btn secondary__btn">
//                       <Link to="/login">Login</Link>
//                     </Button>
//                     <Button className="btn primary__btn">
//                       <Link to="/register">Register</Link>
//                     </Button>
//                   </>
//                 )}

//                 {user && (
//                   <Button className="btn primary__btn">
//                     <Link to={`/my-tours/${user._id}`}>My Tours</Link>
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </header>
//   );
// };

// export default Header;
import React, { useEffect, useRef, useContext } from "react";
import "./header.css";
import { Container, Row, Col, Button } from "reactstrap";
import { AuthContext } from "../../context/AuthContext";
import image from "../../assets/images/logo.png";  // Make sure the image path is correct
import { NavLink, Link, useNavigate } from 'react-router-dom';

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/tours", display: "Tours" },
];

const Header = () => {
  const { user, dispatch } = useContext(AuthContext); 
  console.log(user); // Access the user and dispatch from context
  const navigate = useNavigate();  // Initialize the navigate function to redirect

  // Function to handle logout
  const logout = () => {
    dispatch({ type: "LOGOUT" });  // Dispatch LOGOUT action to clear user
    navigate("/");  // Redirect to home or login page after logout
  };

  return (
    <header className="header">
      <Container>
        <Row className="d-flex align-items-center justify-content-between">
          <Col lg="3" className="d-flex align-items-center gap-2">
            {/* Logo and Brand Name */}
            <img src={image} alt="Skyline Voyages Logo" className="logo__image" />
            <h1 className="logo__name">Skyline Voyages</h1>
          </Col>

          {/* Navigation Links */}
          <Col lg="6">
            <nav className="navigation">
              <ul className="nav__list d-flex justify-content-center gap-4">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <Link to={item.path} className="nav__link">
                      {item.display}
                    </Link>
                  </li>
                ))}
                {user?.role === "admin" && (
                  <li className="nav__item">
                    <NavLink
                      to="/admin"
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      Create Tour
                    </NavLink>
                  </li>
                )}

                {user?.role === "admin" && (
                  <li className="nav__item" id="one">
                    <NavLink
                      to="/analysis"
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      Analysis
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
          </Col>

          <Col lg="3" className="d-flex justify-content-end">
            <div className="nav__btns d-flex align-items-center gap-2">
              {user ? (
                <div className="user-info d-flex align-items-center gap-3">
                  <img
                    src={user.photo}
                    alt="User Profile"
                    className="user-photo"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  {/* If user is authenticated, show username and logout button */}
                  <h5 className="mb-0">{user.username}</h5>
                  <Button className="btn btn-dark" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  {/* If no user is authenticated, show login and register buttons */}
                  <Button className="btn secondary__btn">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="btn primary__btn">
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}

              {user && (
                <Button className="btn primary__btn">
                  <Link to={`/my-tours/${user._id}`}>My Tours</Link>
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
