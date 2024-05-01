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