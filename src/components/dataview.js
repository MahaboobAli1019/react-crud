import React from "react";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaEye } from 'react-icons/fa';
import { FaPenToSquare } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";

function Dataview() {
    // Navigation For Edit and View pages 
    const navigate = useNavigate();

    // Data Fetching Form API to Display
    const [records, setRecords] = useState([]);     // assigning data into a  Variable

    useEffect(() => {
        fetch('https://sample.thefuturefame.com/allItems')
            .then(res => res.json())
            .then(data => {
                setRecords(data)
            })
    }, [])

    // Function to Handle View
    const HandleView = (id) => {
        navigate('../view', { state: { id } });
    }

    // Function to Handle Edit
    const HandleEdit = (id) => {
        navigate('../edit', { state: { id } });
    }

    // Function to Handle Delete
    const HandleDelete = (id) => {
        axios.delete(`https://sample.thefuturefame.com/deleteProduct/${id}`)
            .then((data) => {
                if (data.status === 200) {
                    toast.success('Deleted Successfully');
                    setTimeout(() => {
                        window.location.reload(); // Reload the page
                    }, 1000);
                } else {
                    toast.error("Data Not Deleted");
                }
            })
            .catch((error) => {
                console.error("Error deleting data", error);
                toast.error("Error deleting data");
            });
    };

    return (
        <>
            <div className="container">
                <div className="card mt-5">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h2>Products Details</h2>
                            </div>
                            <div className="col-6">
                                <Link to='/insert'
                                    className="btn btn-info"
                                    style={{ float: 'right' }}>
                                    Add
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Cost</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    records.map((records, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{records.pname}</td>
                                            <td>{records.catg}</td>
                                            <td>{records.cost}</td>
                                            <td><FaEye onClick={(e) => HandleView(records.id)} /> <FaPenToSquare onClick={(e) => HandleEdit(records.id)} /> <FaTrash style={{ color: '#FF7F7F' }} onClick={(e) => HandleDelete(records.id)} /></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dataview;
