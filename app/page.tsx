"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";

interface SelectedPages {
  all: boolean;
  page1: boolean;
  page2: boolean;
  page3: boolean;
  page4: boolean;
}

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  showHover: boolean;
}

const Checkbox = ({ checked, onChange, showHover }: CheckboxProps) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />

      {/* BASE CHECKBOX — NEVER TOUCHED */}
      <div
        className={`w-6 h-6 rounded border-2 flex items-center justify-center
          ${checked ? "bg-[#2469F6] border-[#2469F6] hover:bg-[#5087F8]" : "bg-white border-gray-300"}
        `}
      >
        {checked && (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
<path d="M0.5 7.1L6.53451 12.4672C6.55497 12.4854 6.58626 12.4837 6.6047 12.4635L17.5 0.5" stroke="white" stroke-linecap="round"/>
</svg>
        )}
      </div>

      {/* HOVER VARIANT — OVERLAY ONLY */}
     <AnimatePresence>
  {showHover && !checked && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0 }} // instant
      className="
        absolute inset-0
        w-6 h-6 rounded
        bg-[#2469F6] border-2 border-[#2469F6]
        flex items-center justify-center
        pointer-events-none
      "
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
<path d="M0.5 7.1L6.53451 12.4672C6.55497 12.4854 6.58626 12.4837 6.6047 12.4635L17.5 0.5" stroke="white" stroke-linecap="round"/>
</svg>
      
    </motion.div>
  )}
</AnimatePresence>
    </label>
  );
};

const Row = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-between px-6 py-4"
    >
      <span className="text-sm text-[#1F2128]">{label}</span>

      <Checkbox
        checked={checked}
        onChange={onChange}
        showHover={hovered}
      />
    </div>
  );
};

export default function PageSelector() {
  const [selectedPages, setSelectedPages] = useState<SelectedPages>({
    all: false,
    page1: false,
    page2: false,
    page3: false,
    page4: false,
  });

  const toggleAll = () => {
    const v = !selectedPages.all;
    setSelectedPages({
      all: v,
      page1: v,
      page2: v,
      page3: v,
      page4: v,
    });
  };

  const togglePage = (page: keyof Omit<SelectedPages, "all">) => {
    const updated = { ...selectedPages, [page]: !selectedPages[page] };
    updated.all =
      updated.page1 &&
      updated.page2 &&
      updated.page3 &&
      updated.page4;
    setSelectedPages(updated);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5]">
    <div className="w-[578px] h-[794px]
  bg-white flex items-center justify-center">
      <div className="bg-white w-[370px] rounded-md border border-[#eee] border border-[#EEEEEE]
shadow-[0_0_4px_rgba(20,20,20,0.1),_0_8px_15px_rgba(20,20,20,0.12)] ">
        <Row
          label="All pages"
          checked={selectedPages.all}
          onChange={toggleAll}
        />
<div className="px-[15px]">
  <div className="border-t border-[#CDCDCD]" />
</div>
        <Row
          label="Page 1"
          checked={selectedPages.page1}
          onChange={() => togglePage("page1")}
        />
        <Row
          label="Page 2"
          checked={selectedPages.page2}
          onChange={() => togglePage("page2")}
        />
        <Row
          label="Page 3"
          checked={selectedPages.page3}
          onChange={() => togglePage("page3")}
        />
        <Row
          label="Page 4"
          checked={selectedPages.page4}
          onChange={() => togglePage("page4")}
        />

<div className="px-[15px]">
  <div className="border-t border-[#CDCDCD]" />
</div>
        <div className="p-4">
          <button className="w-full bg-[#FFCE22] hover:bg-[#FFD84D] text-[#1F2128] rounded-md py-[14px]">
            Done
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
