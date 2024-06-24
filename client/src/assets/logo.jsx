import React from "react";

const Logo = ({ showText, whiteText }) => {
  return (
    <svg
      width="116"
      height="24"
      viewBox="0 0 116 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="20" height="20" rx="4" fill="#1890FF" />
      <path d="M5 5H15V15H5V5Z" fill="white" />
      <path d="M7 7H13V13H7V7Z" fill="#1890FF" />
      <path d="M9 9H11V11H9V9Z" fill="white" />
      <g style={{ display: showText ? "block" : "none" }}>
        <text
          x="30"
          y="16"
          fill={whiteText ? "#ffffff" : "#000000"}
          fontFamily="Arial, sans-serif"
          fontSize="12"
          fontWeight="bold"
        >
          Task Manager
        </text>
      </g>
    </svg>
  );
};

export default Logo;
