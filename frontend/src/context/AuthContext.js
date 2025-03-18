// import { createContext, useEffect, useReducer } from 'react'

// const initial_state = {
//    user: localStorage.getItem("user") !== "" ? JSON.parse(localStorage.getItem("user")) : "null",
//    loading: false,
//    error: null
// }




// export const AuthContext = createContext(initial_state)

// const AuthReducer = (state, action) => {
//    switch (action.type) {
//       case 'LOGIN_START':
//          return {
//             user: null,
//             loading: true,
//             error: null
//          }
//       case 'LOGIN_SUCCESS':
//          return {
//             user: action.payload,
//             loading: false,
//             error: null
//          }
//       case 'LOGIN_FAILURE':
//          return {
//             user: null,
//             loading: false,
//             error: action.payload
//          }
//       case 'REGISTER_SUCCESS':
//          return {
//             user: null,
//             loading: false,
//             error: null
//          }
//       case 'LOGOUT':
//          return {
//             user: null,
//             loading: false,
//             error: null
//          }

         

//       default:
//          return state


//    }


// }





// export const AuthContextProvider = ({ children }) => {

//    const [state, dispatch] = useReducer(AuthReducer, initial_state)
//    console.log("a1")



//    useEffect(() => {
//       localStorage.setItem("user", JSON.stringify(state.user))
//       console.log(localStorage.getItem("user"))
//    }, [state.user])
   


//    return <AuthContext.Provider value={{
//       user: state.user,
//       loading: state.loading,
//       error: state.error,
//       dispatch,
//    }}>
//       {children}
//    </AuthContext.Provider>
// }



// import { createContext, useEffect, useReducer } from 'react';

// const initial_state = {
//   user: localStorage.getItem("user"),
//   loading: false,
//   error: null
// }
// try {
//   const savedUser = localStorage.getItem('user');
//   if (savedUser) {
//     initial_state.user = JSON.parse(savedUser);
//   }
// } catch (error) {
//   console.error('Failed to parse user data from localStorage:', error);
// }

// export const AuthContext = createContext(initial_state);

// const AuthReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN_START':
//       return {
//         user: null,
//         loading: true,
//         error: null,
//       };
//     case 'LOGIN_SUCCESS':
//       return {
//         user: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'LOGIN_FAILURE':
//       return {
//         user: null,
//         loading: false,
//         error: action.payload,
//       };
//     case 'REGISTER_SUCCESS':
//       return {
//         user: null,
//         loading: false,
//         error: null,
//       };
//     case 'LOGOUT':
//       return {
//         user: null,
//         loading: false,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, initial_state);

//   useEffect(() => {
//     if (state.user) {
//       try {
//         localStorage.setItem('user', JSON.stringify(state.user));
//       } catch (error) {
//         console.error('Failed to save user data to localStorage:', error);
//       }
//     } else {
//       localStorage.removeItem('user'); // Clean up if no user data
//     }
//   }, [state.user]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user: state.user,
//         loading: state.loading,
//         error: state.error,
//         dispatch,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


// import { createContext, useEffect, useReducer } from 'react';

// // Define initial state
// const initial_state = {
//   user: null,
//   loading: false,
//   error: null
// };

// // Try to retrieve user data from localStorage
// const savedUser = localStorage.getItem('user');
// if (savedUser) {
//   try {
//     initial_state.user = JSON.parse(savedUser);  // If found, parse the user data
//   } catch (error) {
//     console.error('Failed to parse user data from localStorage:', error); // Handle error if any
//   }
// }

// // Create the context
// export const AuthContext = createContext(initial_state);

// // Reducer function for managing authentication actions
// const AuthReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN_START':
//       return {
//         user: null,
//         loading: true,
//         error: null,
//       };
//     case 'LOGIN_SUCCESS':
//       return {
//         user: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'LOGIN_FAILURE':
//       return {
//         user: null,
//         loading: false,
//         error: action.payload,
//       };
//     case 'REGISTER_SUCCESS':
//       return {
//         user: null,
//         loading: false,
//         error: null,
//       };
//     case 'LOGOUT':
//       return {
//         user: null,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// // Context Provider
// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, initial_state);

//   // Effect to sync user data with localStorage
//   useEffect(() => {
//     if (state.user) {
//       try {
//         localStorage.setItem('user', JSON.stringify(state.user));  // Save user to localStorage
//       } catch (error) {
//         console.error('Failed to save user data to localStorage:', error); // Handle error if any
//       }
//     } else {
//       localStorage.removeItem('user');  // Remove user data from localStorage if not logged in
//     }
//   }, [state.user]);  // Only runs when state.user changes

//   return (
//     <AuthContext.Provider
//       value={{
//         user: state.user,
//         loading: state.loading,
//         error: state.error,
//         dispatch,  // Expose dispatch for dispatching actions
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


// // context/AuthContext.js
// import { createContext, useReducer } from 'react';

// const INITIAL_STATE = {
//   user: JSON.parse(localStorage.getItem('user')) || null,
// };

// const AuthReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN_SUCCESS':
//       localStorage.setItem('user', JSON.stringify(action.payload));
//       return {
//         ...state,
//         user: action.payload,
//       };
//     case 'LOGOUT':
//       localStorage.removeItem('user');
//       return {
//         ...state,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };

// export const AuthContext = createContext(INITIAL_STATE);

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//   return (
//     <AuthContext.Provider
//       value={{
//         user: state.user,
//         dispatch,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


// context/AuthContext.js
import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
  user: null,
};

// Attempt to safely parse the 'user' item from localStorage
const savedUser = localStorage.getItem('user');
if (savedUser) {
  try {
    INITIAL_STATE.user = JSON.parse(savedUser);
  } catch (e) {
    console.error("Error parsing 'user' from localStorage:", e);
  }
}

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return {
        ...state,
        user: undefined,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
