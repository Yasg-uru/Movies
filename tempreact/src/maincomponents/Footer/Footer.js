import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-footer social">
        <p className="ptag">facebook</p>
        <p className="ptag">whatsapp</p>
        <p className="ptag">instagram</p>
      </div>
      <div className="container-footer">
        <p className="company">Watch movie with friends</p>
      </div>
      <div className="container-footer">
        <p>&copy; 2024 watch movie</p>
      </div>
    </footer>
  );
}
