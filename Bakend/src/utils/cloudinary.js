// // import {v2 as cloudinary} from "cloudinary";
// // import fs from "fs";
// // import dotenv from "dotenv";
// // dotenv.config();

// // // Configuration
// //     cloudinary.config({  
// //         cloud_name: process.env.CLOUDINARY_CLOUD, 
// //         api_key: process.env.CLOUDINARY_API_KEY, 
// //         api_secret: process.env.CLOUDINARY_API_SECRET
// //     });

// //     const uploadOnCloudinary = async (localfilePath)=> {
// //         try {
// //             if (!localfilePath) {
// //                 throw new Error("No file uploaded");
// //             }

// //             const Result = await cloudinary.uploader.upload(localfilePath, {
// //                 resource_type: "auto"
// //             })

// //             console.log("Uploaded to Cloudinary:", Result.url);
// //             return Result
            
// //         } catch (error) {
// //          fs.unlinkSync(localfilePath); // remove local save tempary file as the folder
// //          throw new Error(error.message);
// //          return null
// //         }
// //     }


// // export {uploadOnCloudinary};




// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import dotenv from "dotenv";
// dotenv.config();

// cloudinary.config({  
//   cloud_name: process.env.CLOUDINARY_CLOUD, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// console.log("Cloudinary config:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing"
// });

// const uploadOnCloudinary = async (localfilePath) => {
//   try {
//     if (!localfilePath) {
//       throw new Error("No file uploaded");
//     }

//     const result = await cloudinary.uploader.upload(localfilePath, {
//       resource_type: "auto",
//     });

//     console.log("Uploaded to Cloudinary:", result.url);

//     // upload ho gaya to local file delete kar do
//     fs.unlinkSync(localfilePath);

//     return result;
//   } catch (error) {
//     console.log("Cloudinary upload error:", error.message);

//     if (fs.existsSync(localfilePath)) {
//       fs.unlinkSync(localfilePath);
//     }

//     return null;
//   }
// };

// export { uploadOnCloudinary };
