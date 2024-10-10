// // src/uploadData.js
// import { db } from "./firebase"; // Adjust the import based on your structure
// import { collection, addDoc, getDocs } from "firebase/firestore";

// // Sample data for car brands and cars
// const carBrands = [
//   { name: "현대" },
//   { name: "기아" },
//   { name: "르노" },
// ];

// const cars = [
//   {
//     name: "아반떼",
//     price: "2,800만원",
//     imageUrl: "https://example.com/image.jpg", // Replace with actual image URL
//   },
//   {
//     name: "소나타",
//     price: "3,200만원",
//     imageUrl: "https://example.com/image2.jpg", // Replace with actual image URL
//   },
//   // Add more cars as needed
// ];

// const uploadData = async () => {
//   try {
//     const brandsCollection = collection(db, "carBrands");

//     // Fetch existing brands to determine the next ID
//     const brandsSnapshot = await getDocs(brandsCollection);
//     const brandsCount = brandsSnapshot.size;

//     for (let i = 0; i < carBrands.length; i++) {
//       const brandWithId = {
//         id: brandsCount + i + 1, // Auto-incrementing ID
//         ...carBrands[i],
//       };
//       await addDoc(brandsCollection, brandWithId);
//       console.log(`Uploaded brand: ${brandWithId.name} with ID: ${brandWithId.id}`);
//     }

//     const carsCollection = collection(db, "cars");

//     // Fetch existing cars to determine the next ID
//     const carsSnapshot = await getDocs(carsCollection);
//     const carsCount = carsSnapshot.size;

//     for (let i = 0; i < cars.length; i++) {
//       const carWithId = {
//         id: carsCount + i + 1, // Auto-incrementing ID
//         ...cars[i],
//       };
//       await addDoc(carsCollection, carWithId);
//       console.log(`Uploaded car: ${carWithId.name} with ID: ${carWithId.id}`);
//     }

//     console.log("All data uploaded successfully!");
//   } catch (error) {
//     console.error("Error uploading data: ", error);
//   }
// };

// // Call the upload function
// uploadData();
// // export default uploadData;
