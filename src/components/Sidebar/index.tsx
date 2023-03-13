import React, { useState } from "react";
import ArrowRight from "../icons/ArrowRight";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import Menubar from "../icons/Menubar";
import Close from "../icons/Close";
import { useRouter } from "next/router";

type Props = {};

const ItemsSidebar = [
  {label: "Summary", path: "/"},
  {label: "Employees Overview", path: "/employees-overview"},
  {label: "Departments", path: "/departments"},
];

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const Sidebar = (props: Props) => {
  const [open, cycleOpen] = useCycle(false, true);
  const router = useRouter();
  return (
    <div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, className: "w-[0] overflow-hidden fixed" }}
            animate={{ height: "auto", className: "md:w-[20vw] w-[100vw] overflow-hidden fixed" }}
            exit={{ className: "w-[0] overflow-hidden fixed", height: 0, transition: { delay: 0.7, duration: 1 } }}
            className="md:w-[30vw] xl:w-[20vw] w-[100vw] overflow-hidden fixed"
          >
            <nav className="relative w-[100%] block px-3 top-0 bottom-0 bg-white shadow-xl left-0 flex-row flex-nowrap md:z-0">
              <div className="flex-col min-h-full flex flex-wrap items-center justify-between w-full mx-auto overflow-hidden">
                <div className="bg-gradient-to-tr from-blue-400 via-pink-100 to-cyan-300 flex flex-col items-stretch opacity-100 relative mt-2 mb-2 overflow-hidden h-auto z-40 flex-1 rounded-xl w-full">
                  <div className="md:flex items-center flex-col text-center md:pb-2 text-gray-700 mr-0 inline-flex whitespace-nowrap text-sm uppercase font-bold p-8">
                    <img
                      src="/Unknown.png"
                      alt="..."
                      className="max-w-full rounded"
                    />
                  </div>
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={sideVariants}
                    className="md:flex-col md:min-w-full flex flex-col list-none mt-[0rem] overflow-hidden"
                  >
                    {ItemsSidebar.map((item: {label: string, path: string}, idx: number) => (
                      <motion.span
                        key={idx}
                        onClick={() => router.push(item.path)}
                        whileHover={{ scale: 1.1 }}
                        variants={itemVariants}
                        className={`${
                          router.pathname === item.path ? "text-blue-500" : ""
                        } flex justify-center gap-[5px] text-base text-center md:min-w-full text-gray-500 uppercase font-bold pt-1 pb-4 no-underline hover:text-blue-400 cursor-pointer`}
                      >
                        {item.label}
                        {router.pathname === item.path ? <ArrowRight /> : <></>}
                      </motion.span>
                    ))}
                    <span className="h-[40px]" />
                  </motion.div>
                </div>
              </div>
            </nav>
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
      <div className={`${open ? "" : "bg-blue-300 rounded-md shadow-lg hover:bg-blue-400" } fixed m-2 cursor-pointer p-3 flex gap-[5px]`} onClick={() => cycleOpen()}>{open ? <Close /> : <Menubar />}{open ? "" : "Menu"}</div>
    </div>
  );
};

export default Sidebar;
