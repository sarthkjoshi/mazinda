// import Store from "@/models/Store";
// import connectDB from "@/lib/mongoose";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { store_name } = await req.json();

//     // Connecting to database
//     await connectDB();

//     // Transform the stored store names to match the format
//     let stores = await Store.find({}).select(
//       "-mobileNumber -alternateMobileNumber -password"
//     );

//     // Filter stores based on the transformed store_name
//     const formattedStoreName = store_name.toLowerCase().replace(/\s+/g, "-");
//     const matchedStore = stores.find((store) => {
//       return (
//         store.storeName.toLowerCase().replace(/\s+/g, "-") ===
//         formattedStoreName
//       );
//     });

//     if (matchedStore) {
//       return NextResponse.json({
//         success: true,
//         message: "Store fetched successfully",
//         store: matchedStore,
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "Store doesn't exist",
//       });
//     }
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       error: "An error occurred while fetching the store: " + error,
//     });
//   }
// }

import Store from "@/models/Store";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { store_name } = await req.json();

    // Connecting to database
    await connectDB();

    // Transform store_name to match the format in the database
    const formattedStoreName = store_name.toLowerCase().replace(/\s+/g, "-");

    // Query the database directly for stores with transformed names
    let stores = await Store.aggregate([
      {
        $addFields: {
          formattedName: {
            $toLower: {
              $replaceAll: { input: "$storeName", find: " ", replacement: "-" },
            },
          },
        },
      },
      {
        $match: {
          formattedName: formattedStoreName,
        },
      },
      {
        $project: {
          formattedName: 0, // Exclude the added field from the result
          mobileNumber: 0,
          alternateMobileNumber: 0,
          password: 0,
        },
      },
    ]);

    if (stores.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Store fetched successfully",
        store: stores[0],
      });
    } else {
      // For debugging purposes, return the formatted name and store name
      return NextResponse.json({
        success: false,
        message: "Store doesn't exist",
        formattedStoreName,
        storeName: store_name,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while fetching the store: " + error,
    });
  }
}
