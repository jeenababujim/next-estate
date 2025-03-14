'use client'
import React, { useState } from 'react'
import  Image  from 'next/image';
export default function CreateListing() {
    const [file, setFile] = useState<File | null>(null);
    const[preview,setPreview] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/fileupload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const result = await response.json();
            setPreview(result.url);
            console.log(result);
            console.log('File uploaded successfully:', result);
            alert("File uploaded successfully!");

        } catch (error) {
            console.error('Error uploading file:', error);
            alert("File upload failed. Please try again.");
        }
    };


    return (
        <main className='p-3 max-w-6xl m-auto  bg-[#e2e8f0] mt-6'>
            <h1 className='text-3xl font-semibold text-center my-7'>
                Crete a Listing
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input
                        type='text'
                        placeholder='Name'
                        className='border p-3 rounded-lg'
                        id='name'
                        maxLength={62}
                        minLength={10}
                        // required
                    />
                    <textarea
                        rows={4}
                        placeholder='Description'
                        className='border p-3 rounded-lg'
                        id='description'
                        // required
                    />
                    <input
                        type='text'
                        placeholder='Address'
                        className='border p-3 rounded-lg'
                        id='address'
                        maxLength={62}
                        minLength={10}
                        // required
                    />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex- gap-2 '>
                            <input
                                type='checkbox'
                                id='sale'
                                className='w-5'
                            />
                            <span>Sell</span>
                        </div>
                        <div className='flex- gap-2 '>
                            <input
                                type='checkbox'
                                id='rent'
                                className='w-5'
                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex- gap-2 '>
                            <input
                                type='checkbox'
                                id='parking'
                                className='w-5'
                            />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex- gap-2 '>
                            <input
                                type='checkbox'
                                id='furnished'
                                className='w-5'
                            />
                            <span>Furnished</span>
                        </div>
                        <div className='flex- gap-2 '>
                            <input
                                type='checkbox'
                                id='offer'
                                className='w-5'
                            />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='bedrooms'
                                min='1'
                                max='10'
                                // required
                                className='border p-3 border-gray-300 rounded-lg'
                            />
                            <p>Beds</p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='bathrooms'
                                min='1'
                                max='10'
                                // required
                                className='border p-3 border-gray-300 rounded-lg'
                            />
                            <p>Baths</p>
                        </div>


                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='regularPrice'
                                min='1'
                                max='10'
                                // required
                                className='border p-3 border-gray-300 rounded-lg'
                            />
                            <div className='flex flex-col items-center'>
                            <p>Regular Price</p>
                            <span className='text-xs'>($/Month)</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='discountPrice'
                                min='1'
                                max='10'
                                //required
                                className='border p-3 border-gray-300 rounded-lg'
                            />
                            <div className='flex flex-col items-center'>
                            <p>Discount Price</p>
                            <span className='text-xs'>($/Month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>
                     Images:
                    
                  <span className='font-normal text-gray-600 ml-2'>
                   The first image will be the cover (max-6)
                  </span>
                  </p>
                  <div className='flex gap-4'>
                    <input
                    className='p-3 border border-gray-300 rounded w-full'
                      type='file'
                    //   id='files'
                      accept='image/*'
                      required
                      //multiple
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    {preview && (
                        <div>
                          <Image src={preview} alt="Uploaded Image" width={200} height={200} />
                        </div>
                   
                    )}
                    


                    

                    <button type='submit' className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg
                    disabled:opacity-80'>
                    Upload
                    </button>
                  </div>
                  <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95
                    disabled:opacity-80'>
                    Create Listing
                    </button>
                </div>
            </form>
        </main>
    )
}

