import { Icon } from "@iconify/react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const Footer = ({ contactInfo, hours }) => {
  return (
    <footer className="border-t-[2px] border-[black] dark:border-[white]">
      <div className="max-w-[1110px] w-full mx-auto py-[64px] px-[42px] mb-[89px] md:grid md:grid-cols-2">
        <div className="mb-[64px]">
          <p className="mb-[16px] font-[700] text-[36px]">Contact Us</p>
          <ul>
            <li>{contactInfo.name}</li>
            <li>{contactInfo.addressLine1}</li>
            <li>{contactInfo.addressLine2}</li>
            <li className="flex items-center">
              <Icon icon="ph:phone-fill" />
              <span className="ml-[8px] text-[red] font-[900]">
                {contactInfo.phone}
              </span>
            </li>
            <li className="flex items-center">
              <Icon icon="ic:round-email" />{" "}
              <span className="ml-[8px]">{contactInfo.email}</span>
            </li>
          </ul>
          <div className="mt-[24px]">
            <Link href={contactInfo.facebook}>
              <Icon icon="ic:baseline-facebook" width={50} height={50} />
            </Link>
          </div>
        </div>

        <div className="mb-[12px]">
          <p className="mb-[16px] font-[700] text-[36px]">Hours</p>
          <ul>
            {hours.map((day) => (
              <li key={uuidv4()}>{`${day.name}: ${day.hours}`}</li>
            ))}
          </ul>
          <p className="mb-[24px] text-[red] font-[700]">
            Please note our annual holiday closure: January 15 - February 7,
            2023
          </p>
        </div>

        <p className="text-[12px]">
          Copyright Mikey's Pizzeria - created by{" "}
          <a className="underline" href="https://seanred.io">
            seanred.io
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
