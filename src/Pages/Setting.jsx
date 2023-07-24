// import React, { useState } from "react";
// import Navbar from "./Navbar";
// import { auth } from "../firebase";
// import { getAuth } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import Username from './SettingInfo/Username';
// import Password from './SettingInfo/Password';
// import PhoneNum from "./SettingInfo/PhoneNum";
// import Emailinfo from "./SettingInfo/Emailinfo";
// import "../StylingPages/Setting.css";
// import SettingsIcon from "@mui/icons-material/Settings";
// import PersonIcon from "@mui/icons-material/Person";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import AddLocationIcon from "@mui/icons-material/AddLocation";
// import AppsIcon from "@mui/icons-material/Apps";

// const showComponent = {
//   'Username' : <Username />,
//   'Phone Number' : <PhoneNum />,
//   'Email': <Emailinfo />,
//   'Password': <Password />,
//   'null' : null
// }

// export default function Setting() {
//   const [load, setLoad] = useState(true);
//   const [page, setPage] = useState(null);
//   const auth = getAuth();
//   const user = auth.currentUser;
//   const navigate = useNavigate();

//   const toggleIsLoading = (event) => {
//     console.log(event.target.dataset)
//     setPage(event.target.innerText === page ? null : event.target.innerText);
//     console.log('working')
//   }

//   return (
//     <div>
//       {load && (
//         <div className="settings-wrapper">
//           <Navbar user={user} />
//           <div className="header-section">
//             <h1 className="page-title">Settings</h1>
//             <p className="sub-title">Account Information</p>
//           </div>
//           <main className="setting-section">
//             <p className="setting-info">Login and security</p>
//             <ul className="setting-list">
//               <li className="setting-listed" data-username='Username' onClick={(e) => toggleIsLoading(e)}>
//                 <div className="setting-pair-listed">
//                   <PersonIcon color="primary"></PersonIcon>
//                   <h4 className="listed-header-text">Username</h4>
//                 </div>
//                 <ChevronRightIcon></ChevronRightIcon>
//               </li>
//               {page === 'Username' && showComponent[page]}
//               <li className="setting-listed" data-username='Username' onClick={(e) => toggleIsLoading(e)} >
//                 <div className="setting-pair-listed">
//                   <PhoneIcon color="primary"></PhoneIcon>
//                   <h4 className="listed-header-text">Phone Number</h4>
//                 </div>
//                 <ChevronRightIcon></ChevronRightIcon>
//               </li>
//               {page === 'Phone Number' && showComponent[page]}
//               <li className="setting-listed" data-username='Username' onClick={(e) => toggleIsLoading(e)}>
//                 <div className="setting-pair-listed">
//                   <EmailIcon color="primary"></EmailIcon>
//                   <h4 className="listed-header-text">Email</h4>
//                 </div>
//                 <ChevronRightIcon></ChevronRightIcon>
//               </li>
//               {page === 'Email' && showComponent[page]}
//               <li className="setting-listed" data-username='Username' onClick={(e) => toggleIsLoading(e)}>
//                 <div className="setting-pair-listed">
//                   <LockOpenIcon color="primary"></LockOpenIcon>
//                   <h4 className="listed-header-text">Password</h4>
//                 </div>
//                 <ChevronRightIcon></ChevronRightIcon>
//               </li>
//               {page === 'Password' && showComponent[page]}
//             </ul>
//             <p className="setting-info">Data and permissions</p>
//             <ul className="setting-list">
//               <li className="setting-listed">
//                 <div className="setting-pair-listed">
//                   <AddLocationIcon color="primary"></AddLocationIcon>
//                   <h4 className="listed-header-text">Location</h4>
//                 </div>
//                 <ChevronRightIcon></ChevronRightIcon>
//               </li>
//               <li className="setting-listed">
//                 <div className="setting-pair-listed">
//                   <AppsIcon color="primary"></AppsIcon>
//                   <h4 className="listed-header-text">Apps and sessions</h4>
//                 </div>
//                 <ChevronRightIcon></ChevronRightIcon>
//               </li>
//             </ul>
//           </main>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState } from "react";
import Navbar from "./Navbar";
import { auth } from "../firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Username from "./SettingInfo/Username";
import Password from "./SettingInfo/Password";
import PhoneNum from "./SettingInfo/PhoneNum";
import Emailinfo from "./SettingInfo/Emailinfo";
import "../StylingPages/Setting.css";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AppsIcon from "@mui/icons-material/Apps";

export default function Setting() {
  const [load, setLoad] = useState(true);
  const [openItem, setOpenItem] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleClick = (item) => {
    console.log('clicked', item);
    setOpenItem(item === openItem ? null : item);
  };

  console.log(user)

  return (
    <div>
      {load && (
        <div className="settings-wrapper">
          <Navbar user={user} />
          <div className="header-section">
            <h1 className="page-title">Settings</h1>
            <p className="sub-title">Account Information</p>
          </div>
          <main className="setting-section">
            <p className="setting-info">Login and security</p>
            <ul className="setting-list">
              <li
                className={`setting-listed ${
                  openItem === "Username" ? "show" : ""
                }`}
                onClick={() => handleClick("Username")}
              >
                <div className="setting-pair-listed">
                  <PersonIcon color="primary" />
                  <h4 className="listed-header-text">Username</h4>
                </div>
                {openItem === "Username" ? (
                  <ExpandMoreIcon />
                ) : (
                  <ChevronRightIcon className="arrow" />
                )}
              </li>
              {openItem === "Username" && (
                <Username user={user} />
              )}
              <li
                className={`setting-listed ${
                  openItem === "Phone Number" ? "open" : ""
                }`}
                onClick={() => handleClick("Phone Number")}
              >
                <div className="setting-pair-listed">
                  <PhoneIcon color="primary" />
                  <h4 className="listed-header-text">Phone Number</h4>
                </div>
                {openItem === "Phone Number" ? (
                  <ExpandMoreIcon className="arrow" />
                ) : (
                  <ChevronRightIcon className="arrow" />
                )}
              </li>
              {openItem === "Phone Number" && (
                <PhoneNum user={user} />
              )}
              <li
                className={`setting-listed ${
                  openItem === "Email" ? "open" : ""
                }`}
                onClick={() => handleClick("Email")}
              >
                <div className="setting-pair-listed">
                  <EmailIcon color="primary" />
                  <h4 className="listed-header-text">Email</h4>
                </div>
                {openItem === "Email" ? (
                  <ExpandMoreIcon className="arrow" />
                ) : (
                  <ChevronRightIcon className="arrow" />
                )}
              </li>
              {openItem === "Email" && (
                <Emailinfo  user={user}/>
              )}
              <li
                className={`setting-listed ${
                  openItem === "Password" ? "open" : ""
                }`}
                onClick={() => handleClick("Password")}
              >
                <div className="setting-pair-listed">
                  <LockOpenIcon color="primary" />
                  <h4 className="listed-header-text">Password</h4>
                </div>
                {openItem === "Password" ? (
                  <ExpandMoreIcon className="arrow" />
                ) : (
                  <ChevronRightIcon className="arrow" />
                )}
              </li>
              {openItem === "Password" && (
                <Password  user={user}/>
              )}
            </ul>
            <p className="setting-info">Data and permissions</p>
            <ul className="setting-list">
              <li className="setting-listed">
                <div className="setting-pair-listed">
                  <AddLocationIcon color="primary" />
                  <h4 className="listed-header-text">Location</h4>
                </div>
              </li>
              <li className="setting-listed">
                <div className="setting-pair-listed">
                  <AppsIcon color="primary" />
                  <h4 className="listed-header-text">Apps and sessions</h4>
                </div>
              </li>
            </ul>
          </main>
        </div>
      )}
    </div>
  );
}
