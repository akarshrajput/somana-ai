import Link from "next/link";
import React from "react";

const BaseButton = ({ href = "", className = "", children = "" }) => {
  return (
    <div>
      <Link
        href={href}
        className={`flex items-center bg-stone-900 hover:bg-stone-700 gap-2 py-1.5 px-2.5 rounded-md ${className}`}
      >
        {children}
      </Link>
    </div>
  );
};

export default BaseButton;
