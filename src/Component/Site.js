import "./Home.css";
import left from "./Images/left-next.png";
import right from "./Images/right-next.png";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import profile from "./Images/profile.jpg";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection } from "firebase/firestore";
import filter from "./Images/filter.png";
import "./Educator.css";
import "./Nav.css";
import signOut from "./Images/image.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "./Images/Screenshot_2024-04-13_214422-removebg-preview.png";
import arrow from "./Images/back.png";
import "./tutorPage.css";
import star from "./Images/star.png";
import icon from "./Images/msgImage.png";
import down from "./Images/downArrow.png";
import send from "./Images/send.png";
import { Firestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import read from "./sent&read.png";

firebase.initializeApp({
  apiKey: "AIzaSyDv5Kyd2BN77kF_A2dQlE3cqvDJeDyCzMA",
  authDomain: "mastertutor-1188e.firebaseapp.com",
  projectId: "mastertutor-1188e",
  storageBucket: "mastertutor-1188e.appspot.com",
  messagingSenderId: "528712432406",
  appId: "1:528712432406:web:078ff4242dfd4896b0ae37",
  measurementId: "G-CYL65XWWSM",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const user = auth.currentUser;

function Site() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  return (
    <div>
      <Nav />
      <Routes>
        <Route exact path="/Mastertutor" element={<Home />} />
        <Route path="/Mastertutor/educators" element={<Educator />} />
        <Route path="/Mastertutor/educators/page" element={<TutorPage />} />
        <Route path="/Mastertutor/profile" element={<TeacherHome />} />
        <Route path="/Mastertutor/signIn" element={<SignIn />} />
        <Route path="/Mastertutor/signUp" element={<SignUp />} />
        <Route path="/Mastertutor/freeSessions" element={<FreeSessions />} />
        <Route path="/Mastertutor/feedback" element={<Feedback />} />
        <Route path="/Mastertutor/course-page" element={<CoursePage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useAuthState(auth);
  const userRef = firestore.collection("users");
  const [users] = useCollectionData(userRef);
  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     setUser(user);
  //   });
  //   return () => unsubscribe();
  // }, []);

  const isActive = (path) => location.pathname === path;

  async function logout() {
    await auth.signOut();
    navigate("/Mastertutor/signIn");
  }
  return (
    <div className="Nav-Parent">
      <div className="Nav-Child">
        <div className="Logo">
          <Link to="/Mastertutor">
            <img src={logo} className="logoImg" alt="Logo" />
          </Link>
        </div>
        <div className="Menu-Parent">
          <div className="Menu-Child">
            <Link
              to="/Mastertutor/educators"
              className={
                isActive("/Mastertutor/educators")
                  ? "menu-head active"
                  : "menu-head"
              }
            >
              Educators
            </Link>
            <Link
              to="/Mastertutor/feedback"
              className={
                isActive("/Mastertutor/feedback")
                  ? "menu-head active"
                  : "menu-head"
              }
            >
              Feedback
            </Link>
            <Link
              to="/Mastertutor/freeSessions"
              className={
                isActive("/Mastertutor/freeSessions")
                  ? "menu-head active"
                  : "menu-head"
              }
            >
              Free Sessions
            </Link>
            {auth.currentUser ? (
              <>
                {users &&
                  users.map((user) => {
                    if (user.uid === auth.currentUser.uid) {
                      return (
                        <>
                          <Link
                            to="/Mastertutor/profile"
                            className="LogInButton btn2F menu-head"
                          >
                            {user.name}{" "}
                          </Link>
                          <Link to="/Mastertutor/signIn" className="">
                            <img
                              src={signOut}
                              className="signOut"
                              onClick={logout}
                              alt="logoutButton"
                            />
                          </Link>
                        </>
                      );
                    }

                    return null;
                  })}
              </>
            ) : (
              <Link
                to="/Mastertutor/signIn"
                className="LogInButton btn2 menu-head"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// function Nav() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [user, setUser] = useState(null);
//   const userRef = firestore.collection("users");
//   const [users] = useCollectionData(userRef);

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       setUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   const isActive = (path) => location.pathname === path;

//   const logout = () => {
//     auth.signOut();
//     navigate("/Mastertutor/signIn");
//   };

//   return (
//     <div className="Nav-Parent">
//       <div className="Nav-Child">
//         <div className="Logo">
//           <Link to="/Mastertutor">
//             <img src={logo} className="logoImg" alt="Logo" />
//           </Link>
//         </div>
//         <div className="Menu-Parent">
//           <div className="Menu-Child">
//             <Link
//               to="/Mastertutor/educators"
//               className={isActive("/Mastertutor/educators") ? "menu-head active" : "menu-head"}
//             >
//               Educators
//             </Link>
//             <Link
//               to="/Mastertutor/feedback"
//               className={isActive("/Mastertutor/feedback") ? "menu-head active" : "menu-head"}
//             >
//               Feedback
//             </Link>
//             <Link
//               to="/Mastertutor/freeSessions"
//               className={isActive("/Mastertutor/freeSessions") ? "menu-head active" : "menu-head"}
//             >
//               Free Sessions
//             </Link>
//             {user ? (
//               <div className="menu-head">
//                 <Link to="/Mastertutor/profile" className="LogInButton btn2F">
//                   {user.displayName}
//                 </Link>
//                 <button className="signout" onClick={logout}>
//                   <img src={signOut} className="signOut" alt="logoutButton" />
//                 </button>
//               </div>
//             ) : (
//               <Link to="/Mastertutor/signIn" className="LogInButton btn2 menu-head">
//                 Log In
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function Home() {
  return (
    <div className="homeParent">
      <div className="homeDivisions">
        {/* Home */}
        <div className="background-image">
          {/* <Nav /> */}
          <div className="homeChild1P">
            <div className="homeChild1">
              <p className="heading1">WELCOME TO MASTER TUTOR!</p>
              <p className="heading3">
                Lorem ipsum dolor sit amet. Est reprehenderit impedit ab laborum
                facere aut natus perferendis eos omnis facere est dolorum unde
                et autem illum qui ratione rerum. Eos nemo repellendus id quos
                ipsa et aperiam molestiae. Non quam culpa et architecto eius est
                aperiam ratione et assumenda tenetur. Ad porro veritatis non
                laborum suscipit qui ipsum pariatur. Sit harum culpa et nihil
                itaque sed alias velit.
              </p>
              <button className="btn1">Explore</button>
            </div>
          </div>
        </div>
        <p className="alignCenter">Our Educators</p>
        <p className="alignEnd linkText">View All</p>
        <div className="homeChild2P">
          <div className="homeChild2">
            <div className="card1">
              <div className="cardCol1">
                <img src={profile} className="imageProfile" />
              </div>
              <div className="cardCol2">
                <p className="heading3">Name</p>
                <p>Description</p>
                <div className="cardCol2Child">
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">23</p>
                    <p className="heading4">Million</p>
                  </div>
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">RS. 500/-</p>
                    <p className="heading4">per hour</p>
                  </div>
                </div>
                <button className="btn2">Visit Profile</button>
              </div>
            </div>
            <div className="card1">
              <div className="cardCol1">
                <img src={profile} className="imageProfile" />
              </div>
              <div className="cardCol2">
                <p className="heading3">Name</p>
                <p>Description</p>
                <div className="cardCol2Child">
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">23</p>
                    <p className="heading4">Million</p>
                  </div>
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">RS. 500/-</p>
                    <p className="heading4">per hour</p>
                  </div>
                </div>
                <button className="btn2">Visit Profile </button>
              </div>
            </div>
            <div className="card1">
              <div className="cardCol1">
                <img src={profile} className="imageProfile" />
              </div>
              <div className="cardCol2">
                <p className="heading3">Name</p>
                <p>Description</p>
                <div className="cardCol2Child">
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">23</p>
                    <p className="heading4">Million</p>
                  </div>
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">RS. 500/-</p>
                    <p className="heading4">per hour</p>
                  </div>
                </div>
                <button className="btn2">Visit Profile </button>
              </div>
            </div>
          </div>
        </div>

        <p className="alignCenter">Learn</p>
        <div className="subjectContainer">
          <div className="subjectParent">
            <div className="subjectChild1">Class 1-5</div>
            <div className="subjectChild2">Class 6-10</div>
            <div className="subjectChild3">Class 11-12</div>
            <div className="subjectChild4">Specific Subject</div>
          </div>
        </div>

        <p className="alignCenter">Testimonials</p>
        <p className="alignEnd linkText">View All</p>
        <div className="homeChild3P">
          <div className="homeChild3C">
            <div className="left-arrow">
              <img src={left} className="arrow" />
            </div>
            <div className="card2P">
              <div className="card2C">
                <p>NAME</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4">
                  Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                  laborum facere aut natus perferendis eos omnis facere est
                  dolorum unde et autem illum qui ratione rerum. Eos nemo
                  repellendus id quos ipsa et aperiam molestiae.
                </p>
              </div>
            </div>
            <div className="card2P1">
              <div className="card2C">
                <p>NAME</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4">
                  Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                  laborum facere aut natus perferendis eos omnis facere est
                  dolorum unde et autem illum qui ratione rerum. Eos nemo
                  repellendus id quos ipsa et aperiam molestiae.
                </p>
              </div>
            </div>
            <div className="card2P">
              <div className="card2C">
                <p>NAME</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4">
                  Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                  laborum facere aut natus perferendis eos omnis facere est
                  dolorum unde et autem illum qui ratione rerum. Eos nemo
                  repellendus id quos ipsa et aperiam molestiae.
                </p>
              </div>
            </div>
            <div className="right-arrow">
              <img src={right} className="arrow" />
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="footerP">
          <div className="footerC">
            <div className="footerC1">
              <div className="col1Footer">
                <p>Menu1</p>
                <p>Menu1</p>
                <p>Menu1</p>
                <p>Menu1</p>
              </div>
              <div className="col1Footer">
                <p>Menu1</p>
                <p>Menu1</p>
                <p>Menu1</p>
                <p>Menu1</p>
              </div>
            </div>
            <div className="col2Footer">
              <p>CopyRight @2024 MasterTutors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate("/Mastertutor/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/Mastertutor/profile");
    }
  }, [auth.currentUser, navigate]);

  return (
    <div className="SignInComp">
      {/* <Nav /> */}
      <div className="div2">
        <div className="SignInParent">
          <div className="SignInChildren">
            <p className="heading1">Sign In</p>
            <form className="signInForm" onSubmit={signInWithEmailAndPassword}>
              {/* <div className="SignInInput"> */}
              <input
                type="text"
                className="inputSignIn"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="inputSignIn"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* </div> */}
              {/* <span className="signSpan"> */}
              <p className="smallText">Forgot Password?</p>
              <button type="submit" className="btnSignIn">
                Sign In
              </button>
              {/* </span> */}
            </form>
            {error && <p className="error">{error}</p>}
            <p className="or">OR</p>
            <Link to="/Mastertutor/signUp" className="midText">
              Create a new account.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignUp() {
  const navigate = useNavigate();
  const userRef = firestore.collection("users");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      await user.sendEmailVerification();
      alert("Email Verification Sent!");
      await userRef.doc(user.uid).set({
        name: fullName,
        email: email,
        role: role,
        uid: user.uid,
        totalCourses: 0,
      });

      console.log("User created");
      navigate("/Mastertutor/signIn");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="SignInComp">
      {/* <Nav /> */}
      <div className="div2">
        <div className="SignInParent">
          <div className="SignInRows">
            <p className="heading1">Sign Up</p>
            <div className="SignInBox">
              <form className="signInForm" onSubmit={handleSignUp}>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="inputSignIn"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="inputSignIn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  minLength={8}
                  placeholder="Password"
                  className="inputSignIn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <select
                  name="Role"
                  id="Role"
                  className="inputSelect"
                  required
                  value={role}
                  onChange={handleRoleChange}
                >
                  <option value="" className="optionSelect">
                    Select role
                  </option>
                  <option value="Student" className="optionSelect">
                    Student
                  </option>
                  <option value="Librarian" className="optionSelect">
                    Librarian
                  </option>
                </select>
                <div className="lableDiv">
                  <input
                    type="checkbox"
                    id="myCheckbox"
                    className="labelCheckBox"
                    required
                  />
                  <label htmlFor="myCheckbox" className="labelText">
                    *The information provided is true to the best of my
                    knowledge.
                  </label>
                </div>
                <button
                  type="submit"
                  className="btnSignIn"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div className="signin-div">
              <p className="signin-text">Already have an account ?</p>

              <Link to="/Mastertutor/signIn" className="midText">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Educator() {
  const [disp, setDisp] = useState("False");
  function openFilter() {
    let a = document.getElementById("overlayFilter");
    a.style.display = "flex";
    disp == "False" ? setDisp("True") : setDisp("False");
  }
  function closeFilter() {
    let a = document.getElementById("overlayFilter");
    a.style.display = "none";
    setDisp("False");
  }
  return (
    <div className="Tutor">
      <div className="TutorChild">
        <div className="background-image1">
          <div className="backdrop">{/* <Nav /> */}</div>
        </div>
        <div className="searchContainer">
          <div className="searchParent">
            <input
              type="text"
              className="searchBox"
              placeholder="Enter Name or Subject"
            />
            <button className="searchButton">Search</button>
            <div className="dropdown">
              <img
                src={filter}
                className="filtIcon dropdown"
                onClick={disp == "False" ? openFilter : closeFilter}
              />
              <div
                className="overlayFilter dropdown-content"
                id="overlayFilter"
              >
                <div className="overlayFilterChildren">
                  <span className="overlayFilterChildren1">
                    <label for="rating">Rating</label>
                    <br />
                    <span className="rateRange">
                      <label>1⭐</label>

                      <input
                        type="range"
                        id="rating"
                        min="1"
                        max="5"
                        name="Rating"
                        list="rates"
                      />
                      <label>5⭐</label>
                    </span>
                    <br />
                    <datalist id="rates">
                      <option value="1" label="1">
                        1
                      </option>
                      <option value="2" label="2">
                        2
                      </option>
                      <option value="3" label="3">
                        3
                      </option>
                      <option value="4" label="4">
                        4
                      </option>
                      <option value="5" label="5">
                        5
                      </option>
                    </datalist>
                  </span>
                  <span className="overlayFilterChildren1">
                    <span>
                      {" "}
                      <label for="rating">Fees</label>
                      <br />
                    </span>
                    <span>
                      <input type="checkbox" value="Below 500" />
                      Under 500
                      <br />
                    </span>
                    <span>
                      <input type="checkbox" value="500-750" />
                      500-750
                      <br />
                    </span>
                    <span>
                      <input type="checkbox" value="750-1000" />
                      750-1000
                      <br />
                    </span>
                    <span>
                      <input type="checkbox" value="1000" />
                      Over 1000
                      <br />
                    </span>
                  </span>
                  <span className="overlayFilterChildren1">
                    <span>
                      <label for="rating">Experience</label>
                      <br />
                    </span>
                    <span>
                      <input type="checkbox" value="0-2" />
                      0-2 years
                      <br />
                    </span>
                    <span>
                      {" "}
                      <input type="checkbox" value="2-5" />
                      2-5 years
                      <br />
                    </span>
                    <span>
                      {" "}
                      <input type="checkbox" value="5-10" />
                      5-10 years
                      <br />
                    </span>
                    <span>
                      {" "}
                      <input type="checkbox" value="over 10" />
                      Over 10 years
                      <br />
                    </span>
                  </span>

                  <button className="searchButton" onClick={closeFilter}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="homeChild2P">
          <div className="homeChild2">
            <div className="card1">
              <div className="cardCol1">
                <img src={profile} className="imageProfile" />
              </div>
              <div className="cardCol2">
                <p className="heading3">Name</p>
                <p>Description</p>
                <div className="cardCol2Child">
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">23</p>
                    <p className="heading4">Million</p>
                  </div>
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">RS. 500/-</p>
                    <p className="heading4">per hour</p>
                  </div>
                </div>
                <Link to="/Mastertutor/educators/page">
                  <button className="btn2">Visit Profile</button>
                </Link>
              </div>
            </div>
            <div className="card1">
              <div className="cardCol1">
                <img src={profile} className="imageProfile" />
              </div>
              <div className="cardCol2">
                <p className="heading3">Name</p>
                <p>Description</p>
                <div className="cardCol2Child">
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">23</p>
                    <p className="heading4">Million</p>
                  </div>
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">RS. 500/-</p>
                    <p className="heading4">per hour</p>
                  </div>
                </div>
                <button className="btn2">Visit Profile</button>
              </div>
            </div>
            <div className="card1">
              <div className="cardCol1">
                <img src={profile} className="imageProfile" />
              </div>
              <div className="cardCol2">
                <p className="heading3">Name</p>
                <p>Description</p>
                <div className="cardCol2Child">
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">23</p>
                    <p className="heading4">Million</p>
                  </div>
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">RS. 500/-</p>
                    <p className="heading4">per hour</p>
                  </div>
                </div>
                <button className="btn2">Visit Profile </button>
              </div>
            </div>
            <div className="card1">
              <div className="cardCol1">
                <img src={profile} className="imageProfile" />
              </div>
              <div className="cardCol2">
                <p className="heading3">Name</p>
                <p>Description</p>
                <div className="cardCol2Child">
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">23</p>
                    <p className="heading4">Million</p>
                  </div>
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">RS. 500/-</p>
                    <p className="heading4">per hour</p>
                  </div>
                </div>
                <button className="btn2">Visit Profile</button>
              </div>
            </div>
            <div className="card1">
              <div className="cardCol1">
                <img src={profile} className="imageProfile" />
              </div>
              <div className="cardCol2">
                <p className="heading3">Name</p>
                <p>Description</p>
                <div className="cardCol2Child">
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">23</p>
                    <p className="heading4">Million</p>
                  </div>
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">RS. 500/-</p>
                    <p className="heading4">per hour</p>
                  </div>
                </div>
                <button className="btn2">Visit Profile </button>
              </div>
            </div>
            <div className="card1">
              <div className="cardCol1">
                <img src={profile} className="imageProfile" />
              </div>
              <div className="cardCol2">
                <p className="heading3">Name</p>
                <p>Description</p>
                <div className="cardCol2Child">
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">23</p>
                    <p className="heading4">Million</p>
                  </div>
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">RS. 500/-</p>
                    <p className="heading4">per hour</p>
                  </div>
                </div>
                <button className="btn2">Visit Profile </button>
              </div>
            </div>
            <div className="card1">
              <div className="cardCol1">
                <img src={profile} className="imageProfile" />
              </div>
              <div className="cardCol2">
                <p className="heading3">Name</p>
                <p>Description</p>
                <div className="cardCol2Child">
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">23</p>
                    <p className="heading4">Million</p>
                  </div>
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">RS. 500/-</p>
                    <p className="heading4">per hour</p>
                  </div>
                </div>
                <button className="btn2">Visit Profile</button>
              </div>
            </div>
            <div className="card1">
              <div className="cardCol1">
                <img src={profile} className="imageProfile" />
              </div>
              <div className="cardCol2">
                <p className="heading3">Name</p>
                <p>Description</p>
                <div className="cardCol2Child">
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">23</p>
                    <p className="heading4">Million</p>
                  </div>
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">RS. 500/-</p>
                    <p className="heading4">per hour</p>
                  </div>
                </div>
                <button className="btn2">Visit Profile </button>
              </div>
            </div>
            <div className="card1">
              <div className="cardCol1">
                <img src={profile} className="imageProfile" />
              </div>
              <div className="cardCol2">
                <p className="heading3">Name</p>
                <p>Description</p>
                <div className="cardCol2Child">
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">23</p>
                    <p className="heading4">Million</p>
                  </div>
                  <div className="cardCol2Child1">
                    <p className="heading3 bold">RS. 500/-</p>
                    <p className="heading4">per hour</p>
                  </div>
                </div>
                <button className="btn2">Visit Profile </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FreeSessions() {
  return (
    <div className="freeComponent">
      {/* <Nav /> */}
      <div className="freeParent">
        <p className="heading1">FREE SESSIONS</p>
        <div className="courseComp">
          <div className="courseDiv">
            <div className="courseCard">
              <div className="courses-item_bg"></div>
              <div className="cardCont">
                <p className="courseName">COURSE NAME</p>
                <p className="courseDate">START:15/04/2024</p>
              </div>
            </div>
            <div className="courseCard">
              <div className="courses-item_bg red"></div>
              <div className="cardCont">
                <p className="courseName">COURSE NAME</p>
                <p className="courseDate">START:15/04/2024</p>
              </div>
            </div>
            <div className="courseCard">
              <div className="courses-item_bg blue"></div>
              <div className="cardCont">
                <p className="courseName">COURSE NAME</p>
                <p className="courseDate">START:15/04/2024</p>
              </div>
            </div>
            <div className="courseCard">
              <div className="courses-item_bg lgreen"></div>
              <div className="cardCont">
                <p className="courseName">COURSE NAME</p>
                <p className="courseDate">START:15/04/2024</p>
              </div>
            </div>
            <div className="courseCard">
              <div className="courses-item_bg lblue"></div>
              <div className="cardCont">
                <p className="courseName">COURSE NAME</p>
                <p className="courseDate">START:15/04/2024</p>
              </div>
            </div>
            <div className="courseCard">
              <div className="courses-item_bg dgreen"></div>
              <div className="cardCont">
                <p className="courseName">COURSE NAME</p>
                <p className="courseDate">START:15/04/2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feedback() {
  return (
    <div className="FeedbackComp">
      {/* <Nav /> */}
      <div className="feedbackParent">
        <p className="heading1">Feedback</p>
        <div className="feedbackDiv1">
          <textarea
            type="textarea"
            className="inputFeedback"
            placeholder="Type your feedback here and tag the respective tutor"
          />
          <button className="post-button">Post</button>
        </div>
        <div className="homeChild3P">
          <div className="homeChild3C">
            <div className="card2P">
              <div className="card2C">
                <p>NAME</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4">
                  Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                  laborum facere aut natus perferendis eos omnis facere est
                  dolorum unde et autem illum qui ratione rerum. Eos nemo
                  repellendus id quos ipsa et aperiam molestiae.
                </p>
              </div>
            </div>
            {/* <div className="card2P1">
              <div className="card2C">
                <p>NAME</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4">
                  Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                  laborum facere aut natus perferendis eos omnis facere est
                  dolorum unde et autem illum qui ratione rerum. Eos nemo
                  repellendus id quos ipsa et aperiam molestiae.
                </p>
              </div>
            </div> */}
            <div className="card2P">
              <div className="card2C">
                <p>NAME</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4">
                  Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                  laborum facere aut natus perferendis eos omnis facere est
                  dolorum unde et autem illum qui ratione rerum. Eos nemo
                  repellendus id quos ipsa et aperiam molestiae.
                </p>
              </div>
            </div>
            <div className="card2P">
              <div className="card2C">
                <p>NAME</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4">
                  Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                  laborum facere aut natus perferendis eos omnis facere est
                  dolorum unde et autem illum qui ratione rerum. Eos nemo
                  repellendus id quos ipsa et aperiam molestiae.
                </p>
              </div>
            </div>
            <div className="card2P">
              <div className="card2C">
                <p>NAME</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4">
                  Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                  laborum facere aut natus perferendis eos omnis facere est
                  dolorum unde et autem illum qui ratione rerum. Eos nemo
                  repellendus id quos ipsa et aperiam molestiae.
                </p>
              </div>
            </div>
            <div className="card2P">
              <div className="card2C">
                <p>NAME</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4">
                  Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                  laborum facere aut natus perferendis eos omnis facere est
                  dolorum unde et autem illum qui ratione rerum. Eos nemo
                  repellendus id quos ipsa et aperiam molestiae.
                </p>
              </div>
            </div>
            <div className="card2P">
              <div className="card2C">
                <p>NAME</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4">
                  Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                  laborum facere aut natus perferendis eos omnis facere est
                  dolorum unde et autem illum qui ratione rerum. Eos nemo
                  repellendus id quos ipsa et aperiam molestiae.
                </p>
              </div>
            </div>
            <div className="card2P">
              <div className="card2C">
                <p>NAME</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4">
                  Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                  laborum facere aut natus perferendis eos omnis facere est
                  dolorum unde et autem illum qui ratione rerum. Eos nemo
                  repellendus id quos ipsa et aperiam molestiae.
                </p>
              </div>
            </div>
            <div className="card2P">
              <div className="card2C">
                <p>NAME</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4">
                  Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                  laborum facere aut natus perferendis eos omnis facere est
                  dolorum unde et autem illum qui ratione rerum. Eos nemo
                  repellendus id quos ipsa et aperiam molestiae.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeacherHome() {
  const [disSubjects, setdisSubjects] = useState("True");
  const [disCourse, setdisCourse] = useState("False");
  const [disReviews, setdisReviews] = useState("False");
  function dispSubjects() {
    if (disCourse == "True" || disReviews == "True") {
      setdisCourse("False");
      setdisReviews("False");
      document.getElementById("tutorReviews").style.display = "none";
      document.getElementById("tutorCourse").style.display = "none";
    }

    document.getElementById("tutorSubjects").style.display = "flex";
    setdisSubjects("True");
  }

  function dispCourses() {
    if (disSubjects == "True" || disReviews == "True") {
      setdisSubjects("False");
      setdisReviews("False");
      document.getElementById("tutorReviews").style.display = "none";
      document.getElementById("tutorSubjects").style.display = "none";
    }

    document.getElementById("tutorCourse").style.display = "flex";
    setdisCourse("True");
  }

  function dispReviews() {
    if (disCourse == "True" || disSubjects == "True") {
      setdisCourse("False");
      setdisSubjects("False");
      document.getElementById("tutorCourse").style.display = "none";
      document.getElementById("tutorSubjects").style.display = "none";
    }

    document.getElementById("tutorReviews").style.display = "flex";
    setdisReviews("True");
  }

  const closeDiv = () => {
    document.getElementById("editDiv").style.display = "none";
  };

  const openDiv = () => {
    document.getElementById("editDiv").style.display = "flex";
  };

  const saveDets = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {auth.currentUser ? (
        <>
          <div id="editDiv" className="edit-profile-div">
            <div className="edit-profile-section">
              <div className="edit-head">
                <p className="edit-head-text">Edit profile</p>
                <p onClick={closeDiv} className="close">
                  Close
                </p>
              </div>
              <div className="edit-lower">
                <form className="editForm">
                  <textarea
                    className="editTxtArea"
                    placeholder="Enter bio here"
                  ></textarea>
                  <input
                    className="editInp"
                    placeholder="Enter the experiece in terms of years (numbers)"
                    type="number"
                  />
                  <input
                    className="subInp"
                    onClick={saveDets}
                    value="Save"
                    type="submit"
                  />
                </form>
              </div>
            </div>
          </div>

          <div className="TeacherHomeComp">
            <div className="TeacherHomeDiv1">{/* <Nav /> */}</div>

            <div className="mainTutor">
              <div className="mainTutorBox">
                <div className="mainTutorSubBox">
                  <div className="mainTutorR1">
                    <img src={profile} className="mainTutorImg" />
                    <div className="mainTutorC1 ">
                      <p className="heading2">Followers</p>
                      <p className="heading2">Education</p>
                      <p className="heading2">Achievement</p>
                      <p className="heading2">Experience</p>
                    </div>
                  </div>
                  <div className="edit-box">
                    <button onClick={openDiv} className="edit-button">
                      {" "}
                      Edit profile{" "}
                    </button>
                  </div>
                </div>
                <div className="tutorMenu">
                  <button
                    className={
                      disSubjects == "True"
                        ? "tutorMenuItems activeTutorMenuItems"
                        : "tutorMenuItems"
                    }
                    onClick={dispSubjects}
                  >
                    Subject
                  </button>
                  <button
                    className={
                      disCourse == "True"
                        ? "tutorMenuItems activeTutorMenuItems"
                        : "tutorMenuItems"
                    }
                    onClick={dispCourses}
                  >
                    Courses
                  </button>
                  <button
                    className={
                      disReviews == "True"
                        ? "tutorMenuItems activeTutorMenuItems"
                        : "tutorMenuItems"
                    }
                    onClick={dispReviews}
                  >
                    Reviews
                  </button>
                </div>
                <hr />
                <div className="tutorContent">
                  <div className="mainTutor1Text" id="tutorSubjects">
                    <div className="alignCenter ">Subjects</div>
                    <div className="subjectDiv">
                      <div className="subjectC">Subject</div>
                      <div className="subjectC">Subject</div>
                      <div className="subjectC">Subject</div>
                    </div>
                  </div>
                  <div className="mainTutor1Text" id="tutorReviews">
                    <div className="alignCenter ">Student Reviews</div>
                    <div className="homeChild3P">
                      <div className="homeChild3C">
                        <div className="card2P">
                          <div className="card2C">
                            <p>NAME</p>
                            <img src={profile} className="imageProfile"></img>
                            <p className="heading4">
                              Lorem ipsum dolor sit amet. Est reprehenderit
                              impedit ab laborum facere aut natus perferendis
                              eos omnis facere est dolorum unde et autem illum
                              qui ratione rerum. Eos nemo repellendus id quos
                              ipsa et aperiam molestiae.
                            </p>
                          </div>
                        </div>
                        <div className="card2P">
                          <div className="card2C">
                            <p>NAME</p>
                            <img src={profile} className="imageProfile"></img>
                            <p className="heading4">
                              Lorem ipsum dolor sit amet. Est reprehenderit
                              impedit ab laborum facere aut natus perferendis
                              eos omnis facere est dolorum unde et autem illum
                              qui ratione rerum. Eos nemo repellendus id quos
                              ipsa et aperiam molestiae.
                            </p>
                          </div>
                        </div>
                        <div className="card2P">
                          <div className="card2C">
                            <p>NAME</p>
                            <img src={profile} className="imageProfile"></img>
                            <p className="heading4">
                              Lorem ipsum dolor sit amet. Est reprehenderit
                              impedit ab laborum facere aut natus perferendis
                              eos omnis facere est dolorum unde et autem illum
                              qui ratione rerum. Eos nemo repellendus id quos
                              ipsa et aperiam molestiae.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="courseDiv" id="tutorCourse">
                    <div className="alignCenter"> Courses</div>
                    <div className="courseCards">
                      <div className="courseCard">
                        <div className="courses-item_bg"></div>
                        <div className="cardCont">
                          <p className="courseName">COURSE NAME</p>
                          <p className="courseDate">START:15/04/2024</p>
                        </div>
                      </div>
                      <div className="courseCard">
                        <div className="courses-item_bg red"></div>
                        <div className="cardCont">
                          <p className="courseName">COURSE NAME</p>
                          <p className="courseDate">START:15/04/2024</p>
                        </div>
                      </div>
                      <div className="courseCard">
                        <div className="courses-item_bg blue"></div>
                        <div className="cardCont">
                          <p className="courseName">COURSE NAME</p>
                          <p className="courseDate">START:15/04/2024</p>
                        </div>
                      </div>
                      <div className="courseCard">
                        <div className="courses-item_bg lgreen"></div>
                        <div className="cardCont">
                          <p className="courseName">COURSE NAME</p>
                          <p className="courseDate">START:15/04/2024</p>
                        </div>
                      </div>
                      <div className="courseCard">
                        <div className="courses-item_bg lblue"></div>
                        <div className="cardCont">
                          <p className="courseName">COURSE NAME</p>
                          <p className="courseDate">START:15/04/2024</p>
                        </div>
                      </div>
                      <div className="courseCard">
                        <div className="courses-item_bg dgreen"></div>
                        <div className="cardCont">
                          <p className="courseName">COURSE NAME</p>
                          <p className="courseDate">START:15/04/2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="msgContainer">
            <div className="msgIcon">
              <div className="overlayMessage " id="overlayMessage">
                <div className="overlayMessageChildren">
                  <span className="overlayMessageChildren1">
                    <div className="messageTop">
                      <p>Message</p>
                      <img
                        className="downButton"
                        onClick={closeMsgDialog}
                        src={down}
                      />
                    </div>
                    <div className="message-box">
                      <div className="msg left-msg">
                        <p className="left">Hello, How may I help you!</p>
                      </div>
                      <div className="msg right-msg">
                        <p className="right">
                          I want to communicate about your experience.
                        </p>
                      </div>
                    </div>
                    <div className="messageInput">
                      <input
                        type="text"
                        className="inputMsg"
                        placeholder="Type your message here"
                      />
                      <img src={send} className="sendButton" />
                    </div>
                  </span>
                </div>
              </div>
              <img
                src={icon}
                className="msgImg"
                onClick={openMsgDialog}
                id="MsgBtn"
              />
            </div>
          </div> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
}

function CoursePage() {
  const handlePayment = async (e) => {
    e.preventDefault();
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const options = {
        key: "rzp_test_weoJG7e0Pl1Evf", // Replace with your Razorpay Key ID
        amount: 500 * 100, // amount in paisa
        currency: "INR",
        handler: function (response) {
          alert("Payment successful!");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };
  };

  return (
    <div className="CoursePage">
      <div className="course-box">
        <div className="course-box-upper">
          <div className="course-box-upper-right">
            <p className="course-name">Course Name</p>
            <p className="course-by">by teacher name</p>
          </div>
          <div className="course-box-upper-left">
            <p className="course-price">₹500/-</p>
            <button onClick={handlePayment} className="buy-now">Buy now</button>
          </div>
        </div>
        <div className="course-box-lower">
          <div className="syllabus-box-main">
            <p className="course-sub-head">Syllabus covered</p>
            <div className="syllabus-box">
              <div className="topic-box topic-box-top">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Topic Name</p>
              </div>
            </div>
          </div>
          <div className="syllabus-box-main">
            <p className="course-sub-head">Benefits</p>
            <div className="syllabus-box">
              <div className="topic-box topic-box-top">
                <img className="read" src={read} />
                <p className="topic">Group Chat</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Personalised Doubt Section</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Proper Assignments</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">Class Notes Sharing</p>
              </div>
              <div className="topic-box">
                <img className="read" src={read} />
                <p className="topic">One to One conversation with tutor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TutorPage() {
  const [disp, setDisp] = useState("False");
  function openMsgDialog() {
    let a = document.getElementById("overlayMessage");
    a.style.display = "flex";
    disp == "False" ? setDisp("True") : setDisp("False");
    document.getElementById("MsgBtn").style.visibility = "hidden";
  }
  function closeMsgDialog() {
    let a = document.getElementById("overlayMessage");
    a.style.display = "none";
    setDisp("False");
    document.getElementById("MsgBtn").style.visibility = "visible";
  }
  return (
    <div className="TutorPage">
      <div className="backP">
        <Link to="/Mastertutor/educators">
          <img src={arrow} className="back" />
        </Link>
        <div className="heading1">Name</div>
        <div className="starP">
          <img src={star} className="star1"></img>
          <p className="starCount">100</p>
        </div>
      </div>
      <div className="mainTutor">
        <div className="mainTutorBox">
          <div className="mainTutorR1">
            <img src={profile} className="mainTutorImg" />
            <div className="mainTutorC1 ">
              <p className="heading2">Followers</p>
              <p className="heading2">Education</p>
              <p className="heading2">Achievement</p>
              <p className="heading2">Experience</p>
            </div>
          </div>
          <div className="mainTutor1Text">
            <div className="alignCenter ">Subjects</div>
            <div className="subjectDiv">
              <div className="subjectC">Subject</div>
              <div className="subjectC">Subject</div>
              <div className="subjectC">Subject</div>
            </div>
          </div>
          <div className="mainTutor1Text">
            <div className="alignCenter ">Student Reviews</div>
            <div className="homeChild3P">
              <div className="homeChild3C">
                <div className="card2P">
                  <div className="card2C">
                    <p>NAME</p>
                    <img src={profile} className="imageProfile"></img>
                    <p className="heading4">
                      Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                      laborum facere aut natus perferendis eos omnis facere est
                      dolorum unde et autem illum qui ratione rerum. Eos nemo
                      repellendus id quos ipsa et aperiam molestiae.
                    </p>
                  </div>
                </div>
                <div className="card2P">
                  <div className="card2C">
                    <p>NAME</p>
                    <img src={profile} className="imageProfile"></img>
                    <p className="heading4">
                      Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                      laborum facere aut natus perferendis eos omnis facere est
                      dolorum unde et autem illum qui ratione rerum. Eos nemo
                      repellendus id quos ipsa et aperiam molestiae.
                    </p>
                  </div>
                </div>
                <div className="card2P">
                  <div className="card2C">
                    <p>NAME</p>
                    <img src={profile} className="imageProfile"></img>
                    <p className="heading4">
                      Lorem ipsum dolor sit amet. Est reprehenderit impedit ab
                      laborum facere aut natus perferendis eos omnis facere est
                      dolorum unde et autem illum qui ratione rerum. Eos nemo
                      repellendus id quos ipsa et aperiam molestiae.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="alignCenter ">Courses</div>

          <div className="courseDiv">
            <Link to="/Mastertutor/course-page">
              <div className="courseCard">
                <div className="courses-item_bg"></div>
                <div className="cardCont">
                  <p className="courseName">COURSE NAME</p>
                  <p className="courseDate">START:15/04/2024</p>
                </div>
              </div>
            </Link>

            <div className="courseCard">
              <div className="courses-item_bg red"></div>
              <div className="cardCont">
                <p className="courseName">COURSE NAME</p>
                <p className="courseDate">START:15/04/2024</p>
              </div>
            </div>
            <div className="courseCard">
              <div className="courses-item_bg blue"></div>
              <div className="cardCont">
                <p className="courseName">COURSE NAME</p>
                <p className="courseDate">START:15/04/2024</p>
              </div>
            </div>
            <div className="courseCard">
              <div className="courses-item_bg lgreen"></div>
              <div className="cardCont">
                <p className="courseName">COURSE NAME</p>
                <p className="courseDate">START:15/04/2024</p>
              </div>
            </div>
            <div className="courseCard">
              <div className="courses-item_bg lblue"></div>
              <div className="cardCont">
                <p className="courseName">COURSE NAME</p>
                <p className="courseDate">START:15/04/2024</p>
              </div>
            </div>
            <div className="courseCard">
              <div className="courses-item_bg dgreen"></div>
              <div className="cardCont">
                <p className="courseName">COURSE NAME</p>
                <p className="courseDate">START:15/04/2024</p>
              </div>
            </div>
          </div>
          <div className="msgContainer">
            <div className="msgIcon">
              <div className="overlayMessage " id="overlayMessage">
                <div className="overlayMessageChildren">
                  <span className="overlayMessageChildren1">
                    <div className="messageTop">
                      <p>Message</p>
                      <img
                        className="downButton"
                        onClick={closeMsgDialog}
                        src={down}
                      />
                    </div>
                    <div className="message-box">
                      <div className="msg left-msg">
                        <p className="left">Hello, How may I help you!</p>
                      </div>
                      <div className="msg right-msg">
                        <p className="right">
                          I want to communicate about your experience.
                        </p>
                      </div>
                    </div>
                    <div className="messageInput">
                      <input
                        type="text"
                        className="inputMsg"
                        placeholder="Type your message here"
                      />
                      <img src={send} className="sendButton" />
                    </div>
                  </span>
                </div>
              </div>
              <img
                src={icon}
                className="msgImg"
                onClick={openMsgDialog}
                id="MsgBtn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Site;
