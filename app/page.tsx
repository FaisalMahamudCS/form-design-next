"use client";
import { useState } from 'react';

interface SelectedPages {
  all: boolean;
  page1: boolean;
  page2: boolean;
  page3: boolean;
  page4: boolean;
}

interface CheckboxInputProps {
  checked: boolean;
  onChange: () => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    <div
      className="w-6.25 h-6.25 rounded flex items-center justify-center transition-all"
      style={{
        border: checked ? '2px solid #2469F6' : '2px solid #d1d5db',
        backgroundColor: checked ? '#2469F6' : 'white'
      }}
    >
      {checked && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  </label>
);

export default function PageSelector() {
  const [selectedPages, setSelectedPages] = useState<SelectedPages>({
    all: false,
    page1: false,
    page2: false,
    page3: false,
    page4: false
  });

  const handleAllPagesToggle = (): void => {
    const newValue = !selectedPages.all;
    setSelectedPages({
      all: newValue,
      page1: newValue,
      page2: newValue,
      page3: newValue,
      page4: newValue
    });
  };

  const handlePageToggle = (page: keyof Omit<SelectedPages, 'all'>): void => {
    const newSelectedPages: SelectedPages = {
      ...selectedPages,
      [page]: !selectedPages[page]
    };

    const allIndividualSelected =
      newSelectedPages.page1 &&
      newSelectedPages.page2 &&
      newSelectedPages.page3 &&
      newSelectedPages.page4;

    newSelectedPages.all = allIndividualSelected;

    setSelectedPages(newSelectedPages);
  };

  const handleDone = (): void => {
    const selected = (Object.keys(selectedPages) as Array<keyof SelectedPages>)
      .filter(key => selectedPages[key] && key !== 'all')
      .map(key => key.replace('page', 'Page '));

    alert(`Selected: ${selected.length > 0 ? selected.join(', ') : 'None'}`);
  };

  const textStyle: React.CSSProperties = {
    color: 'rgba(31, 33, 40, 1)',
    fontFamily: 'Montserrat, sans-serif',
    fontStyle: 'normal',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '130%',
    letterSpacing: '0px',
    textAlign: 'left'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="bg-white flex flex-col justify-start items-start"
        style={{
          width: '578px',
          height: '794px',
          background: 'rgba(255, 255, 255, 1)'
        }}
      >
        <div
          className="rounded-md flex flex-col justify-start items-start "
          style={{
            width: '370px',
            margin: '104px auto 0',
            padding: '10px 0px 10px 0px',
            border: '1px solid rgba(238, 238, 238, 1)',
            boxShadow: '0px 0px 4px 0px rgba(20, 20, 20, 0.1), 0px 8px 15px 0px rgba(20, 20, 20, 0.12)'
          }}
        >
          {/* All pages option */}
          <div className="w-full flex items-center justify-between px-6 py-4 border-b-[0.7px]  border-[#CDCDCD] ">
            <span style={textStyle}>
              All pages
            </span>
            <CheckboxInput
              checked={selectedPages.all}
              onChange={handleAllPagesToggle}
            />
          </div>

          {/* Individual pages */}
          {([1, 2, 3, 4] as const).map((num) => (
            <div
              key={num}
              className="w-full flex items-center justify-between px-6 py-4  border-gray-100"
            >
              <span style={textStyle}>
                Page {num}
              </span>
              <CheckboxInput
                checked={selectedPages[`page${num}` as keyof Omit<SelectedPages, 'all'>]}
                onChange={() => handlePageToggle(`page${num}` as keyof Omit<SelectedPages, 'all'>)}
              />
            </div>
          ))}

          {/* Done button */}
          <div className="w-full px-3.75 py-2.5 pt-4">
            <button
              onClick={handleDone}
              className="w-full bg-[#FFCE22] hover:bg-[#FFD84D] text-[#1F2128] text-base font-medium rounded-md border-none cursor-pointer transition-all tracking-tight"
              style={{ padding: '14px 0' }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
