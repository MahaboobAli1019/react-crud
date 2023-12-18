import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

export default function DataFdit() {

    // To get the value From the Previce Page
    const location = useLocation();
    const id = location.state.id; //assigning value to a variable

    // Navigation For Home Page
    const navigate = useNavigate();

    // Declaring Variables to assign values
    const [product, setProduct] = useState('');
    const [category, setCategory] = useState('');
    const [cost, setCost] = useState('');

    // Data Fetching Form API to Display
    useEffect(() => {
        fetch(`https://sample.thefuturefame.com/showOne/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCategory(data.catg);   // assigning value to the product variable
                setProduct(data.pname);   // assigning value to the category variable
                setCost(data.cost);       // assigning value to the cost variable
            });
    }, [id]);

    //   Handling Update Function
    const HandalUpdate = useCallback((event) => {
        event.preventDefault();
        if (product === '') {
            toast.error('Please Enter Product Name');
        } else if (category === '') {
            toast.error('Please Enter Category Name');
        } else if (cost === '') {
            toast.error('Please Enter Cost');
        }
        else {
            axios.post(`https://sample.thefuturefame.com/editProduct/${id}`, {
                pname: product,
                catg: category,
                cost: cost
            })
                .then((data) => {
                    if (data.status === 200) {
                        toast.success('Updated Successfully', {
                            autoClose: 500,
                            onClose: () => {
                                setTimeout(() => {
                                    navigate('../');
                                }, 1500);
                            },
                        });
                    } else {
                        toast.error("Data Not Updated");
                    }
                })
        }
    }, [product, category, cost, navigate,id])

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <div className='card m-5'>
                            <div className='card-header'>
                                <h2>Edit Product</h2>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-12 mb-2'>
                                        <label>Product Name</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            value={product}
                                            onChange={(e) => setProduct(e.target.value)}
                                        />
                                    </div>
                                    <div className='col-md-12 mb-2'>
                                        <label>Category</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        />
                                    </div>
                                    <div className='col-md-12 mb-2'>
                                        <label>Cost</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            value={cost}
                                            onChange={(e) => setCost(e.target.value)}
                                        />
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-md-6'>
                                            <Link to='/' className='btn btn-danger'>Back</Link>
                                        </div>
                                        <div className='col-md-6'>
                                            <button type='submit' className='btn btn-primary' style={{ float: 'right' }} onClick={HandalUpdate}>Update</button>
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
