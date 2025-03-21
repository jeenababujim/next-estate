
import React from 'react'
//import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa';
import Image from 'next/image';

export default async function Listing({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // Ensure params is awaited
  const listingId = resolvedParams.id;
return(
    <div>test</div>
//   let listing = null;
//     try {
//       const result = await fetch(process.env.URL+'/api/listing/get', {
//         method: 'POST',
//         body: JSON.stringify({ listingId}),
//         cache: 'no-store',
//       });

//     if (!result.ok) throw new Error("Failed to fetch listing");

//     const data = await result.json();
//     listing = data?.[0] || { title: 'failed to load listing' };

//   } catch (err) {
//     listing = { title: 'failed to load listing' };
//     console.error((err as Error).message);
//   }

//   if (!listing || listing.title === 'failed to load listing') {
//     return (
//       <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
//         <h2 className="text-xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-2xl">
//           Listing not found
//         </h2>
//       </main>
//     );
//   }

//   return (
//     <main className="p-3 max-w-6xl mx-auto">
//       <div className="relative w-full h-96">
//         {listing.imageUrls && (
//           <Image
//             src={Array.isArray(listing.imageUrls) ? listing.imageUrls[0] : listing.imageUrls}
//             alt={listing.name || "Listing image"}
//             fill
//             objectFit="cover"
//             quality={75}
//             loading="lazy"
//             blurDataURL={Array.isArray(listing.imageUrls) ? listing.imageUrls[0] : listing.imageUrls}
//             placeholder="blur"
//             className="rounded-lg"
//           />
//         )}
//       </div>
//       <h1 className="text-2xl font-bold mt-4">{listing.name || "No Title"}</h1>
//     </main>
  );
}
