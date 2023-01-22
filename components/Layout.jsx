// import { useState } from "react";
// import { Icon } from "@iconify/react";
// import Link from "next/link";
// import Image from "next/image";
// import { v4 as uuidv4 } from "uuid";
// import { motion, AnimatePresence } from "framer-motion";
// import { urlFor } from "../lib/client";

// const Layout = ({ children, contactInfo, about, hours }) => {
//   return (
//     <>
//       <Nav contactInfo={contactInfo} about={about} />
//       {children}
//       <Footer contactInfo={contactInfo} hours={hours} />
//     </>
//   );
// };

// const Nav = ({ contactInfo, about }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const closeModal = () => setModalOpen(false);
//   const openModal = () => setModalOpen(true);
//   // const links = ["menu"];

//   const navVariants = {
//     hidden: {
//       opacity: 0,
//     },

//     show: {
//       opacity: 1,
//       transition: {
//         type: "easeInOut",
//         duration: 1.5,
//         delay: 4,
//       },
//     },
//   };

//   return (
//     <nav className="max-w-[1110px] mx-auto fixed top-0 left-0 right-0 z-[999] bg-[white] dark:bg-[black]">
//       <motion.div
//         variants={navVariants}
//         initial="hidden"
//         animate="show"
//         className="nav relative max-w-[1110px] h-[90px] md:h-[90px] flex justify-between items-center mx-auto border-b-[2px] px-[16px] md:px-[24px] py-[9.889px] md-py[14.833px]"
//       >
//         <LogoLink />
//         <button
//           className="px-[14px] py-[8px] bg-[red] rounded-full font-[900] text-[white]"
//           onClick={() => (menuOpen ? closeMenu() : openMenu())}
//         >
//           Menu
//         </button>
//         {/* <HamburgerButton toggle={toggle} onToggle={handleToggle} /> */}
//         {/* <NavLinks links={links} /> */}
//       </motion.div>
//       <PhoneButton
//         modalOpen={modalOpen}
//         openModal={openModal}
//         closeModal={closeModal}
//       />
//       <AnimatePresence initial={false} mode="wait">
//         {menuOpen && (
//           <Menu
//             handleClose={closeMenu}
//             contactInfo={contactInfo}
//             image={about.image ? urlFor(about.image).url() : null}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence initial={false} mode="wait">
//         {modalOpen && (
//           <Modal
//             handleClose={closeModal}
//             contactInfo={contactInfo}
//             image={about.image ? urlFor(about.image).url() : null}
//           />
//         )}
//       </AnimatePresence>

//       {/* {toggle && (
//         <MobileMenu toggle={toggle} onToggle={handleToggle} links={links} />
//       )} */}
//     </nav>
//   );
// };

// const LogoLink = () => {
//   return (
//     <Link href="/">
//       <div className="relative flex items-center z-[2] cursor-pointer">
//         <div className="relative w-[60px] h-[60px]">
//           <Image src="/images/logo.png" fill alt="logo" />
//         </div>

//         <span className="font-[900] text-[16px] leading-[25px] md:text-[24px] md:leading-[44px]">
//           Mikey's Pizzeria
//         </span>
//       </div>
//     </Link>
//   );
// };

// const PhoneButton = ({ modalOpen, openModal, closeModal }) => {
//   return (
//     <div className="fixed bottom-0 right-0">
//       <button
//         onClick={() => (modalOpen ? closeModal() : openModal())}
//         className="rounded-full border-[#00B232] bg-[white] dark:bg-[black] text-[#00B232] border-[2px] m-[8px] p-[8px]"
//       >
//         <Icon icon="ph:phone-fill" height="40" />
//       </button>
//     </div>
//   );
// };

// // const HamburgerButton = ({ toggle, onToggle }) => {
// //   return (
// //     <button className="lg:hidden" onClick={onToggle}>
// //       <Icon
// //         width="40"
// //         icon={`${toggle ? "eva:close-fill" : "ic:round-menu"}`}
// //       />
// //     </button>
// //   );
// // };

// // const MobileMenu = ({ toggle, onToggle, links }) => {
// //   useEffect(() => {
// //     if (toggle) {
// //       document.body.classList.add("noscroll");
// //     }

// //     return function cleanup() {
// //       document.body.classList.remove("noscroll");
// //     };
// //   }, [toggle]);

// //   return (
// //     <ul className="absolute z-[999] flex flex-col text-right w-screen h-screen lg:hidden px-[24px]">
// //       {links.map((link) => (
// //         <li key={uuidv4()} className="text-center capitalize cursor-pointer">
// //           <Link href={`/${link}`}>
// //             <span onClick={onToggle}>{link}</span>
// //           </Link>
// //         </li>
// //       ))}
// //     </ul>
// //   );
// // };

// // const NavLinks = ({ links }) => {
// //   return (
// //     <ul className="hidden lg:flex items-center">
// //       {links.map((link) => (
// //         <li
// //           key={uuidv4()}
// //           className="my-[8px] mx-[8px] px-[0.5rem] text-center cursor-pointer"
// //         >
// //           <Link href={`/${link}`}>
// //             <span>{link}</span>
// //           </Link>
// //         </li>
// //       ))}
// //     </ul>
// //   );
// // };

// const Backdrop = ({ children, onClick }) => {
//   return (
//     <motion.div
//       onClick={onClick}
//       className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#000000e1]"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// const Modal = ({ handleClose, image, contactInfo }) => {
//   const dropIn = {
//     hidden: {
//       y: "-100vh",
//       opacity: 0,
//     },
//     visible: {
//       y: "0",
//       opacity: 1,
//       transition: {
//         duration: 0.1,
//         type: "spring",
//         damping: 25,
//         stiffness: 500,
//       },
//     },
//     exit: {
//       y: "100vh",
//       opacity: 0,
//     },
//   };

//   return (
//     <Backdrop onClick={handleClose}>
//       <motion.div
//         onClick={(e) => e.stopPropagation()}
//         className="modal max-w-[700px] flex flex-col justify-center items-center bg-[white] dark:bg-[black] dark:border-[white] dark:border-[2px] rounded-[10px] p-[24px] md:grid md:grid-cols-2"
//         variants={dropIn}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//       >
//         <div className="relative w-[250px] h-[250px] rounded-full overflow-hidden border-[10px object-cover">
//           <Image src="/images/phone-guy.jpg" fill alt="Mike" />
//         </div>

//         <div className="text-left">
//           <p className="font-[900] text-[26px] md:text-[42px] leading-[41px] my-[41px]">
//             Mike is waiting!
//           </p>
//           <Link
//             href={`tel:${contactInfo.phone}`}
//             className="flex items-center hover:underline transition-all text-[26px] font-[900] text-[red]"
//           >
//             <Icon icon="ph:phone-fill" height="26" />
//             {contactInfo.phone}
//           </Link>
//         </div>

//         <button
//           className="absolute top-0 right-0 p-[12px]"
//           onClick={handleClose}
//         >
//           <Icon icon="eva:close-fill" height="33" />
//         </button>
//       </motion.div>
//     </Backdrop>
//   );
// };

// const Menu = ({ handleClose, image, contactInfo }) => {
//   const dropIn = {
//     hidden: {
//       y: "-100vh",
//       opacity: 0,
//     },
//     visible: {
//       y: "0",
//       opacity: 1,
//       transition: {
//         duration: 0.1,
//         type: "spring",
//         damping: 25,
//         stiffness: 500,
//       },
//     },
//     exit: {
//       y: "100vh",
//       opacity: 0,
//     },
//   };

//   return (
//     <Backdrop onClick={handleClose}>
//       <motion.div
//         onClick={(e) => e.stopPropagation()}
//         className="modal max-w-[700px] flex flex-col justify-center items-center bg-[white] dark:bg-[black] dark:border-[white] dark:border-[2px] rounded-[10px] p-[24px] md:grid md:grid-cols-2"
//         variants={dropIn}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//       >
//         <button
//           className="absolute top-0 right-0 p-[12px]"
//           onClick={handleClose}
//         >
//           <Icon icon="eva:close-fill" height="33" />
//         </button>
//       </motion.div>
//     </Backdrop>
//   );
// };

// const Footer = ({ contactInfo, hours }) => {
//   return (
//     <footer className="border-t-[2px] border-[black] dark:border-[white]">
//       <div className="max-w-[1110px] w-full mx-auto py-[64px] px-[42px] mb-[89px] md:grid md:grid-cols-2">
//         <div className="mb-[64px]">
//           <p className="mb-[16px] font-[700] text-[36px]">Contact Us</p>
//           <ul>
//             <li>{contactInfo.name}</li>
//             <li>{contactInfo.addressLine1}</li>
//             <li>{contactInfo.addressLine2}</li>
//             <li className="flex items-center">
//               <Icon icon="ph:phone-fill" />
//               <span className="ml-[8px] text-[red] font-[900]">
//                 {contactInfo.phone}
//               </span>
//             </li>
//             <li className="flex items-center">
//               <Icon icon="ic:round-email" />{" "}
//               <span className="ml-[8px]">{contactInfo.email}</span>
//             </li>
//           </ul>
//           <div className="mt-[24px]">
//             <Link href={contactInfo.facebook}>
//               <Icon icon="ic:baseline-facebook" width={50} height={50} />
//             </Link>
//           </div>
//         </div>

//         <div className="mb-[12px]">
//           <p className="mb-[16px] font-[700] text-[36px]">Hours</p>
//           <ul>
//             {hours.map((day) => (
//               <li key={uuidv4()}>{`${day.name}: ${day.hours}`}</li>
//             ))}
//           </ul>
//           <p className="mb-[24px] text-[red] font-[700]">
//             Please note our annual holiday closure: January 15 - February 7,
//             2023
//           </p>
//         </div>

//         <p className="text-[12px]">
//           Copyright Mikey's Pizzeria - created by{" "}
//           <a className="underline" href="https://seanred.io">
//             seanred.io
//           </a>
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Layout;
