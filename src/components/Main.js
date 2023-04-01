import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Popup from 'reactjs-popup';
import Lottie from "lottie-react";
import data from "./data.json";
import { useFormik } from "formik";
import { dataSchema } from "../schemas/dataValidation";


const HOME_URL = "https://red-positive-back.vercel.app/"
// const HOME_URL = "http://localhost:5000/"

const initialValues = {
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: "",
}

function Main() {
    const [myDetails, setMyDetails] = useState([]);
    const [myData, setMyData] = useState([]);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: dataSchema,
        onSubmit: (values) => {
            console.log(values.name, values.phoneNumber, values.email, values.hobbies);
            Axios.post(`${HOME_URL}sendDetails`, { name: values.name, phoneNumber: values.phoneNumber, email: values.email, hobbies: values.hobbies }).then(function (response) {
                console.log(response);
            })
                .catch(function (error) {
                    console.log(error);
                });
            // close();
            refreshPage();
            console.log(errors);
        }

    });

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

    const sendMail = async (content) => {
        let res = await fetch(`${HOME_URL}sendEmail`, {
            method: 'post',
            body: JSON.stringify(content),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await res.json();
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

    function deleteData(e){
        const item = e.target.value;
        Axios.post(`${HOME_URL}deleteData`,{_id:item}).then((response)=>{
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
        // refreshPage();

    }

    function refreshPage() {
        window.location.reload(false);
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

                                                <form onSubmit={handleSubmit}>
                                                    <label htmlFor="name">Name</label>{errors.name && touched.name ? <p className="form-error">{errors.name}</p> : null}
                                                    <input className="form-input" id="name" type="text" placeholder="Enter your name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                                    <label htmlFor="phoneNumber">Phone Number</label>{errors.phoneNumber && touched.phoneNumber ? <p className="form-error">{errors.phoneNumber}</p> : null}
                                                    <input className="form-input" id="phoneNumber" type="tel" placeholder="Enter your phone number" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur}></input>
                                                    <label htmlFor="email">Email</label>{errors.email && touched.email ? <p className="form-error">{errors.email}</p> : null}
                                                    <input className="form-input" id="email" type="email" placeholder="Enter your e-mail" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}></input>
                                                    <label htmlFor="hobbies">Hobbies</label>{errors.hobbies && touched.hobbies ? <p className="form-error">{errors.hobbies}</p> : null}
                                                    <input className="form-input" id="hobbies" type="hobbies" placeholder="Tell us about your hobbies" name="hobbies" value={values.hobbies} onChange={handleChange} onBlur={handleBlur}></input>
                                                    {/* <div onClick={collectData}> */}
                                                    <button type="submit" >Save</button>
                                                </form>
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
                    <th>Delete</th>
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
                                <td><button className="forTable" onClick={deleteData} value={myDetail._id}>Delete</button></td>
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