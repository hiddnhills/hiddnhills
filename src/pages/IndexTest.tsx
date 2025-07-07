import React from "react";

const IndexTest = () => {
  return (
    <div className="min-h-screen bg-pure-black text-pure-white relative">
      <h1>Test Component</h1>

      {/* Copyright - Bottom Right Corner */}
      <div className="absolute bottom-2 right-2 z-30">
        <div className="text-gray-400 text-[9px] font-light tracking-wide opacity-60">
          © 2025 ITSWINMEDIA
        </div>
      </div>
    </div>
  );
};

export default IndexTest;
