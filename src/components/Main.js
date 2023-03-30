import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Popup from 'reactjs-popup';
import Lottie from "lottie-react";
import data from "./data.json";
// import Axios from "axios";
// require('dotenv').config();

// import getApiData from "./Table.";
// import Table from "./Table.";

const HOME_URL = "https://red-positive-back.vercel.app/"

function Main() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [myDetails, setMyDetails] = useState([]);
    const [myData, setMyData] = useState([]);

    function addData(e) {
        const item = e.target.value;
        console.log(item);
        setMyData([...myData, myDetails[item]]);
    }

    function filter() {
        const unique = myData.filter((ele, index) => myData.indexOf(ele) === index);
        console.log(unique);
        sendMail(unique);
    }

    const sendMail=async(content)=> {
        let res = await fetch(`${HOME_URL}sendEmail`, {
            method: 'post',
            body: JSON.stringify(content),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await res.json();
        // Axios.post('https://localhost:5000/sendEmail',{myData}).then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        refreshPage();
    }

    const getApiData = async () => {
        console.log(HOME_URL);
        const res = await Axios.get(`${HOME_URL}`);
        setMyDetails(res.data);
    }
    useEffect(() => {
        getApiData();
    }, []);

    function refreshPage() {
        window.location.reload(false);
    }

    const collectData = async () => {
        console.log(name, phoneNumber, email, hobbies);
        Axios.post(`${HOME_URL}sendDetails`,{name, phoneNumber, email, hobbies}).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div>
            <section className="coloured-section">
                <div className="row">
                    <div className="col-lg-6 text">
                        <h1 className="big-heading">Blood is Life, you can give life by donating blood</h1>





                        <Popup trigger={<button id='addDetails' className="btn btn-dark btn-lg download-btn">Add Details</button>}
                            modal nested>{
                                close => (
                                    <div className="popup">
                                        <button className="close-btn" onClick=
                                            {() => close()}>
                                            &times;
                                        </button>
                                        <div className="form">
                                            <h2>New User</h2>
                                            <div className="form-element">
                                                <label for="name">Name</label>
                                                <input className="form-input" type="text" placeholder="Enter your name" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                                                <label for="phoneNumber">Phone Number</label>
                                                <input className="form-input" type="tel" placeholder="Enter your phone number" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
                                                <label for="email">Email</label>
                                                <input className="form-input" type="email" placeholder="Enter your e-mail" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                                <label for="hobbies">Hobbies</label>
                                                <input className="form-input" type="hobbies" placeholder="Tell us about your hobbies" name="hobbies" value={hobbies} onChange={(e) => setHobbies(e.target.value)}></input>
                                                {/* <div onClick={collectData}> */}
                                                <button onClick={() => {
                                                    collectData();
                                                    close();
                                                    refreshPage();
                                                }}>Save</button>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </Popup>
                    </div>

                    <div class="col-lg-6 ">
                        <Lottie animationData={data} loop={true} className="animation" />
                    </div>
                </div>
            </section>
            <table>
                <tr>
                    <th>Checkbox</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Hobbies</th>
                </tr>
                <tbody>
                    {myDetails.map((myDetail, index) => {
                        return (
                            <tr key={myDetail._id}>
                                <td><input type={"checkbox"} onChange={addData} value={index}></input></td>
                                <td>{myDetail._id}</td>
                                <td>{myDetail.name}</td>
                                <td>{myDetail.phoneNumber}</td>
                                <td>{myDetail.email}</td>
                                <td>{myDetail.hobbies}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button className="btn btn-dark btn-lg download-btn" onClick={filter}>Send</button>
        </div>
    );
}

export default Main