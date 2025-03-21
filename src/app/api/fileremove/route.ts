// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     try {
//         const { fileUrl } = await req.json();

//         if (!fileUrl) {
//             return NextResponse.json({ success: false, message: "File URL is required" }, { status: 400 });
//         }

//         const res = await fetch(fileUrl, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
//             },
//         });

//         if (!res.ok) {
//             throw new Error("Failed to delete file from Vercel Blob");
//         }

//         return NextResponse.json({ success: true, message: "File deleted successfully" });
//     } catch (error) {
//         return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";

export async function POST(req: NextRequest) {
    try {
        const { fileUrl } = await req.json();

        if (!fileUrl) {
            return NextResponse.json({ success: false, message: "File URL is required" }, { status: 400 });
        }

        // Use `del()` instead of `deleteBlob()`
        await del(fileUrl);

        return NextResponse.json({ success: true, message: "File deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
}
