import React, { useState } from "react";
import ArrowRight from "../icons/ArrowRight";
import ChevLeft from "../icons/ChevLeft";
import ChevRight from "../icons/ChevRight";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import Menubar from "../icons/Menubar";
import Close from "../icons/Close";

type Props = {};

const ItemsSidebar = [
  "Summary",
  "Employees Overview",
  "Employees Details",
  "Departments",
  "Salary Analysis",
  "Training",
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
  const [chooseItem, setChooseItem] = useState<string>(ItemsSidebar[0]);
  const [open, cycleOpen] = useCycle(false, true);

  function handleChooseItem(item: string) {
    setChooseItem(item);
  }

  return (
    <div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ width: 0, height: 0 }}
            animate={{ width: "20vw", height: "auto" }}
            exit={{ width: 0, height: 0, transition: { delay: 0.7, duration: 1 } }}
            className="w-[20vw] overflow-x-hidden fixed"
          >
            <nav className="relative w-[100%] block px-3 top-0 bottom-0 bg-white shadow-xl left-0 flex-row flex-nowrap md:z-0">
              <div className="flex-col min-h-full flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">
                <div className="bg-gradient-to-tr from-blue-400 via-pink-100 to-cyan-300 flex flex-col items-stretch opacity-100 relative mt-2 mb-2 overflow-y-auto overflow-x-hidden h-auto z-40 flex-1 rounded-xl w-full">
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
                    className="md:flex-col md:min-w-full flex flex-col list-none mt-[2rem]"
                  >
                    {ItemsSidebar.map((item: string, idx: number) => (
                      <motion.span
                        key={idx}
                        onClick={() => handleChooseItem(item)}
                        whileHover={{ scale: 1.1 }}
                        variants={itemVariants}
                        className={`${
                          chooseItem === item ? "text-blue-500" : ""
                        } flex justify-center gap-[5px] text-base text-center md:min-w-full text-gray-500 uppercase font-bold pt-1 pb-4 no-underline hover:text-blue-400 cursor-pointer`}
                      >
                        {item}
                        {chooseItem === item ? <ArrowRight /> : <></>}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </nav>
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
      <div className="fixed m-2 cursor-pointer py-2 px-5" onClick={() => cycleOpen()}>{open ? <Close /> : <Menubar />}</div>
    </div>
  );
};

export default Sidebar;
