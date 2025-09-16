import React from "react";
import { Link } from "react-router-dom";
import "../MainPage.css"; // ✅ 별도 CSS 파일

const menus = [
  { path: "/product", label: "📦 Product" },
  { path: "/sales", label: "💰 Sales" },
  { path: "/category", label: "📂 Category" },
  { path: "/location", label: "🌍 Location" },
  { path: "/promotion", label: "🎉 Promotion" },
  { path: "/productClassification", label: "🗂️ Product Classification" },
  { path: "/date", label: "📅 Date" },
  { path: "/channel", label: "📡 Channel" },
  { path: "/user", label: "📡 User" },

];

const MainPage = () => {
  return (
    <div className="main-container">
      <h1 className="main-title">📊 Data Dashboard</h1>
      <p className="main-subtitle">원하는 메뉴를 선택해 데이터 테이블을 확인하세요</p>

      <div className="card-grid">
        {menus.map((menu) => (
          <Link key={menu.path} to={menu.path} className="card">
            {menu.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
