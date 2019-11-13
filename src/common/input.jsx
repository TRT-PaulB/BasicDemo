import React from "react";

const Input = ({ name, label, error, width, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        className="form-control"
        {...rest} 
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;

// https://github.com/TRT-PaulB/RoutePlannerBase2/blob/master/react-routeplanner-app/src/components/login.jsx
// https://github.com/TRT-PaulB/RoutePlannerBase2/blob/master/react-routeplanner-app/src/components/logout.jsx
// https://github.com/TRT-PaulB/RoutePlannerBase2/blob/master/react-routeplanner-app/src/services/authService.js
// https://github.com/TRT-PaulB/RoutePlannerBase2/blob/master/react-routeplanner-app/src/services/httpService.js
// https://github.com/TRT-PaulB/RoutePlannerBase2/blob/master/react-routeplanner-app/src/common/navbar.jsx

////////////////////////////////////////////////
// LOGIN doSubmit

// await auth.login(username, password);

//       // see the redirected state could be set in protectedRoute.jsx
//       const { state } = this.props.location;
//       window.location = state ? state.from.pathname : "/";

////////////////////////////////////////////////
// HTTP SERVICE

// export function setJwt(jwt) {
//   axios.defaults.headers.common["x-auth-token"] = jwt;
// }

////////////////////////////////////////////////
//AUTH SERVICE

// export async function login(email, password) {
//   const { data: jwt } = await http.post(authEndpoint, {
//     email: email,
//     password: password
//   });

//   console.log(jwt);
//   localStorage.setItem(tokenKey, jwt);
// }

// export function logout() {
//   localStorage.removeItem(tokenKey);
// }

// export function getJwt() {
//   return localStorage.getItem(tokenKey);
// }

// export default {
//   login,
//   logout,
//   getCurentUser,
//   loginWithJwt,
//   getJwt
// };

////////////////////////////////////////////////