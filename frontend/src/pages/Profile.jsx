import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/slice/authSlice"; // Ensure this path is correct for your updateUser action

function Profile() {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Initialize the state for form inputs
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.username || "");
  const [address, setAddress] = useState(userData?.address || "");

  useEffect(() => {
    // Sync the form fields with userData if it changes
    if (userData) {
      setName(userData.name);
      setEmail(userData.username);
      setAddress(userData.address);
    }
  }, [userData]);

  const handleSaveChanges = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Dispatch the updateUser action with the updated name and address
    if (name && address) {
      dispatch(updateUser({ name, address }))
        .unwrap() // unwrap is used to handle success or failure
        .then(() => {
          // Optionally show a success message or perform additional actions on success
          console.log("Profile updated successfully");
        })
        .catch((error) => {
          // Handle any errors that occur during the update
          console.error("Failed to update profile:", error.message);
        });
    } else {
      console.error("Please provide both name and address.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold py-4">My Profile</h1>
      <div className="border border-gray-500 rounded-lg mx-4">
        <div className="text-lg p-4">
          <form onSubmit={handleSaveChanges} className="flex flex-col gap-2">
            <div className="flex gap-3 w-full">
              <label htmlFor="name" className="w-2/5">
                Name:
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="border border-gray-300 rounded-sm pl-2"
              />
            </div>
            <div className="flex gap-3 w-full">
              <label htmlFor="email" className="w-2/5">
                Email:
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                disabled
                className="border border-gray-300 rounded-sm pl-2 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div className="flex gap-3 w-full">
              <label htmlFor="payment-method" className="w-2/5">
                Payment Method:
              </label>
              <input
                type="text"
                value="Cash on Delivery"
                disabled
                className="border border-gray-300 rounded-sm pl-2 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div className="flex gap-3 w-full">
              <label htmlFor="address" className="w-2/5">
                Address:
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="border border-gray-300 rounded-sm pl-2"
              />
            </div>
            <div className="flex justify-end w-full pt-6">
              <button
                type="submit"
                className="bg-blue-500 px-2 py-1 rounded text-white"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// function Profile() {
//   const { userData } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const [name, setName] = useState(userData?.name || "");
//   const [email, setEmail] = useState(userData?.username || "");
//   const [address, setAddress] = useState(userData?.address || "");

//   useEffect(() => {
//     if (userData) {
//       setName(userData.name);
//       setEmail(userData.username);
//       setAddress(userData.address);
//     }
//   }, [userData]);

//   const handleSaveChanges = async (e) => {};

//   return (
//     <div className="w-full h-full flex flex-col justify-center items-center">
//       <h1 className="text-2xl font-bold py-4">My Profile</h1>
//       <div className="border border-gray-500 rounded-lg mx-4">
//         <div className="text-lg p-4">
//           <form onSubmit={handleSaveChanges} className="flex flex-col gap-2">
//             <div className="flex gap-3 w-full">
//               <label htmlFor="name" className="w-2/5">
//                 Name:
//               </label>
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 type="text"
//                 className="border border-gray-300 rounded-sm pl-2"
//               />
//             </div>
//             <div className="flex gap-3 w-full">
//               <label htmlFor="email" className="w-2/5">
//                 Email:
//               </label>
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email"
//                 disabled
//                 className="border border-gray-300 rounded-sm pl-2 text-gray-500 cursor-not-allowed"
//               />
//             </div>
//             <div className="flex gap-3 w-full">
//               <label htmlFor="payment-method" className="w-2/5">
//                 Payment Method:
//               </label>
//               <input
//                 type="text"
//                 value="Cash on Delivery"
//                 disabled
//                 className="border border-gray-300 rounded-sm pl-2 text-gray-500 cursor-not-allowed"
//               />
//             </div>
//             <div className="flex gap-3 w-full">
//               <label htmlFor="address" className="w-2/5">
//                 Address:
//               </label>
//               <input
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 type="text"
//                 className="border border-gray-300 rounded-sm pl-2"
//               />
//             </div>
//             <div className="flex justify-end w-full pt-6">
//               <button
//                 type="submit"
//                 className="bg-blue-500 px-2 py-1 rounded text-white"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
