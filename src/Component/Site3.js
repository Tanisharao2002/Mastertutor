import "./Home2.css";
import left from "./Images/left-next.png";
import right from "./Images/right-next.png";
import { useLocation } from "react-router-dom";
import pdff from "./Images/pdf.png";
import { useParams, Outlet } from "react-router-dom";
import notes from "./Images/notes.png";
import doubt from "./Images/doubt.png";
import doubtw from "./Images/doubtW.png";
import assignment from "./Images/assignment.png";
import assignmentw from "./Images/assignmentW.png";
import chat from "./Images/chat.png";
import chatw from "./Images/chatW.png";
import notesw from "./Images/notesW.png";
import { Routes, Route } from "react-router-dom";
import profile from "./Images/profile.jpg";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import downloads from "./Images/downloads.png"
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection } from "firebase/firestore";
import filter from "./Images/filter.png";
import "./Educator.css";
import "./Nav.css";
import signOut from "./Images/signOut.png";
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
import group from "./Images/group.png"

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
        <Route
          path="/Mastertutor/educators/page/:teacherName"
          element={<TutorPage />}
        />
        <Route path="/Mastertutor/profile" element={<TeacherHome />} />
        <Route path="/Mastertutor/signIn" element={<SignIn />} />
        <Route path="/Mastertutor/signUp" element={<SignUp />} />
        <Route path="/Mastertutor/courses" element={<Courses />} />
        <Route path="/Mastertutor/feedback" element={<Feedback />} />
        <Route path="/Mastertutor/course-page" element={<CoursePage />}>
          <Route index element={<CourseDefault />} />
          <Route
            path="/Mastertutor/course-page/chats"
            element={<CourseChats />}
          />
          <Route
            path="/Mastertutor/course-page/notes"
            element={<CourseNotes />}
          />
          <Route
            path="/Mastertutor/course-page/assignments"
            element={<CourseAssignment />}
          />
          <Route
            path="/Mastertutor/course-page/doubts"
            element={<CourseDoubts />}
          />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useAuthState(auth);
  const userRef = firestore.collection("users");
  const [users] = useCollectionData(userRef);
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
              to="/Mastertutor/courses"
              className={
                isActive("/Mastertutor/courses")
                  ? "menu-head active"
                  : "menu-head"
              }
            >
              Courses
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

function Home() {
  const teacherRef = firestore.collection("teachers");
  const [teachers] = useCollectionData(teacherRef);
  const feedbackRef = firestore.collection("Feedback");
  const [feedbacks] = useCollectionData(feedbackRef);
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
                "Welcome to Master Tutor, your gateway to personalized learning
                excellence! Join us on a journey where knowledge knows no
                bounds. With expert guidance and tailored support, we're here to
                empower you to reach new heights of academic success. Let's
                embark on this educational adventure together!"
              </p>
              <button className="btn1">Explore</button>
            </div>
          </div>
        </div>
        <p className="alignCenter" id="Educators">
          Our Educators
        </p>
        <Link to="/Mastertutor/educators" className="alignEnd linkText">
          View All
        </Link>
        <div className="homeChild2P">
          <div className="homeChild2">
            {teachers &&
              teachers.map((teacher) => {
                console.log(teacher);
                return (
                  <div className="card1">
                    <div className="card1Children">
                      <div className="cardCol1">
                        <img
                          src={profile}
                          className="imageProfile"
                          alt="Profile"
                        />
                        <div className="tutor-right">
                          <p className="heading2">{teacher.name}</p>

                          <div className="cardCol2Child">
                            <div className="cardCol2Child1">
                              <p className="heading3 bold">23</p>
                              <p className="heading4">Million</p>
                            </div>
                            <div className="cardCol2Child1">
                              <p className="heading3 bold">{teacher.exp}</p>
                              <p className="heading4">yrs exp.</p>
                            </div>
                            <div className="cardCol2Child1">
                              <p className="heading3 bold">
                                {teacher.totalCourses}
                              </p>
                              <p className="heading4">courses</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <>
                        <div className="cardCol2">
                          <p className="heading3 cardBio">{teacher.Bio}</p>
                          {/* <Link to="/Mastertutor/educators/page" className="btn2">
                              Visit Profile
                            </Link> */}
                          {/* const params = useParams()
    
                            localhost:3000/Mastertutor/tanisharao
                            path="/Mastertutor/:tutorID" */}
                        </div>
                        <Link
                          to={`/Mastertutor/educators/page/`}
                          className="btn2"
                        >
                          Visit Profile
                        </Link>
                      </>
                    </div>
                  </div>
                );
              })}
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

        <p className="alignCenter">Feedbacks</p>
        <Link to="/Mastertutor/feedback" className="alignEnd linkText">
          View All
        </Link>
        <div className="homeChild3P">
          <div className="homeChild3C">
            {feedbacks &&
              feedbacks.map((fback) => {
                return (
                  <div className="card2P">
                    <div className="card2C">
                      <p>{fback.studentName}</p>
                      <img src={profile} className="imageProfile"></img>
                      <p>{fback.teacherName}</p>
                      <p className="heading4 btext">{fback.teacherFeedback}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
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
  const studentRef = firestore.collection("students");
  const teacherRef = firestore.collection("teachers");
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

      if (role == "Tutor") {
        await teacherRef.doc(user.uid).set({
          name: fullName,
          email: email,
          role: role,
          uid: user.uid,
          totalCourses: 0,
        });
      } else {
        await studentRef.doc(user.uid).set({
          name: fullName,
          email: email,
          role: role,
          uid: user.uid,
          totalCourses: 0,
        });
      }

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
                  <option value="Tutor" className="optionSelect">
                    Tutor
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
  const teacherRef = firestore.collection("teachers");
  const [teachers] = useCollectionData(teacherRef);

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
            {teachers &&
              teachers.map((teacher) => {
                console.log(teacher);
                return (
                  <div className="card1">
                    <div className="card1Children">
                      <div className="cardCol1">
                        <img
                          src={profile}
                          className="imageProfile"
                          alt="Profile"
                        />
                        <div className="tutor-right">
                          <p className="heading2">{teacher.name}</p>

                          <div className="cardCol2Child">
                            <div className="cardCol2Child1">
                              <p className="heading3 bold">23</p>
                              <p className="heading4">Million</p>
                            </div>
                            <div className="cardCol2Child1">
                              <p className="heading3 bold">{teacher.exp}</p>
                              <p className="heading4">yrs exp.</p>
                            </div>
                            <div className="cardCol2Child1">
                              <p className="heading3 bold">
                                {teacher.totalCourses}
                              </p>
                              <p className="heading4">courses</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <>
                        <div className="cardCol2">
                          <p className="heading3 cardBio">{teacher.Bio}</p>
                          {/* <Link to="/Mastertutor/educators/page" className="btn2">
                              Visit Profile
                            </Link> */}
                          {/* const params = useParams()
    
                            localhost:3000/Mastertutor/tanisharao
                            path="/Mastertutor/:tutorID" */}
                        </div>
                        <Link
                          to={`/Mastertutor/educators/page/`}
                          className="btn2"
                        >
                          Visit Profile
                        </Link>
                      </>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Courses() {
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
  const [color, setColor] = useState("red");
  const colors = [
    "red",
    "yellow",
    "blue",
    "lightBlue",
    "pink",
    "green",
    "darkGreen",
    "orange",
  ];
  function getRandomColor() {
    let i = Math.floor(Math.random());
    setColor(colors[i]);
  }
  useEffect(() => {
    setColor(getRandomColor());
  });
  return (
    <div className="freeComponent">
      {/* <Nav /> */}
      <div className="freeParent">
        <p className="heading1">Courses</p>
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
        <div className="courseComp">
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
            <Link to="/Mastertutor/course-page">
              <div className="courseCard">
                <div className="courses-item_bg"></div>
                <div className="cardCont">
                  <p className="courseName">COURSE NAME</p>
                  <p className="courseDate">START:15/04/2024</p>
                </div>
              </div>
            </Link>
            <Link to="/Mastertutor/course-page">
              <div className="courseCard">
                <div className="courses-item_bg"></div>
                <div className="cardCont">
                  <p className="courseName">COURSE NAME</p>
                  <p className="courseDate">START:15/04/2024</p>
                </div>
              </div>
            </Link>
            <Link to="/Mastertutor/course-page">
              <div className="courseCard">
                <div className="courses-item_bg"></div>
                <div className="cardCont">
                  <p className="courseName">COURSE NAME</p>
                  <p className="courseDate">START:15/04/2024</p>
                </div>
              </div>
            </Link>
            <Link to="/Mastertutor/course-page">
              <div className="courseCard">
                <div className="courses-item_bg"></div>
                <div className="cardCont">
                  <p className="courseName">COURSE NAME</p>
                  <p className="courseDate">START:15/04/2024</p>
                </div>
              </div>
            </Link>
            <Link to="/Mastertutor/course-page">
              <div className="courseCard">
                <div className="courses-item_bg"></div>
                <div className="cardCont">
                  <p className="courseName">COURSE NAME</p>
                  <p className="courseDate">START:15/04/2024</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feedback() {
  const feedbackRef = firestore.collection("Feedback");
  const [feedbacks] = useCollectionData(feedbackRef);

  const [feedback, setFeedback] = useState("");
  const [tname, setTName] = useState("");
  const [studentName, setStudentName] = useState("");
  const handlePost = () => {
    const feedbackId = feedbackRef.doc().id;
    feedbackRef.doc(feedbackId).set(
      {
        teacherName: tname,
        teacherFeedback: feedback,
        studentName: studentName,
      },
      {
        merge: true,
      }
    );
    setTName("");
    setFeedback("");
    setStudentName("");
  };
  return (
    <div className="FeedbackComp">
      {/* <Nav /> */}
      <div className="feedbackParent">
        <p className="heading1">Feedback</p>
        <form className="feedbackDiv1" onSubmit={handlePost}>
          <input
            type="text"
            className="inputName"
            value={tname}
            onChange={(e) => {
              setTName(e.target.value);
            }}
            placeholder="Teacher's Name"
            required
          />
          <input
            type="text"
            className="inputName"
            value={studentName}
            onChange={(e) => {
              setStudentName(e.target.value);
            }}
            placeholder="Your Name"
            required
          />
          <textarea
            type="textarea"
            className="inputFeedback"
            placeholder="Type your feedback here and tag the respective tutor"
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
            required
          />
          <input type="submit" value="Submit" className="post-button" />
        </form>
        <div className="homeChild3P">
          <div className="homeChild3C">
            {feedbacks &&
              feedbacks.map((fback) => {
                return (
                  <div className="card2P">
                    <div className="card2C">
                      <p>{fback.studentName}</p>
                      <img src={profile} className="imageProfile"></img>
                      <p>{fback.teacherName}</p>
                      <p className="heading4 btext">{fback.teacherFeedback}</p>
                    </div>
                  </div>
                );
              })}
            {/* <div className="card2P">
              <div className="card2C">
                <p>Mahendra</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4 btext">
                  "Ms. Johnson is an amazing teacher who truly cares about her
                  students' success. She is patient, understanding, and always
                  willing to provide extra help when needed. Her creative
                  teaching methods make learning enjoyable, and she inspires her
                  students to strive for excellence."
                </p>
              </div>
            </div>
            <div className="card2P">
              <div className="card2C">
                <p>Manish</p>
                <img src={profile} className="imageProfile"></img>
                <p className="heading4 btext">
                  "I had the privilege of being taught by Professor Lee, and I
                  can confidently say he is one of the best educators I've ever
                  had. His lectures are engaging, thought-provoking, and filled
                  with real-world examples. He challenges his students to think
                  critically and pushes them to reach their full potential."
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeacherHome() {
  const [disSubjects, setdisSubjects] = useState("True");
  const [disCourse, setdisCourse] = useState("False");
  const feedbackRef = firestore.collection("Feedback");
  const [feedbacks] = useCollectionData(feedbackRef);
  const [disCourseStudent, setdisCourseStudent] = useState("True");
  const [disReviews, setdisReviews] = useState("False");
  const usersRef = firestore.collection("users");
  const [usersT] = useCollectionData(usersRef);
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

  const [cName, setCName] = useState("");
  const [cStartDate, setStartDate] = useState("");
  const courseRef = firestore.collection("Courses");
  const date = new Date();
  const teacherRef = firestore.collection("teachers");
  const [teacher] = useCollectionData(teacherRef);

  const handleCreate = async (teacherId) => {
    const tCourse = teacherRef.doc(teacherId).collection("Courses");
    const courseId = tCourse.doc().id;
    await tCourse.doc(courseId).set(
      {
        courseName: cName,
        courseDate: cStartDate,
        cid: courseId,
      },
      {
        merge: true,
      }
    );

    await courseRef.doc(courseId).set(
      {
        courseName: cName,
        courseDate: cStartDate,
        cid: courseId,
      },
      {
        merge: true,
      }
    );
    setCName("");
    setStartDate("");
  };

  return (
    <>
      {auth.currentUser ? (
        usersT &&
        usersT.map((ut) =>
          ut.uid == auth.currentUser.uid ? (
            ut.role == "Tutor" ? (
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
                        <input
                          className="editInp"
                          placeholder="Enter name"
                          type="text"
                        />
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
                            <p className="pname">{ut.name}</p>
                            <p className="bio">{ut.bio}</p>
                            <p className="bio">
                              {ut.totalCourses} courses offered
                            </p>
                            <p className="bio">{ut.exp} yrs experience</p>
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

                              {feedbacks &&
                                feedbacks.map((fbacks) => {
                                  return fbacks.teacherName === ut.name ? (
                                    <div className="card2P" key={fbacks.id}>
                                      <div className="card2C">
                                        <p>{fbacks.studentName}</p>
                                        <img
                                          src={profile}
                                          className="imageProfile"
                                          alt="Profile"
                                        ></img>
                                        <p className="heading4">
                                          Lorem ipsum dolor sit amet. Est
                                          reprehenderit impedit ab laborum
                                          facere aut natus perferendis eos omnis
                                          facere est dolorum unde et autem illum
                                          qui ratione rerum. Eos nemo
                                          repellendus id quos ipsa et aperiam
                                          molestiae.
                                        </p>
                                      </div>
                                    </div>
                                  ) : null;
                                })}
                            </div>
                          </div>
                        </div>
                        <div className="courseDiv" id="tutorCourse">
                          <div className="alignCenter"> Courses</div>
                          <div className="addCourse">
                            <input
                              type="text"
                              placeholder="Course Name"
                              className="cName"
                              value={cName}
                              onChange={(e) => setCName(e.target.value)}
                            />
                            <input
                              type="date"
                              className="cDate"
                              value={cStartDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                            <button
                              className="btn4"
                              onClick={(e) =>
                                handleCreate(auth.currentUser.uid)
                              }
                            >
                              Create Course
                            </button>
                          </div>
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
            ) : ut.role == "Student" ? (
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
                        <input
                          className="editInp"
                          placeholder="Enter name"
                          type="text"
                        />
                        <textarea
                          className="editTxtArea"
                          placeholder="Enter bio here"
                        ></textarea>

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
                          <div className="mainTutorC1">
                            <p className="pname">{ut.name}</p>
                            <p className="bio">{ut.bio}</p>
                          </div>
                        </div>
                        <div className="edit-box">
                          <button onClick={openDiv} className="edit-button">
                            {" "}
                            Edit profile{" "}
                          </button>
                        </div>
                      </div>

                      <hr />
                      <div className="tutorContent">
                        <div className="courseDiv">
                          <div className="alignCenter coursesavailed">
                            {" "}
                            Courses Owned
                          </div>
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
            ) : null
          ) : null
        )
      ) : (
        <SignIn />
      )}
    </>
  );
}

function CoursePage() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
            <button onClick={handlePayment} className="buy-now">
              Buy now
            </button>
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

        <br />
        <br />

        <div className="bought-course-main">
          <div className="bought-course-box">
            <div className="bought-course-box-upper">
              <div className="bought-course-box-upper-left">
                <p className="bought-course-name">Course name</p>
              </div>
              <div className="bought-course-box-upper-right">
                <img className="group-icon" src={group} />
                <p className="group-text">
                  1234
                </p>
              </div>
            </div>
            <div className="bought-course-box-lower">
              <div className="bought-course-box-lower-left">
                <div className="bought-course-menu">
                  <div className="bought-course-menu-item">
                    <Link to="/Mastertutor/course-page/chats">
                      <img
                        className="bought-course-left-img"
                        src={
                          isActive("/Mastertutor/course-page/chats")
                            ? chat
                            : chatw
                        }
                      />
                    </Link>
                  </div>

                  <div className="bought-course-menu-item">
                    <Link to="/Mastertutor/course-page/notes">
                      <img
                        className="bought-course-left-img"
                        src={
                          isActive("/Mastertutor/course-page/notes")
                            ? notes
                            : notesw
                        }
                      />
                    </Link>
                  </div>

                  <div className="bought-course-menu-item">
                    <Link to="/Mastertutor/course-page/assignments">
                      <img
                        className="bought-course-left-img"
                        src={
                          isActive("/Mastertutor/course-page/assignments")
                            ? assignment
                            : assignmentw
                        }
                      />
                    </Link>
                  </div>

                  <div className="bought-course-menu-item">
                    <Link to="/Mastertutor/course-page/doubts">
                      <img
                        className="bought-course-left-img"
                        src={
                          isActive("/Mastertutor/course-page/doubts")
                            ? doubt
                            : doubtw
                        }
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bought-course-box-lower-right">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseChats() {
  return (
    <div className="chat-box">

      <div className="chat-form">


        <div className="message-box-chat">
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
            className="chatInput"
            placeholder="Type your message here"
          />
          {/* <img src={send} className="sendButton" /> */}
        </div>
      </div>
    </div>


  );
}

function CourseNotes() {

  const userRef = firestore.collection("teachers");
  const [teachers] = useCollectionData(userRef)



  return (
    <div className="chat-box">
      <div className="chat-box-sub">

        <div className="notes-lower">
          {
            teachers && teachers.map((t) => (
              auth.currentUser.uid == t.uid
                ? (
                  <div className="add-notes-box">
                    <form className="add-notes-form">
                      <p className="form-head">Add notes</p>
                      <input
                        type="text"
                        className="add-notes-input"
                        placeholder="Enter file name"
                        required
                      />
                      <input type="file" className="add-notes-input" required />
                      <input
                        type="submit"
                        className="add-notes-submit"
                        value="Upload"
                        required
                      />
                    </form>
                  </div>
                )
                : null
            ))
          }
          <div className="form-head-div">
            <p className="form-head">Available notes</p>
          </div>
          <div className="notes">
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function CourseAssignment() {


  const userRef = firestore.collection("teachers");
  const [teachers] = useCollectionData(userRef)

  const usersRef = firestore.collection("users");
  const [users] = useCollectionData(usersRef)



  return (
    <div className="chat-box">
      <div className="chat-box-sub">

        <div className="notes-lower">
          {
            teachers && teachers.map((t) => (
              auth.currentUser.uid == t.uid
                ? (
                  <div className="add-notes-box">
                    <form className="add-notes-form">
                      <p className="form-head">Add assignment</p>
                      <input
                        type="text"
                        className="add-notes-input"
                        placeholder="Enter assignment name"
                        required
                      />
                      <input type="file" className="add-notes-input" required />
                      <input
                        type="submit"
                        className="add-notes-submit"
                        value="Upload"
                        required
                      />
                    </form>
                  </div>
                )
                : null
            ))
          }
          {
            users && users.map((t) => (
              auth.currentUser.uid == t.uid && t.role == "Student"
                ? (
                  <div className="add-notes-box">
                    <form className="add-notes-form">
                      <p className="form-head">Submit assignment</p>
                      <input
                        type="text"
                        className="add-notes-input"
                        placeholder="Enter assignment name"
                        required
                      />
                      <input type="file" className="add-notes-input" required />
                      <input
                        type="submit"
                        className="add-notes-submit"
                        value="Submit"
                        required
                      />
                    </form>
                  </div>
                )
                : null
            ))
          }
          <div className="form-head-div">
            <p className="form-head">All assignments</p>
          </div>
          <div className="notes">
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
            <div className="note">
              <div className="note-upper">
                <img className="note-img" src={pdff} />
              </div>
              <div className="note-lower">
                <p className="note-name">Note name note namemee</p>
                <img className="download" src={downloads} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function CourseDoubts() {

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const userRef = firestore.collection("teachers");
  const [teachers] = useCollectionData(userRef)

  const usersRef = firestore.collection("users");
  const [users] = useCollectionData(usersRef)

  const [allDoubts, setAllDoubts] = useState(true)
  const [selfDoubts, setSelfDoubts] = useState(false)
  const [doubtOpen, setDoubtOpen] = useState(false)

  return (
    <div className="chat-box">
      <div className="chat-box-sub">

        <div className="notes-lower">

          {
            doubtOpen ? (
              null
            )
              : <div className="form-head-div doubt-head-div">
                <p onClick={() => { setAllDoubts(true); setSelfDoubts(false) }} className={allDoubts ? "form-head dhead dactive" : "form-head dhead"}>All doubts</p>
                {
                  users && users.map((u) => (
                    auth.currentUser.uid == u.uid && u.role == "Student"
                      ? <p className={selfDoubts ? "form-head dhead dactive" : "form-head dhead"} onClick={() => { setAllDoubts(false); setSelfDoubts(true) }}>Self doubts</p>
                      : null
                  ))
                }
              </div>
          }
          {
            allDoubts
              ? doubtOpen ? (
                <div className="open-doubt-main">
                  <div className="open-doubt-box">
                    <div className="close-doubt-box">
                      <p onClick={() => { setDoubtOpen(false) }} className="close-doubt" >Close</p>
                    </div>
                    <p className="open-doubt-text">
                      <span className="open-doubt-head">Doubt : </span>What are self closing tags ?
                    </p>
                    <img className="doubt-img" src={pdff} />

                    <div className="add-notes-box dsolve">
                      <form className="add-notes-form">
                        <p className="form-head">Submit solution</p>
                        <textarea
                          className="solve-text"
                          placeholder="Write solution"
                          required
                        />
                        <input type="file" className="add-notes-input" />
                        <input
                          type="submit"
                          className="add-notes-submit"
                          value="Submit"
                          required
                        />
                      </form>
                    </div>
                    <div className="available-soutions">
                      <p className="form-head">
                        Available solutions
                      </p>
                      <div className="available-soutions-box">
                        <div className="solution">
                          <p className="open-doubt-text">
                            <span className="open-doubt-head">Solution : </span>Hello world python css
                          </p>
                          <img className="doubt-img" src={pdff} />
                        </div>
                        <div className="solution">
                          <p className="open-doubt-text">
                            <span className="open-doubt-head">Solution : </span>Hello world python css
                          </p>
                          <img className="doubt-img" src={pdff} />
                        </div>
                        <div className="solution">
                          <p className="open-doubt-text">
                            <span className="open-doubt-head">Solution : </span>Hello world python css
                          </p>
                          <img className="doubt-img" src={pdff} />
                        </div>
                        <div className="solution">
                          <p className="open-doubt-text">
                            <span className="open-doubt-head">Solution : </span>Hello world python css
                          </p>
                          <img className="doubt-img" src={pdff} />
                        </div>
                      </div>
                    </div>
                  </div>


                </div>

              )
                : <div className="all-doubts">
                  <div onClick={() => { setDoubtOpen(true) }} className="doubt">
                    <p className="doubt-text">
                      <span className="doubt-head">Doubt : </span>What are self closing tags ?
                    </p>
                  </div>
                </div>
              : selfDoubts ?
                doubtOpen ? (
                  <div className="open-doubt-main">
                    <div className="open-doubt-box">
                      <div className="close-doubt-box self-dbox">
                        <p className="close-doubt" >Delete</p>
                        <p onClick={() => { setDoubtOpen(false) }} className="close-doubt" >Close</p>
                      </div>
                      <p className="open-doubt-text">
                        <span className="open-doubt-head">Doubt : </span>Hello world python css
                      </p>
                      <img className="doubt-img" src={pdff} />

                      <div className="available-soutions">
                        <p className="form-head">
                          Available solutions
                        </p>
                        <div className="available-soutions-box">
                          <div className="solution">
                            <p className="open-doubt-text">
                              <span className="open-doubt-head">Solution : </span>Hello world python css
                            </p>
                            <img className="doubt-img" src={pdff} />
                          </div>
                          <div className="solution">
                            <p className="open-doubt-text">
                              <span className="open-doubt-head">Solution : </span>Hello world python css
                            </p>
                            <img className="doubt-img" src={pdff} />
                          </div>
                          <div className="solution">
                            <p className="open-doubt-text">
                              <span className="open-doubt-head">Solution : </span>Hello world python css
                            </p>
                            <img className="doubt-img" src={pdff} />
                          </div>
                          <div className="solution">
                            <p className="open-doubt-text">
                              <span className="open-doubt-head">Solution : </span>Hello world python css
                            </p>
                            <img className="doubt-img" src={pdff} />
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>

                )
                  :
                  <div className="all-doubts">
                    <div className="doubt">
                      <p onClick={() => { setDoubtOpen(true) }} className="doubt-text">
                        <span className="doubt-head">Doubt : </span>Hello world python css
                      </p>
                    </div>
                  </div>
                : null
          }




        </div>
      </div>
    </div>
  );
}
function CourseDefault() {
  return (
    <div className="chat-box">
      <p>Default</p>
    </div>
  );
}
function TutorPage() {
  const { teacherName } = useParams();
  console.log(teacherName);
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
        <div className="heading1"></div>
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
              <p className="pname">Educator Name</p>
              <p className="bio">Educator bio</p>
              <p className="bio">Total courses offered</p>
              <p className="bio">Total yrs experience</p>
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
            <Link to="/Mastertutor/course-page">
              <div className="courseCard">
                <div className="courses-item_bg"></div>
                <div className="cardCont">
                  <p className="courseName">COURSE NAME</p>
                  <p className="courseDate">START:15/04/2024</p>
                </div>
              </div>
            </Link>
            <Link to="/Mastertutor/course-page">
              <div className="courseCard">
                <div className="courses-item_bg"></div>
                <div className="cardCont">
                  <p className="courseName">COURSE NAME</p>
                  <p className="courseDate">START:15/04/2024</p>
                </div>
              </div>
            </Link>
            <Link to="/Mastertutor/course-page">
              <div className="courseCard">
                <div className="courses-item_bg"></div>
                <div className="cardCont">
                  <p className="courseName">COURSE NAME</p>
                  <p className="courseDate">START:15/04/2024</p>
                </div>
              </div>
            </Link>
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
