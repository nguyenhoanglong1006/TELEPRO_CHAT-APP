import React from "react";
import { Link } from "react-router-dom";



const P2P = () => {
  return (
    <div className="border-lighten flex items-center justify-between border-b py-3 px-3">
      <div className="flex-1"></div>
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-dark whitespace-nowrap text-center text-2xl">
          New Video Chat
        </h1>
      </div>
      <div className="flex flex-1 items-center justify-end">
        <Link style={{ color: "#0068FF", textDecoration: "none" }} to="/">
          <button className="bg-light flex h-8 w-8 items-center justify-center rounded-full">
            <i className="bx bx-x text-dark text-2xl"></i>
          </button>
        </Link>
      </div>
    </div>
    
  );
};

export default P2P;
