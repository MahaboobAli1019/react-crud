import React from 'react';
import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

export default function DataInsert() {

    // Navigation For Home Page
    const navigate = useNavigate();

    // Declaring Variables to assign values
    const [product, setProduct] = useState('');
    const [category, setCategory] = useState('');
    const [cost, setCost] = useState('');
    const [image, setImage] = useState(null); // Changed to null

    // Function to Handal Submit
    const HandalSubmit = useCallback((event) => {
        event.preventDefault();

        if (!product.trim()) {
            toast.error('Please Enter Product Name');
        } else if (!category.trim()) {
            toast.error('Please Enter Category Name');
        } else if (!cost.trim()) {
            toast.error('Please Enter Cost');
        } else if (!image) {
            toast.error('Please Upload Image');
        } else {
            // console.log(image);
            const formData = new FormData();
            formData.append('pname', product);
            formData.append('catg', category);
            formData.append('cost', cost);
            formData.append('icon', image);

            axios.post("https://sample.thefuturefame.com/AddProduct", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('Saved Successfully', {
                            autoClose: 500,
                            onClose: () => {
                                setTimeout(() => {
                                    navigate('../');
                                }, 1500);
                            },
                        });
                    } else {
                        toast.error("Data Not Saved");
                    }
                })
                .catch((error) => {
                    toast.error("Error occurred while saving data.");
                    console.error("Error:", error);
                });
        }
    }, [product, category, cost, image, navigate]);
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <div className='card m-5'>
                            <div className='card-header'>
                                <h2>Add Product</h2>
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
                                    <div className='col-md-12 mb-2'>
                                        <label>Image</label>
                                        <input
                                            type='file'
                                            className='form-control'
                                            onChange={(e) => {
                                                console.log(e.target.files[0]);
                                                setImage(e.target.files[0])
                                            }}
                                        />
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-md-6'>
                                            <Link to='/' className='btn btn-danger'>Back</Link>
                                        </div>
                                        <div className='col-md-6'>
                                            <button type='submit' className='btn btn-primary' style={{ float: 'right' }} onClick={HandalSubmit}>Save</button>
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
    );
}
