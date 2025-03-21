

import React from 'react';
import Image from 'next/image';

interface ListingProps {
  params: { id: string };
}

export default async function Listing({ params }: ListingProps) {
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
    // const data = await response.json();
    // console.log(data);
    // listing = data?.[0] || null;
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
    </main>
  );
}
