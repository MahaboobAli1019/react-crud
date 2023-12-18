import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function DataEye() {

    // To get the value From the Previce Page
    const location = useLocation();
    const id = location.state.id; //assigning value to a variable

    // Declaring a variable
    const [records, setRecords] = useState([]);

    useEffect(() => {

        fetch(`https://sample.thefuturefame.com/showOne/${id}`)
            .then(res => res.json())
            .then(data => {
                setRecords(data); // assigning value to the records variable
            })
    }, [setRecords,id])
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <div className='card m-5'>
                            <div className='card-header'>
                                <h2>View Product</h2>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-12 mb-2'>
                                        <label>Product Name</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            value={records.pname}
                                        />
                                    </div>
                                    <div className='col-md-12 mb-2'>
                                        <label>Category</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            value={records.catg}
                                        />
                                    </div>
                                    <div className='col-md-12 mb-2'>
                                        <label>Cost</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            value={records.cost}
                                        />
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-md-12'>
                                            <Link to='/' className='btn btn-danger'>Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        </>
    )
}
