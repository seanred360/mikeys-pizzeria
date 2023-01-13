import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { client, urlFor } from "../lib/client";
import { PortableText } from "@portabletext/react";
import { v4 as uuidv4 } from "uuid";
import {
  motion,
  useInView,
  useAnimation,
  useScroll,
  useTransform,
} from "framer-motion";
import MatterBanner from "../components/MatterBanner";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Home({
  contactInfo,
  hours,
  about,
  testimonials,
  specialtyPizzas,
}) {
  return (
    <>
      <Head>
        <title>{contactInfo.name}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav contactInfo={contactInfo} about={about} />
      <main className="max-w-[1110px] mx-auto">
        {/* <SectionBanner contactInfo={contactInfo} /> */}
        <MatterBanner phoneNumber={contactInfo.phone} />
        <SectionPizza pizzas={specialtyPizzas} />
        <SectionTestimonials testimonials={testimonials} />
        <SectionPromo />
        <SectionAbout about={about} />
      </main>
      <Footer contactInfo={contactInfo} hours={hours} />
    </>
  );
}

// const SectionBanner = ({ contactInfo }) => {
//   const h1 = {
//     hidden: { opacity: 0, height: "0px" },
//     show: {
//       opacity: 1,
//       height: "auto",
//       transition: {
//         type: "easeInOut",
//         duration: 1,
//       },
//     },
//   };

//   const image = {
//     hidden: { height: "0px" },
//     show: {
//       opacity: 1,
//       height: "250px",
//       transition: {
//         type: "easeInOut",
//         duration: 2,
//         delay: 1,
//       },
//     },
//   };

//   const tagline = {
//     hidden: {
//       backgroundColor: "rgba(0, 0, 0, 1)",
//     },
//     show: {
//       backgroundColor: "rgba(0, 0, 0, 0)",
//       transition: {
//         type: "easeInOut",
//         duration: 0.8,
//         delay: 2.5,
//       },
//     },
//   };

//   const phone = {
//     hidden: {
//       backgroundColor: "rgba(0, 0, 0, 1)",
//     },
//     show: {
//       backgroundColor: "rgba(0, 0, 0, 0)",
//       transition: {
//         type: "easeInOut",
//         duration: 0.8,
//         delay: 3,
//       },
//     },
//   };

//   return (
//     <section className="w-screen h-screen max-w-[1110px] max-h-[730px]">
//       <div className="flex flex-col h-full justify-center items-center my-[26px md:my-[0] px-[16px]">
//         <motion.div
//           variants={h1}
//           initial="hidden"
//           animate="show"
//           className="overflow-hidden"
//         >
//           <h1 className="text-[52px] md:text-[85px] leading-[79px] md:leading-[129px] font-[900] mt-0">
//             HUNGRY?
//           </h1>
//         </motion.div>

//         <motion.div
//           variants={image}
//           initial="hidden"
//           animate="show"
//           className="relative w-[250px] h-[250px] mx-auto drop-shadow-2xl border-[24px] rounded-full border-black"
//         >
//           <Image src="/images/pizza-circle.png" fill alt="pizza" priority />
//         </motion.div>
//         <div className="flex flex-col text-center">
//           <motion.p
//             variants={tagline}
//             initial="hidden"
//             animate="show"
//             className="max-w-[450px] h-[auto] px-[8px] py-[16px] text-[20px] leading-[20px] font-[700] rounded-full"
//           >
//             A classic pizza taste from days-gone-by
//           </motion.p>
//           <motion.p
//             variants={phone}
//             initial="hidden"
//             animate="show"
//             className="text-[25px] leading-[39px] font-[900] rounded-full"
//           >
//             Call <span className="">{contactInfo.phone}</span>
//           </motion.p>
//         </div>
//       </div>
//     </section>
//   );
// };

const SectionPizza = ({ pizzas }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="px-[16px]">
      <h2 className="my-[32px] text-[48px] font-[700] text-center bg-[black] dark:bg-[white] dark:bg- rounded-r-[50px]">
        Pizza
      </h2>
      <motion.div
        variants={container}
        className="flex flex-col flex-wrap items-center mb-[24px] lg:mb-[32px] md:grid md:grid-cols-2 lg:grid-cols-1"
      >
        {pizzas.map((pizza, index) => (
          <SpecialtyPizza
            key={uuidv4()}
            pizza={pizza}
            order={(index % 2) + 1}
          />
        ))}
      </motion.div>
      <div className="flex justify-center pointer">
        <Link href="/menu">
          <p className="flex items-center px-[32px] py-[12px] uppercase text-[26px] leading-[42px] font-[900] rounded-[50px] bg-[red] text-[white]">
            <Icon icon="material-symbols:menu-book" width="30" />
            <span className="pl-[8px]">See Menu</span>
          </p>
        </Link>
      </div>
    </section>
  );
};

const GetColumns = (testimonials) => {
  let columns = [];
  const columnSize = 2;

  for (let i = 0; i < testimonials.length; i += columnSize) {
    columns.push(testimonials.slice(i, i + columnSize));
  }
  return columns;
};

const SectionTestimonials = ({ testimonials }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, transform: "scale(0)" },
    show: { opacity: 1, transform: "scale(1)" },
  };

  return (
    <section className="px-[16px]">
      <h3>Why Us?</h3>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        transition={{
          type: "spring",
          stiffness: 100,
        }}
        className="md:flex md:flex-wrap"
      >
        {GetColumns(testimonials).map((column) => (
          <div
            className="md:flex-[50%] md:max-w-[50%] lg:flex-[33%] lg:max-w-[33%] md:p-[4px]"
            key={uuidv4()}
          >
            {column.map((testimonial) => (
              <Testimonial
                key={uuidv4()}
                testimonial={testimonial}
                variant={item}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
};

const SectionPromo = () => {
  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        type: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      variants={item}
      initial="hidden"
      whileInView="show"
      className="px-[16px]"
    >
      <div className="md:grid md:grid-cols-2 md:justify-between md:items-start">
        <div>
          <div className="relative w-full flex justify-center mb-[18px] py-[12px] bg-[#646464] overflow-hidden rounded-[10px]">
            <Image
              src="/images/railway-city-st-thomas-logo-white.png"
              width={260}
              height={77}
              alt="Railway City St. Thomas"
            />
          </div>
          <div className="mb-[18px] md:mb-0 py-[24px] text-center rounded-[10px] border-[black] border-[1px] md:border-0">
            <p className="font-[700] text-[48px]">Gave Us</p>
            <p className="flex justify-center items-center text-[24px] text-[700] my-[24px]">
              10/10 Slices <Icon icon="fluent:food-pizza-20-filled" />
            </p>
            <Link href="https://www.railwaycitytourism.com/pizza.html">
              <span className="font-[700] text-[24px] uppercase underline">
                see why
              </span>
            </Link>
          </div>
        </div>

        <div className="relative ml-auto rounded-[10px] overflow-hidden">
          <Image
            src="/images/railway-promo.jpg"
            width={339}
            height={346}
            alt="St Thomas Pizza Trail"
          />
        </div>
      </div>
    </motion.section>
  );
};

const SectionAbout = ({ about }) => {
  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        type: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      variants={item}
      initial="hidden"
      whileInView="show"
      className="px-[16px]"
    >
      <h4>Meet the owners</h4>
      <div className="lg:grid lg:grid-cols-2 lg:items-center">
        <div className="ml-auto lg:order-2">
          <Image
            src={about.image ? urlFor(about.image).url() : null}
            width={340}
            height={227}
            alt="Mike and Ashley"
          />
          <p className="my-[18px] font-[700] text-[24px] text-center lg:order-1">
            {about.owners}
          </p>
        </div>

        <PortableText value={about.bio} />
      </div>
    </motion.section>
  );
};

const SpecialtyPizza = ({ pizza, order }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  // const { scrollYProgress } = useScroll({ container: ref });
  const isInView = useInView(ref, {
    margin: "200px 0px 0px 0px",
  });

  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [-50, 100]);

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [isInView, controls]);

  const item = {
    hidden: {
      opacity: "0",
    },
    show: {
      opacity: "1",
      transition: { type: "easeInOut", duration: 2.5 },
    },
  };

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center items-center w-full h-full mb-[32px] lg:mb-0 lg:py-[32px] px-[16px] md:justify-start lg:grid lg:grid-cols-2 lg:gap-[125px] lg:border-b-2"
    >
      <motion.div
        variants={item}
        initial="hidden"
        animate={controls}
        style={{ x, rotate: x }}
        className={`grid relative mb-[12px] md:w-[320px] md:h-[320px] mx-aut rounded-full border-[8px] border-[black] dark:border-[white] overflow-hidden ${
          order === 1 ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <Image
          src={
            pizza.image
              ? urlFor(pizza.image).url()
              : "/images/hand-drawn-pizza.png"
          }
          width={350}
          height={350}
          alt="specialty pizza"
        />
      </motion.div>

      <div
        className={`text-center lg:text-left max-w-[350px] ${
          order === 1 ? "lg:order-2 ml-auto" : "lg:order-1 mr-auto"
        }`}
      >
        <p className="md:mb-[32px] text-[26px] md:text-[43px] leading-[44px] md:leading-[71px] font-[900]">
          {pizza.name}
        </p>
        <p className="mb-[24px] md:mb-[40px] font-[400] w-[320px] md:h-[100px] lg:h-auto overflow-hidden">
          {pizza.toppings.map((topping) => (
            <span key={uuidv4()}>{`${topping} - `}</span>
          ))}
        </p>
        <p className="w-[160px] mx-auto lg:mx-0 mt-auto py-[10px] text-center font-[900] border-[2px] rounded-[50px]">
          ${pizza.price}
        </p>
      </div>
    </div>
  );
};

const Testimonial = ({ testimonial, variant }) => {
  return (
    <motion.div
      transition={{
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      }}
      variants={variant}
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-col flex-[25%] mb-[14px] px-[24px] rounded-[10px] border-[1px] border-[black] dark:border-[white]"
    >
      <div className="flex justify-center my-[24px]">
        <Icon icon="ic:round-star-border" width={30} />
        <Icon icon="ic:round-star-border" width={30} />
        <Icon icon="ic:round-star-border" width={30} />
        <Icon icon="ic:round-star-border" width={30} />
        <Icon icon="ic:round-star-border" width={30} />
      </div>
      <p>{testimonial.comment}</p>
      <div className="flex items-center my-[24px]">
        <div className="relative w-[75px] h-[75px] rounded-full overflow-hidden bg-[white]">
          <Image
            src={
              testimonial.image
                ? urlFor(testimonial.image).width(75).url()
                : `https://avatars.dicebear.com/api/avataaars/${Date.now()}.svg`
            }
            width={75}
            height={75}
            alt="testimonial"
          />
        </div>
        <p className="ml-[14px] font-[700] text-[20px]">
          {testimonial.customerName}
        </p>
      </div>
    </motion.div>
  );
};

export async function getStaticProps() {
  const contactQuery = "*[_type == 'contact'] | order(date desc)[0]";
  const contact = await client.fetch(contactQuery);

  const hoursQuery = "*[_type == 'hours'] | order(order asc)";
  const hours = await client.fetch(hoursQuery);

  const aboutQuery = "*[_type == 'about'][0]";
  const about = await client.fetch(aboutQuery);

  const testimonialsQuery =
    "*[_type == 'testimonials'] | order(_createdAt asc)";
  const testimonials = await client.fetch(testimonialsQuery);

  const specialtyPizzasQuery = "*[_type == 'specialtyPizzas'][0...3]";
  const specialtyPizzas = await client.fetch(specialtyPizzasQuery);

  return {
    props: {
      contactInfo: contact,
      hours,
      about,
      testimonials,
      specialtyPizzas,
    },
  };
}
