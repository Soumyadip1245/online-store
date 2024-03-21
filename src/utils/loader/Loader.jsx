import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const Loader = ({full}) => {
  return (
    <div
    
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: full ? "100%": "calc(100% - 200px)",
        height: "100%",
        background: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999, 
        backdropFilter: "blur(5px)", 
      }}
    >

      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};

export default Loader;
