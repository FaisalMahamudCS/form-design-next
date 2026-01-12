"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SelectedPages {
  all: boolean;
  page1: boolean;
  page2: boolean;
  page3: boolean;
  page4: boolean;
  page5: boolean;
  page6: boolean;
}

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  showHover: boolean;
  focused?: boolean;
  active?: boolean;
  disabled?: boolean;
}

const Checkbox = ({ checked, onChange, showHover, focused = false, active = false, disabled = false }: CheckboxProps) => {
  const baseClasses = "w-6 h-6 rounded-sm border-2 flex items-center justify-center transition-all";
  
  let checkboxClasses = baseClasses;
  
  if (disabled) {
    checkboxClasses += checked 
      ? " bg-[#E5E5E5] border-[#E5E5E5] cursor-not-allowed opacity-50"
      : " bg-white border-[#E5E5E5] cursor-not-allowed opacity-50";
  } else if (checked) {
    if (active) {
      checkboxClasses += " bg-[#1E5AE6] border-[#1E5AE6]";
    } else if (showHover) {
      checkboxClasses += " bg-[#5087F8] border-[#5087F8]";
    } else {
      checkboxClasses += " bg-[#2469F6] border-[#2469F6]";
    }
  } else {
    if (active) {
      checkboxClasses += " bg-[#F5F5F5] border-[#2469F6]";
    } else if (focused) {
      checkboxClasses += " bg-white border-[#2469F6] ring-2 ring-[#2469F6] ring-offset-1";
    } else {
      checkboxClasses += " bg-white border-[#D1D5DB]";
    }
  }

  return (
    <label className={`relative inline-flex items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />

      {/* BASE CHECKBOX */}
      <div className={checkboxClasses}>
        {checked && !disabled && (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
            <path d="M0.5 7.1L6.53451 12.4672C6.55497 12.4854 6.58626 12.4837 6.6047 12.4635L17.5 0.5" stroke="white" strokeLinecap="round" strokeWidth="1.5"/>
          </svg>
        )}
        {checked && disabled && (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
            <path d="M0.5 7.1L6.53451 12.4672C6.55497 12.4854 6.58626 12.4837 6.6047 12.4635L17.5 0.5" stroke="#9CA3AF" strokeLinecap="round" strokeWidth="1.5"/>
          </svg>
        )}
      </div>

      {/* HOVER VARIANT — OVERLAY ONLY */}
      <AnimatePresence>
        {showHover && !checked && !disabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            className="absolute inset-0 w-6 h-6 rounded-sm bg-[#2469F6] border-2 border-[#2469F6] flex items-center justify-center pointer-events-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
              <path d="M0.5 7.1L6.53451 12.4672C6.55497 12.4854 6.58626 12.4837 6.6047 12.4635L17.5 0.5" stroke="white" strokeLinecap="round" strokeWidth="1.5"/>
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
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      className="flex items-center justify-between px-6 py-4"
    >
      <span className="text-sm text-[#1F2128]">{label}</span>

      <div
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        tabIndex={0}
      >
        <Checkbox
          checked={checked}
          onChange={onChange}
          showHover={hovered}
          focused={focused}
          active={active}
        />
      </div>
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
    page5: false,
    page6: false,
  });

  const toggleAll = () => {
    const v = !selectedPages.all;
    setSelectedPages({
      all: v,
      page1: v,
      page2: v,
      page3: v,
      page4: v,
      page5: v,
      page6: v,
    });
  };

  const togglePage = (page: keyof Omit<SelectedPages, "all">) => {
    const updated = { ...selectedPages, [page]: !selectedPages[page] };
    updated.all =
      updated.page1 &&
      updated.page2 &&
      updated.page3 &&
      updated.page4 &&
      updated.page5 &&
      updated.page6;
    setSelectedPages(updated);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5]">
      <div className="w-[578px] h-[794px] bg-white flex items-center justify-center">
        <div className="bg-white w-[370px] rounded-md border border-[#EEEEEE] shadow-[0_0_4px_rgba(20,20,20,0.1),_0_8px_15px_rgba(20,20,20,0.12)] flex flex-col max-h-full">
          <div className="flex-shrink-0">
            <Row
              label="All pages"
              checked={selectedPages.all}
              onChange={toggleAll}
            />
            <div className="px-6">
              <div className="border-t border-[#CDCDCD]" />
            </div>
          </div>
          <div 
            className="overflow-y-auto scrollbar-hide" 
            style={{ maxHeight: '240px' }}
          >
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
            <Row
              label="Page 5"
              checked={selectedPages.page5}
              onChange={() => togglePage("page5")}
            />
            <Row
              label="Page 6"
              checked={selectedPages.page6}
              onChange={() => togglePage("page6")}
            />
          </div>
          <div className="flex-shrink-0">
            <div className="px-6">
              <div className="border-t border-[#CDCDCD]" />
            </div>
            <div className="p-4">
              <button 
                className="w-full bg-[#FFCE22] hover:bg-[#FFD84D] active:bg-[#FFC700] focus:outline-none focus:ring-2 focus:ring-[#FFCE22] focus:ring-offset-2 disabled:bg-[#E5E5E5] disabled:text-[#9CA3AF] disabled:cursor-not-allowed text-[#1F2128] rounded-md py-[14px] font-medium text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
