import { useState } from "react";
import UserHeader from "../UserHeader/UserHeader";
import "../App/App.css";
const SignUpFrom = () => {
  const [userRegistration, setUserRegistration] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPass: "",
    phoneNumber: "",
    address: "",
    license: "",
  });

  const [errors, setErrors] = useState({});

  const handleUser = (event) => {
    const { name, value } = event.target;
    setUserRegistration({
      ...userRegistration,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Full Name validation
    if (!userRegistration.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    }

    // Email validation
    if (!userRegistration.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userRegistration.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    // Password validation
    if (!userRegistration.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (userRegistration.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    // Confirm Password validation
    if (userRegistration.password !== userRegistration.confirmPass) {
      newErrors.confirmPass = "Passwords do not match";
      valid = false;
    }

    // Phone Number validation
    if (!userRegistration.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
      valid = false;
    }

    // Address validation
    if (!userRegistration.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }

    // License Number validation
    if (!userRegistration.license.trim()) {
      newErrors.license = "License Number is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("Form is valid:", userRegistration);
      // Submit form data or perform other actions
    } else {
      console.log("Form is not valid");
    }
  };
  return (
    <>
      <UserHeader />
      <div className="singup">
        <form className="form-group" onSubmit={handleSubmit}>
          <div className=" section-a">
            <div className="input-fields">
              <input
                type="text"
                placeholder="Full Name"
                value={userRegistration.fullName}
                name="fullName"
                autoComplete="off"
                onChange={handleUser}
              />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
              <input
                type="text"
                placeholder="Email"
                value={userRegistration.email}
                name="email"
                autoComplete="off"
                onChange={handleUser}
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <input
                type="password"
                placeholder="Password"
                value={userRegistration.password}
                name="password"
                autoComplete="off"
                onChange={handleUser}
              />
              {errors.password && <p className="error">{errors.password}</p>}
              <input
                type="password"
                placeholder="Confirm Password"
                value={userRegistration.confirmPass}
                name="confirmPass"
                autoComplete="off"
                onChange={handleUser}
              />
              {errors.confirmPass && (
                <p className="error">{errors.confirmPass}</p>
              )}
              <input
                type="text"
                placeholder="Phone Number"
                value={userRegistration.phoneNumber}
                name="phoneNumber"
                autoComplete="off"
                onChange={handleUser}
              />
              {errors.phoneNumber && (
                <p className="error">{errors.phoneNumber}</p>
              )}
              <input
                type="text"
                placeholder="Address"
                value={userRegistration.address}
                name="address"
                autoComplete="off"
                onChange={handleUser}
              />
              {errors.address && <p className="error">{errors.address}</p>}
              <input
                type="text"
                placeholder="License Number"
                value={userRegistration.license}
                name="license"
                autoComplete="off"
                onChange={handleUser}
              />
              {errors.license && <p className="error">{errors.license}</p>}
              <input type="file" accept="image/*" onChange={handleUser} />
            </div>
          </div>

          <div className="section-b">
            <div className="checkbox">
              <h5>Areas of Expertise:</h5>
            </div>
            <div className="checkbox-field">
              <div className="checkbox-1 check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="commercialPlumbing"
                />
                <label
                  className="form-check-label"
                  htmlFor="commercialPlumbing"
                >
                  Emergency Plumbing Repairs
                </label>
              </div>
              <div className="checkbox-2 check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="commercialPlumbing"
                />
                <label
                  className="form-check-label"
                  htmlFor="commercialPlumbing"
                >
                  Drain Cleaning and Unclogging
                </label>
              </div>
              <div className="checkbox-3 check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="commercialPlumbing"
                />
                <label
                  className="form-check-label"
                  htmlFor="commercialPlumbing"
                >
                  Pipe Leak Detection and Repair
                </label>
              </div>
              <div className="checkbox-4 check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="commercialPlumbing"
                />
                <label
                  className="form-check-label"
                  htmlFor="commercialPlumbing"
                >
                  Sewer Line Repair and Maintenance
                </label>
              </div>
              <div className="checkbox-5 check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="commercialPlumbing"
                />
                <label
                  className="form-check-label"
                  htmlFor="commercialPlumbing"
                >
                  Pipe repair
                </label>
              </div>
              <div className="term">
                <h5>Terms and Conditions:</h5>

                <div className="checkbox-1 check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="commercialPlumbing"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="commercialPlumbing"
                  >
                    By registering, you agree to abide by our terms and
                    conditions.
                  </label>
                  <button className="signupbtn" type="submit">
                    Singup
                  </button>
                  <button className="signupbtn">Cancel</button>
                  <p className="already"> Already have an account Login</p>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="section-c">
          <img src="/img/plumber signup.png" />
        </div>
      </div>
    </>
  );
};
export default SignUpFrom;
