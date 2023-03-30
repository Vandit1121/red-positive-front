import React, { useState} from "react";
import Popup from 'reactjs-popup';
import Lottie from "lottie-react";
import data from "./data.json";
// import getApiData from "./Table.";
// import Table from "./Table.";

function Form() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [hobbies, setHobbies] = useState("");
    
    const collectData = async () => {
        console.log(name, phoneNumber, email, hobbies);
        let data = await fetch("http://localhost:5000/sendDetails", {
            method: 'post',
            body: JSON.stringify({ name, phoneNumber, email, hobbies }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await data.json();
        // return(
        //     <Table />
        // )
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
                                                    close()
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
                       <Lottie animationData={data} loop={true} className="animation"/>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Form