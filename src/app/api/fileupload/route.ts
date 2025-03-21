// import { NextResponse } from 'next/server';
// import { put } from '@vercel/blob';

// export async function POST(req: Request) {
//     try {
//         const form = await req.formData();
//         const file = form.get('file') as File | null;

//         if (!file) {
//             return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//         }

//         const blob = await put(file.name, file, { access: 'public' });

//         return NextResponse.json(blob);
//     } catch (error) {
//         console.error('File upload error:', error);
//         return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
//     }
// }


import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(req: Request) {
    try {
        const form = await req.formData();
        const files = form.getAll('files') as File[]; // Get all files

        if (!files.length) {
            return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
        }

        // Upload each file and store the URLs
        const uploadPromises = files.map(async (file) => {
            const blob = await put(file.name, file, { access: 'public' });
            return blob.url; // Store only the URL
        });

        const uploadedFileUrl = await Promise.all(uploadPromises);

        return NextResponse.json({uploadedFileUrl}); // Return an array of URLs
    } catch (error) {
        console.error('File upload error:', error);
        return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 });
    }
}
