// src/app/CreateListing.tsx
'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useFormState } from '@/store/useFormState';
import FormManager from '../components/formanager'

export default function CreateListing() {
    const { formData, setFormData } = useFormState();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const validationErrors: Record<string, string> = {};
    const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const validateForm = () => {
       // const validationErrors: Record<string, string> = {};
    
        // Text fields validation (required)
        if (!formData.name.trim()) validationErrors.name = "Name is required";
        if (!formData.description.trim()) validationErrors.description = "Description is required";
        if (!formData.address.trim()) validationErrors.address = "Address is required";
    
        // Ensure at least one of the number fields is filled with a valid value
        const isNumericFieldValid =
            (formData.bedrooms && formData.bedrooms > 0) ||
            (formData.bathrooms && formData.bathrooms > 0) ||
            (formData.regularPrice && Number(formData.regularPrice) > 0) ||
            (formData.discountPrice && Number(formData.discountPrice) > 0);
    
        if (!isNumericFieldValid) {
            validationErrors.numericVals = "At least one numeric field (Bedrooms, Bathrooms, Regular Price, or Discount Price) must be filled with a valid value.";
        }
    
        // Ensure at least one checkbox (sale, rent, parking, furnished, or offer) is checked
        const isCheckboxChecked =
            formData.sale || formData.rent || formData.parking || formData.furnished || formData.offer;
    
        if (!isCheckboxChecked) {
            validationErrors.checkboxes  = "At least one option must be selected (Sale, Rent, Parking, Furnished, or Offer).";
        }
    
        // File validation (ensure a file is uploaded)
        if (!formData.file) validationErrors.file = "An image is required";
    
        // Set errors in state
        setErrors(validationErrors);
    
        // Return true if no errors, false otherwise
        return Object.keys(validationErrors).length === 0;
    };
    



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, type, value } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(id, newValue); 
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        //const validationErrors: Record<string, string> = {};
        if (selectedFile) {
            if (!allowedFormats.includes(selectedFile.type)) {
                validationErrors.file="Invalid file type! Please upload a PNG, JPEG, JPG, or GI";
                setErrors(validationErrors);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                return;
            }

            setFormData('file', selectedFile);
            setFormData('preview', URL.createObjectURL(selectedFile));
            setErrors({});
        }
    };
    const handleFileUpload = async () => {
        //const validationErrors: Record<string, string> = {};
        if (!formData.file) {
            validationErrors.file="Please select a valid file before uploading.";
            setErrors(validationErrors);
            return;
        }

        setFormData("loading", true);
        const uploadData = new FormData();
        uploadData.append("file", formData.file);

        try {
            const response = await fetch("/api/fileupload", {
                method: "POST",
                body: uploadData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const result = await response.json();
            setFormData("uploadedFileUrl", result.url);
            setFormData("preview", result.url);
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("File upload failed. Please try again.");
        } finally {
            setFormData("loading", false);
        }
    };

   



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

       
        if (validateForm()) {
            if (!formData.uploadedFileUrl) {
                validationErrors.file="Please upload an image before submitting the listing";
                 setErrors(validationErrors);
                 return;
             }
        } 
        else {
            alert("Please fix the errors before submitting.");
        }
        console.log('Submitting form:', formData);
    };

    return (
        <FormManager>
            <main className="p-3 max-w-6xl m-auto bg-[#e2e8f0] mt-6">
                <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col gap-4 flex-1">
                        <input
                            type="text"
                            placeholder="Name"
                            className="border p-3 rounded-lg"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        <textarea
                            rows={4}
                            placeholder="Description"
                            className="border p-3 rounded-lg"
                            id="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        <input
                            type="text"
                            placeholder="Address"
                            className="border p-3 rounded-lg"
                            id="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                         {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        
                        <div className="flex gap-6 flex-wrap">
                        {['sale', 'rent', 'parking', 'furnished', 'offer'].map((field) => (
                                <div  key={field} className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        id={field}
                                        checked={formData[field as keyof typeof formData] as boolean}
                                        onChange={handleInputChange}
                                    />
                                    <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                                    
                                </div>
                                
                               
                            ))}    
                        </div>
                       
                         {errors.checkboxes && <p className="text-red-500 text-sm">{errors.checkboxes}</p>}
                        
                        
                        {/* <div className="flex flex-wrap gap-6">
                            {['bedrooms', 'bathrooms', 'regular Price', 'discount Price'].map((field) => (
                                <div key={field} className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        id={field}
                                        value={formData[field as keyof typeof formData] as number}
                                        onChange={handleInputChange}
                                        className="border p-3 border-gray-300 rounded-lg w-25 m-auto"
                                    />
                                    <p className='px-5'>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
                                </div>
                            ))}
                        </div> */}


                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                            {['bedrooms', 'bathrooms', 'regular Price ($/Month)', 'discount Price ($/Month)'].map((field) => (
                                <div key={field} className="flex flex-col items-left px-1">
                                    <label htmlFor={field} className="text-sm font-medium text-gray-700">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        type="number"
                                        id={field}
                                        value={formData[field as keyof typeof formData] as number}
                                        onChange={handleInputChange}
                                        className="border p-3 border-gray-300 rounded-lg w-full text-center"
                                    />
                                   
                                </div>
                            ))}
                        </div>
                        {errors.numericVals && <p className="text-red-500 text-sm">{errors.numericVals}</p>}


                        
                    </div>

                    <div className="flex flex-col flex-1 gap-4">
                        <p className="font-semibold">
                            Images:
                            <span className="font-normal text-gray-600 ml-2">
                                The first image will be the cover (max-6)
                            </span>
                        </p>
                        <div className="flex gap-4">
                            <input
                                className="p-3 border border-gray-300 rounded w-full"
                                type="file"
                                accept="image/png, image/jpeg, image/jpg, image/gif"
                                onChange={handleFileChange}
                            />
                             
                             <button
                            type="button"
                            onClick={handleFileUpload}
                            disabled={formData.loading}
                            className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-50"
                        >
                            {formData.loading ? "Uploading..." : "Upload"}
                        </button>
                       
                        </div>
                        {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
                        {formData.preview && (
                            <div className="relative w-64 h-64">
                                <Image
                                    src={formData.preview}
                                    alt="Uploaded Preview"
                                    width={200}
                                    height={200}
                                    layout="intrinsic"
                                    objectFit="cover"
                                    quality={70}
                                    priority={false}
                                />
                            </div>
                        )}
                        <button type="submit" className="p-3 bg-slate-700 text-white rounded-lg uppercase">
                            Create Listing
                        </button>
                    </div>
                </form>
            </main>
        </FormManager>
    );
}
