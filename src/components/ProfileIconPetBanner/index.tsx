import React from "react";

interface ShareIconPetBannerProps {
  color: string;
}

export function ProfileIconPetBanner({ color }: ShareIconPetBannerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      fill="none"
      viewBox="0 0 36 36"
    >
      <circle cx="18" cy="18" r="18" fill={color}></circle>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M25.5 25.5c0-.884-.395-2.565-1.098-3.19-.704-.626-1.657-.977-2.652-.977h-7.5c-.994 0-1.948.351-2.652.977-.703.625-1.098 2.306-1.098 3.19M18 18.833a4.167 4.167 0 100-8.333 4.167 4.167 0 000 8.333z"
      ></path>
    </svg>
  );
}
