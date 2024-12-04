import React, { useState } from "react";

const UserNavbar = ({ categories, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(categories[0]); // 默认选中第一个分类

    const handleTabClick = (category) => {
        setActiveTab(category);
        onTabChange(category); // 通知父组件当前选中的分类
    };

    return (
        <nav className="navbar">
            <ul className="navbar-tabs">
                {categories.map((category) => (
                    <li
                        key={category}
                        className={`navbar-tab ${activeTab === category ? "active" : ""}`}
                        onClick={() => handleTabClick(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default UserNavbar;
