

'use client';
import React, {  useEffect, useState } from 'react';
import Image from 'next/image';
import { useFormState } from '@/store/useFormState';
import FormManager from '../../components/formanager';
import { useUser } from '@clerk/nextjs';
import { useRouter,usePathname } from 'next/navigation';

export default function UpdateListing() {
    const {isSignedIn, isLoaded,user}=useUser();
    const { formData, setFormData, addFiles } = useFormState();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const pathname=usePathname();
    const listingId=pathname.split('/').pop();
    console.log(listingId)
    const router = useRouter();
    const [loadingListing, setLoadingListing] = useState(false);
    const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

// useEffect(() =>{
// const fetchListing=async()=>{
//     const res=await fetch('/api/listing/get',{
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id: listingId }),
//     });
//     const data=await res.json();
//     if(data.success===false){
//         router.push('/404');
//         console.log(data.message);
//         return;
//     }
//     const listing = data[0];
//     if (listing) {
//         // Update each field in Zustand store
//         Object.entries(listing).forEach(([key, value]) => {
//             setFormData(key, value);
//         });
//     }
// }
// },[])

useEffect(() => {
    const fetchListing = async () => {
        try {
            const res = await fetch('/api/listing/get', {
                method: 'POST', // Ensure this matches your API method
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: listingId }),
            });

            const data = await res.json();

            if (data.success === false) {
                router.push('/404');
                console.error(data.message);
                return;
            }

            const listing = data[0]; // Assuming the response is an array
console.log(data[0])
if (listing) {
    // Mapping API response to Zustand state
    setFormData('name', listing.name);
    setFormData('description', listing.description);
    setFormData('address', listing.address);
    setFormData('bedrooms', listing.bedrooms);
    setFormData('bathrooms', listing.bathrooms);
    setFormData('regularPrice', listing.regularPrice);
    setFormData('discountPrice', listing.discountedPrice); // Fix naming issue
    setFormData('type', listing.type);
    setFormData('parking', listing.parking);
    setFormData('furnished', listing.furnished);
    setFormData('offer', listing.offer === "true"); // Convert string to boolean

    // Handle image previews
    if (listing.imageUrls && Array.isArray(listing.imageUrls)) {
        setFormData('previews', listing.imageUrls);
        setFormData('uploadedFileUrl', listing.imageUrls); // Assign imageUrls to previews
    }
  }
        } catch (error) {
            console.error('Error fetching listing:', error);
        }
    };

    if (listingId) {
        fetchListing();
    }
}, [listingId, setFormData, router]);
   
    const validateForm = () => {
        const validationErrors: Record<string, string> = {};

        if (!formData.name.trim()) validationErrors.name = "Name is required";
        if (!formData.description.trim()) validationErrors.description = "Description is required";
        if (!formData.address.trim()) validationErrors.address = "Address is required";

        const isNumericFieldValid =
            (formData.bedrooms > 0) ||
            (formData.bathrooms > 0) ||
            (Number(formData.regularPrice) > 0) ||
            (Number(formData.discountPrice) > 0);

        if (!isNumericFieldValid) {
            validationErrors.numericVals = "At least one numeric field must have a valid value.";
        }
        if(formData.regularPrice < formData.discountPrice){
            validationErrors.priceError = "Discount price must be less than or equal to regular price .";
        }
        const isCheckboxChecked = formData.type|| formData.parking || formData.furnished || formData.offer;
        if (!isCheckboxChecked) validationErrors.checkboxes = "At least one option must be selected.";

        if ( formData.uploadedFileUrl.length === 0) validationErrors.files = "At least one image is required.";

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

   
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, type, value } = e.target;
    
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked; // Explicitly cast to HTMLInputElement
    
           
            if (id === "sale" || id === "rent") {
                setFormData("type", checked ? id : ""); 
            } else {
                setFormData(id, checked); 
            }
        } else {
            setFormData(id, value); 
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: "",
        }));
    };
    
    



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const invalidFiles = selectedFiles.filter(file => !allowedFormats.includes(file.type));

        if (invalidFiles.length > 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                files: "Invalid file type! Please upload PNG, JPEG, JPG, or GIF images.",
            }));
            return;
        }

        addFiles(selectedFiles);
        setErrors((prevErrors) => ({ ...prevErrors, files: "" }));
    };

    // const handleRemoveFile = (index: number) => {
    //     if (formData.uploadedFileUrl.length === 0){
    //     setFormData("files", formData.files.filter((_, i) => i !== index));
    //     setFormData("previews", formData.previews.filter((_, i) => i !== index));
    //      }
    // };

    const handleRemoveFile = async (index: number) => {
        const fileUrl = formData.uploadedFileUrl[index];
    console.log(fileUrl);
        try {
            const res = await fetch('/api/fileremove', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileUrl }),
            });
    
            const data = await res.json();
    
            if (!res.ok || data.success === false) {
                throw new Error(data.message || "Failed to delete file");
            }
    
            console.log("File deleted successfully:", fileUrl);
    
            // Remove from local state after successful deletion
            setFormData("uploadedFileUrl", formData.uploadedFileUrl.filter((_, i) => i !== index));
            setFormData("previews", formData.previews.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };
    





    // const handleFileUpload = async () => {
    //     if (formData.files.length === 0) {
    //         setErrors((prevErrors) => ({ ...prevErrors, files: "Please select images before uploading." }));
    //         return;
    //     }

    //     setFormData("loading", true);
    //     const uploadData = new FormData();
    //     formData.files.forEach(file => uploadData.append("files", file));

    //     try {
    //         const response = await fetch("/api/fileupload", {
    //             method: "POST",
    //             // headers: { 'Cache-Control': 'public, max-age=300' },
    //             body: uploadData,
    //         });

    //         if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);

    //         const result = await response.json();
    //         setFormData("uploadedFileUrl", [...result.uploadedFileUrl]);
    //         setFormData("previews", [...result.uploadedFileUrl]);
    //         alert("Files uploaded successfully!");
    //     } catch (error) {
    //         console.error("Error uploading files:", error);
    //         alert("File upload failed. Please try again.");
    //     } finally {
    //         setFormData("loading", false);
    //     }
    // };

    const handleFileUpload = async () => {
        if (formData.files.length === 0) {
            setErrors((prevErrors) => ({ ...prevErrors, files: "Please select images before uploading." }));
            return;
        }
    
        setFormData("loading", true);
        const uploadData = new FormData();
        formData.files.forEach(file => uploadData.append("files", file));
    
        try {
            const response = await fetch("/api/fileupload", {
                method: "POST",
                body: uploadData,
            });
    
            if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);
    
            const result = await response.json();
    
            setFormData("uploadedFileUrl", [...formData.uploadedFileUrl, ...result.uploadedFileUrl]);
            setFormData("previews", [...formData.uploadedFileUrl, ...result.uploadedFileUrl]);
    
            alert("Files uploaded successfully!");
        } catch (error) {
            console.error("Error uploading files:", error);
            alert("File upload failed. Please try again.");
        } finally {
            setFormData("loading", false);
        }
    };
    




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
        const messageData: Record<string, string> = {};
        if (!validateForm()) {
            messageData.common = "Please fix the errors before submitting.";
            setErrors(messageData);
            return;
        }
        if (formData.uploadedFileUrl.length === 0) {
            setErrors((prevErrors) => ({ ...prevErrors, files: "Please upload images before submitting." }));
            return;
        }
        setLoadingListing(true);
        const res = await fetch('/api/listing/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                userMongoId: user?.id,
                listingId: listingId,
            })
        });
            const data= await res.json();
            if(data.success===false){
                setErrors(data.message);    
            }
            router.push(`/listing/${data._id}`);
    }catch (err) {
        console.error('Error creating listing:', err);
        setErrors({ ...errors, common: "Error creating listing. Please try again." });
        setLoadingListing(false);
        return;
    }
      
    };

    if (!isLoaded) {
        return (
          <h1 className='text-center text-xl my-7 font-semibold'>Loading...</h1>
        );
      }
      if (!isSignedIn) {
        return (
          <h1 className='text-center text-xl my-7 font-semibold'>
            You are not authorized to view this page
          </h1>
        );
      }



    return (
        <FormManager>
            <main className="p-3 max-w-6xl m-auto bg-[#e2e8f0] mt-6">
            <h1 className="text-lg  font-bold text-center">
            Update  Listing
            </h1>
                {/* <p className=' text-center'>Update  Listing</p> */}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                {/* <h1 className="text-xl font-semibold text-center">Create a Listing</h1> */}
                    <div className="flex flex-col gap-4 flex-1">
                        <input type="text" placeholder="Name" className="border p-3 rounded-lg" id="name"
                            value={formData.name} onChange={handleInputChange} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                        <textarea rows={4} placeholder="Description" className="border p-3 rounded-lg" id="description"
                            value={formData.description} onChange={handleInputChange} />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

                        <input type="text" placeholder="Address" className="border p-3 rounded-lg" id="address"
                            value={formData.address} onChange={handleInputChange} />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

                        <div className="flex gap-6 flex-wrap">
                            {['sale', 'rent', 'parking', 'furnished', 'offer'].map((field) => (
                                <div key={field} className="flex gap-2">
                                <input
                                type="checkbox"
                                id={field}
                                checked={field === "sale" || field === "rent" ? formData.type === field : formData[field as keyof typeof formData] as boolean}
                                onChange={handleInputChange}
                            />
                                    
                                    <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                                </div>
                            ))}
                        </div>
                        {errors.checkboxes && <p className="text-red-500 text-sm">{errors.checkboxes}</p>}
                         <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col items-left px-1">
                        <label htmlFor="bedrooms" className="text-sm font-medium text-gray-700">
                                        Bed Rooms
                                    </label>
                        <input type="number" placeholder="bedrooms" className="border p-3 rounded-lg" id="bedrooms"
                            value={formData.bedrooms} onChange={handleInputChange}
                            // min={1}
                            // max={20} 
                            />
                         </div>
                         <div className="flex flex-col items-left px-1">
                        <label htmlFor="bathrooms" className="text-sm font-medium text-gray-700">
                                        Bath Rooms
                                    </label>
                        <input type="number" placeholder="bathrooms" className="border p-3 rounded-lg" id="bathrooms"
                            value={formData.bathrooms} onChange={handleInputChange}
                            // min={1}
                            // max={20} 
                            />
                         </div>

                         <div className="flex flex-col items-left px-1">
                        <label htmlFor="regularPrice" className="text-sm font-medium text-gray-700">
                                       Regular Price ($/Month)
                                    </label>
                        <input type="number" placeholder="Regular Price" className="border p-3 rounded-lg" id="regularPrice"
                            value={formData.regularPrice} onChange={handleInputChange}
                            min={100}
                            max={1000000} />
                         </div>
                         {formData.offer &&(
                         <div className="flex flex-col items-left px-1">
                        <label htmlFor="discountPrice" className="text-sm font-medium text-gray-700">
                                        Discount Price ($/Month)
                                    </label>
                        <input type="number" placeholder="Discount Price" className="border p-3 rounded-lg" id="discountPrice"
                            value={formData.discountPrice} onChange={handleInputChange}
                            min={0}
                            max={500000} />
                         </div>)
                            }
                           
                        </div>
                        {errors.numericVals && <p className="text-red-500 text-sm">{errors.numericVals}</p>}
                        {errors.priceError && <p className="text-red-500 text-sm">{errors.priceError}</p>}
                        
                    </div>

                    <div className="flex flex-col flex-1 gap-4">
                     <div className="flex gap-4">
                        <input type="file" multiple accept="image/png, image/jpeg, image/jpg, image/gif"
                            className="p-3 border border-gray-300 rounded w-full" onChange={handleFileChange} />
                       

                        <button type="button" onClick={handleFileUpload} disabled={formData.loading}
                            className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-50">
                            {formData.loading ? "Uploading..." : "Upload"}
                        </button>
                        </div>
                        {errors.files && <p className="text-red-500 text-sm">{errors.files}</p>}
                        <div className="flex flex-wrap gap-2">
                        {formData.previews.map((preview, index) => (
                        <div 
                            key={index}  
                            className="relative w-[120px] h-[120px] rounded-lg overflow-hidden">
                            
                            <Image 
                                src={preview} 
                                alt={`Preview ${index}`} 
                                layout="fill" 
                                objectFit="cover"  
                                quality={75}
                                // priority={true}
                                loading="lazy"
                                blurDataURL={preview}
                                placeholder='blur'
                            />

                        {/* {(formData.uploadedFileUrl.length === 0) && ( */}
                            <button 
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                            >
                                ❌
                            </button>
                        {/* )} */}
                        </div>
                        ))}
                        </div>
                        <button type="submit" className="p-3 bg-slate-700 text-white rounded-lg uppercase"
                        disabled={ formData.loading || loadingListing }>{loadingListing?'Updating..':'Update Listing'} </button>
                        
                        <div className='flex flex-wrap flex-1'>
                            {errors.common && <p className="text-red-500 text-sm">{errors.common}</p>}
                        </div>
                    </div>
                    
                </form>
                
            </main>
        </FormManager>
    );
}

