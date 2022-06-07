import React from "react";
export function Router() {
  return (
    <div id="router" style={MyStyle.contener}>
      <h1 style={MyStyle.texth1}>
        Hello from <br /> Oybek Abdujabborov :)
      </h1>
      <a
        style={MyStyle.aLinck}
        href="http://axsi.uz"
        target="_blank"
        rel="noopener noreferrer"
      >
        My Web Site
      </a>
    </div>
  );
}

// bu faqat test uchun

const MyStyle = {
  contener: {
    with: "100%",
    height: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  texth1: {
    color: "blue",
    textAlign: "center",
  },

  aLinck: {
    color: "blue",
    padding: "10px",
  },
};
