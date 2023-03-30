import React,{useState,useEffect} from "react";
import Axios from 'axios';



function Table() {
    const [myDetails, setMyDetails] = useState([]);
    const getApiData = async()=>{
        const res = await Axios.get('http://localhost:5000/');
        setMyDetails(res.data);
    }
    useEffect(()=>{
        getApiData();
    },[]);

    // useEffect(() => {
    //     Axios.get('http://localhost:5000/')
    //         .then((res) => {
    //             setMyDetails(res.data);
    //             console.log(myDetails);
    //         })
    //         .catch(err => console.log(err));
    // })


    return (
        <div>
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
                            <tr key={index}>
                                <td><input type={"checkbox"}></input></td>
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
            <button className="btn btn-dark btn-lg download-btn">Send</button>
        </div>

    )
}

export default Table;