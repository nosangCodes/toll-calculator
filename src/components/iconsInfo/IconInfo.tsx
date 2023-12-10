import Image from "next/image";
import React from "react";

type Props = {};

const icons = [
  {
    alt: "waypoint flag",
    label: "Waypoint Flag",
    src: "https://img.icons8.com/ios-filled/50/030CC9/flag--v1.png",
  },
  {
    alt: "start flag",
    label: "StartFlag",
    src: "https://img.icons8.com/ios-filled/50/03C937/flag--v1.png",
  },
  {
    alt: "end flag",
    label: "End Flag",
    src: "https://img.icons8.com/cotton/64/finish-flag.png",
  },
  {
    alt: "toll icon",
    label: "Toll Icon",
    src: "https://img.icons8.com/ios-filled/50/F60000/rupee.png",
  },
];

export default function IconInfo({}: Props) {
  return (
    <div className="flex flex-row justify-between mt-3">
      {icons.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 items-center">
          <Image height={20} width={20} alt={item.alt} src={item.src} />
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
