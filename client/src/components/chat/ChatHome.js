// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import './css/chat.min.css'

// export default function ChatHome() {
//   const navigate = useNavigate();

//   const handleChat = (path) => {
//     navigate(path);
//   }
  
// //   return (
// //     <div> 
// //       <button onClick={() => handleChat("/chat-dashboard")}> Login/Register </button>&nbsp;&nbsp;&nbsp;&nbsp;
// //     </div>
// //   )
//   return (
//     <div>
//       <head>
//         <title>Chat App</title>
//         <link rel="icon" href="/img/favicon.png" />
//       </head>
//       <body>
//         <div className="centered-form">
//           <div className="centered-form__box">
//             <h1>Join</h1>
//             <form onSubmit={handleChat}>
//               <label>Display name</label>
//               <input type="text" name="username" placeholder="Display name" required />
//               <label>Room</label>
//               <input type="text" name="room" placeholder="Room" required />
//               <button type='submit'> Join </button>
//             </form>
//           </div>
//         </div>
//       </body>
//     </div>
//   );
// }

import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ChatHome() {
  const redirect = () => {
    window.location.href = 'http://localhost:8080/auth/login';
    // maybe can add spinner while loading
    return null;
  }
  
  return (
    <div> 
      <button onClick={() => handleChat("/chat-dashboard")}> Login/Register </button>&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  )
}
