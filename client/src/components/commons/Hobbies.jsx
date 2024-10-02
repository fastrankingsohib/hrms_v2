// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaTimes } from 'react-icons/fa';
// import { addHobby } from '../../redux/reducers/candidateSlice'; // Correct import for addHobby

// function Hobbies() {
//     const dispatch = useDispatch();
//     const [hobbyFields, setHobbyFields] = useState([{ hobby: "" }]);

//     // Load existing hobbies from Redux store if needed
//     const storedHobbies = useSelector((state) => state.hobbies || []);

//     useEffect(() => {
//         if (storedHobbies.length > 0) {
//             setHobbyFields(storedHobbies);  // Initialize with stored hobbies
//         }
//     }, [storedHobbies]);

//     // Log the current hobbies whenever they are updated
//     useEffect(() => {
//         console.log("Current Hobbies in State: ", hobbyFields);
//     }, [hobbyFields]);

//     const handleHobbyChange = (index, event) => {
//         const values = [...hobbyFields];
//         values[index].hobby = event.target.value;
//         setHobbyFields(values);
//     };

//     const removeHobbyField = (index) => {
//         if (hobbyFields.length > 1) {
//             const values = [...hobbyFields];
//             values.splice(index, 1);
//             setHobbyFields(values);
//             console.log("Hobby removed:", values); // Log after removal
//         }
//     };

//     const handleKeyDown = (event) => {
//         if (event.key === 'Enter') {
//             event.preventDefault(); // Prevent form submission
//             const hobbyValue = hobbyFields[hobbyFields.length - 1].hobby.trim();
//             if (hobbyValue) {
//                 const newHobby = { hobby: hobbyValue };
//                 dispatch(addHobby(newHobby)); // Dispatch the action to add the hobby
//                 console.log("Hobby added:", newHobby); // Log the added hobby
//                 setHobbyFields([...hobbyFields, { hobby: "" }]);

//                 // Clear the last input field after adding the hobby
//                 setHobbyFields(prev => {
//                     const newHobbies = [...prev];
//                     newHobbies[newHobbies.length - 1].hobby = "";
//                     return newHobbies;
//                 });
//             }
//         }
//     };

//     return (
//         <div className='flex flex-wrap items-center'>
//             <input
//                 type="text"
//                 className="mr-2 w-60 p-3 px-6 my-2 border rounded-full w-32"
//                 placeholder="Add a hobby"
//                 value={hobbyFields[hobbyFields.length - 1].hobby}
//                 onChange={event => handleHobbyChange(hobbyFields.length - 1, event)}
//                 onKeyDown={handleKeyDown}
//             />
//             <div className="flex flex-wrap">
//                 {hobbyFields.slice(0, -1).map((hobbyField, index) => ( // Don't show the last empty field as a tag
//                     <div key={index} className="flex items-center justify-between bg-gray-100 w-60 border rounded-full p-3 px-6 my-2 mr-2">
//                         <span className="mr-2">{hobbyField.hobby}</span>
//                         <FaTimes 
//                             className="cursor-pointer text-red-600 ml-4"
//                             onClick={() => removeHobbyField(index)} 
//                         />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Hobbies;
