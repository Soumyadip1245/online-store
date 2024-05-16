import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const Loader = ({full}) => {
  return (
    <div
    
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: full ? "100%": "calc(100% - 285px)",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <div className="backend-containeri">
                        <div className="backend-loader"></div>
                        <div className="backend-loader delay1"></div>
                        <div className="backend-loader delay2"></div>
                        <div className="backend-loader delay4"></div>
                    </div>
     
    </div>
  );
};

export default Loader;
