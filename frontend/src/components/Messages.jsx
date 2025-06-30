import React from "react";

const Messages = ({ variant, children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "bg-green-100 text-green-800 text-xl";
      case "error":
        return "bg-red-100 text-red-800 text-xl";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return <div className={`p-4 ${getVariantClass()}`}>{children}</div>;
};

export default Messages;
