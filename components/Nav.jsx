import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { urlFor } from "../lib/client";

const Nav = ({ contactInfo, about }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const navVariants = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,
      transition: {
        type: "easeInOut",
        duration: 1.5,
        delay: 4,
      },
    },
  };

  return (
    <>
      <PhoneButton
        modalOpen={modalOpen}
        openModal={openModal}
        closeModal={closeModal}
      />

      <AnimatePresence initial={false} mode="wait">
        {modalOpen && (
          <Modal
            handleClose={closeModal}
            contactInfo={contactInfo}
            image={about.image ? urlFor(about.image).width(500).url() : null}
          />
        )}
      </AnimatePresence>

      <div className="fixed top-0 left-0 right-0 w-screen z-[999] backdrop-filter backdrop-blur-lg">
        <nav className="max-w-[1110px] mx-auto ">
          <motion.div
            variants={navVariants}
            initial="hidden"
            animate="show"
            className="nav relative max-w-[1110px] h-[90px] md:h-[90px] flex justify-between items-center mx-auto border-b-[2px] px-[16px] md:px-[24px] py-[9.889px] md-py[14.833px]"
          >
            <LogoLink />
            <Link
              href="https://scontent.fykz1-2.fna.fbcdn.net/v/t39.30808-6/284609747_1173930026756175_1179376621622275119_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4c01c&_nc_ohc=_oeYSEFqP8QAX8Md4W9&_nc_ht=scontent.fykz1-2.fna&oh=00_AfDkRKTCPe1K0J_cKvAzcyMXUU8CmIwjjkgnBF8NSCM-cQ&oe=63D2D6E8"
              target="_blank"
            >
              <span className="px-[14px] py-[8px] bg-[transparent] rounded-full font-[900] border-[1px] hover:bg-[red]">
                Menu
              </span>
            </Link>
          </motion.div>
        </nav>
      </div>
    </>
  );
};

const LogoLink = () => {
  return (
    <Link href="/">
      <div className="relative flex items-center z-[2] cursor-pointer">
        <div className="relative w-[60px] h-[60px]">
          <Image src="/images/logo.png" fill alt="logo" />
        </div>

        <span className="font-[900] text-[26px] leading-[25px] md:text-[26px] md:leading-[44px]">
          Mikey's Pizzeria
        </span>
      </div>
    </Link>
  );
};

const PhoneButton = ({ modalOpen, openModal, closeModal }) => {
  return (
    <div className="fixed bottom-0 right-0">
      <button
        onClick={() => (modalOpen ? closeModal() : openModal())}
        className="rounded-full border-[#00B232] bg-[white] dark:bg-[black] text-[#00B232] border-[2px] m-[8px] p-[8px] hover:bg-[green]"
      >
        <Icon icon="ph:phone-fill" height="40" />
      </button>
    </div>
  );
};

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="z-[999] fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#000000e1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

const Modal = ({ handleClose, image, contactInfo }) => {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="z-[999] modal max-w-[700px] flex flex-col justify-center items-center bg-[white] dark:bg-[black] dark:border-[white] dark:border-[2px] rounded-[10px] p-[24px] md:grid md:grid-cols-2"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="relative flex justify-center items-center w-[250px] h-[250px] rounded-full overflow-hidden border-[10px] bg-[white] object-cover">
          <Image src={image} width="250" height="250" alt="Mike" />
        </div>

        <div className="text-left">
          <p className="font-[900] text-[26px] md:text-[42px] leading-[41px] my-[41px]">
            Mike is waiting!
          </p>
          <Link
            href={`tel:${contactInfo.phone}`}
            className="flex items-center hover:underline transition-all text-[26px] font-[900] text-[red]"
          >
            <Icon icon="ph:phone-fill" height="26" />
            {contactInfo.phone}
          </Link>
        </div>

        <button
          className="absolute top-0 right-0 p-[12px]"
          onClick={handleClose}
        >
          <Icon icon="eva:close-fill" height="33" />
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default Nav;
