"use client";
/* eslint-disable react/no-unescaped-entities */
import { FaReact, FaNodeJs, FaCss3Alt, FaHtml5 } from "react-icons/fa";
import { SiCsharp } from "react-icons/si";
import { BsFiletypeSql } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import { motion } from "framer-motion";

export default function About() {
  const iconData = [
    { icon: <FaReact />, description: "React" },
    { icon: <FaNodeJs />, description: "Node.js" },
    { icon: <FaCss3Alt />, description: "CSS" },
    { icon: <FaHtml5 />, description: "HTML" },
    { icon: <SiCsharp />, description: "C#" },
    { icon: <BsFiletypeSql />, description: "SQL" },
  ];

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center select-none"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="bg-zinc-300 p-4 md:p-11 rounded-lg shadow-lg text-black text-center">
        Hello! I'm a software developer, and I'm thrilled to offer my expertise
        as a full-stack developer with a passion for the world of web
        development.
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 mt-6 md:mt-10">
          {iconData.map((item, index) => (
            <Tooltip title={item.description} key={index}>
              <div className="text-center p-2 rounded-md text-4xl md:text-6xl hover:bg-white">
                {item.icon}
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
