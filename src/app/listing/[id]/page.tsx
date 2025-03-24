

import React from 'react';
import Image from 'next/image';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa';



export default async function Listing({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params; // Ensure params is awaited
    const listingId = resolvedParams.id;
  //const listingId = decodeURIComponent(params.id); // Ensure it's properly decoded
  console.log(`Fetching listing with ID: ${listingId}`);

  // Ensure we have a valid API URL
  const baseUrl =  process.env.URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/listing/get`;

  let listing = null;

  try {
    if (!listingId) throw new Error('Listing ID is missing');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listingId }),
      cache: 'no-store',
    });

    if (!response.ok){ 
       console.log(`API request failed: ${response.status}`);
    }
    console.log(response);
    const data = await response.json();
    console.log(data);
    listing = data?.[0] || null;
  } catch (err) {
    console.error('Error fetching listing:', err);
    listing = { title: 'Failed to load listing' };
  }

  if (!listing || listing.title === 'Failed to load listing') {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-2xl">
          Listing not found
        </h2>
      </main>
    );
  }
if(listing && listing.name){
  return (
    <main className="p-3 max-w-6xl mx-auto">
      <div className="relative w-full h-96">
        {listing.imageUrls && (
          <Image
            src={Array.isArray(listing.imageUrls) ? listing.imageUrls[0] : listing.imageUrls}
            alt={listing.name || 'Listing image'}
            fill
            objectFit="cover"
            quality={75}
            loading="lazy"
            blurDataURL={Array.isArray(listing.imageUrls) ? listing.imageUrls[0] : listing.imageUrls}
            placeholder="blur"
            className="rounded-lg"
          />
        )}
      </div>
      <h1 className="text-2xl font-bold mt-4">{listing.name || 'No Title'}</h1>
      <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
      <p className="text-2xl font-semibold">
        {listing?.name} - $
        {listing?.offer
          ? listing?.discountedPrice?.toLocaleString("en-US") || "N/A"
          : listing?.regularPrice?.toLocaleString("en-US") || "N/A"}
        {listing?.Type === "rent" && " / month"}
      </p>
      <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm '>
        <FaMapMarkerAlt className='text-green-700'/>
        {listing.address}
      </p>
      <div className='flex-gap-4'>
     <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md' >
       {listing.type==='rent'?'For Rent':'For Sale'}
     </p>
     {listing.offer && (
      <p className='bg-blue-900 w-full max-w-[200px] text-white text-center p-1 rounded-md' >
       ${+listing.regularPrice} - {+listing.discountedPrice }  OFF
      </p>
     )}
      </div>
      <p className='text-slate-800'>
       <span className='font-semibold text-black'>
       Description -
       {listing.description}
       </span>
      </p>
      <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
      <li className='flex items-center gap-1 whitespace-nowrap'>
        <FaBed className='text-lg'/>
        {listing.bedrooms>1
        ? `${listing.bedrooms} beds`
        : `${listing.bedrooms} bed`
        }
      </li>
      <li className='flex items-center gap-1 whitespace-nowrap'>
        <FaBath className='text-lg'/>
        {listing.bathrooms>1
        ? `${listing.bathrooms} baths`
        : `${listing.bathrooms} bath`
        }
      </li>
      <li className='flex items-center gap-1 whitespace-nowrap'>
        <FaParking className='text-lg'/>
        {listing.parking
        ? `Parking spot`
        : `No Parking`
        }
      </li>
      <li className='flex items-center gap-1 whitespace-nowrap'>
        <FaChair className='text-lg'/>
        {listing.parking
        ? `Furnished`
        : `Unfurnished`
        }
      </li>
      </ul>
      </div>
    </main>
  );
}
}
