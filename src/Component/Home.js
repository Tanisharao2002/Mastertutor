import "./Home.css";
import profile from "./profile.jpg";
import left from "./left-next.png";
import right from "./right-next.png";
import Nav from "./Nav.js";

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

              <button
                onClick={() => {
                  console.log("hello");
                }}
                className="btn1"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
        <p className="alignCenter">Our Educators</p>
        <p className="alignEnd linkText">View All</p>
        <div id="ourEducators" className="homeChild2P">
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

export default Home;
