import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Axios from 'axios';
import restaurant from "../../restaurant";
import "./../../styles/Home.css"; // 可选的样式文件
import Restaurant from "./Restaurant";
import UserNavbar from "./UserNavbar";

// 请求餐厅信息的函数
const fetchRestaurant = async () => {
    const response = await Axios.get("/user/dish/list");
    return response.data;
};

export default function Home() {
    const [searchQuery, setSearchQuery] = useState(""); // 搜索框内容
    const [searchParams, setSearchParams] = useSearchParams();
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (!searchParams.get("category")) {
            setSearchParams({ category: "best-sellers" }); // Default to "best-sellers"
        } else {
            setCategory(searchParams.get("category"));
        }
    }, [searchParams, setSearchParams]);

    const handleCategoryChange = (newCategory) => {
        setSearchParams({ category: newCategory }); // Update the URL
        setCategory(newCategory); // Update the local state
    };

    // 如果搜索框为空，则显示全部菜单；否则根据搜索关键词筛选
    const displayedMenu = searchQuery
        ? restaurant.menu.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : restaurant.menu;

    const categories = ["Best Sellers", "Combo Meals", "Beverages", "Desserts"];
    const [currentCategory, setCurrentCategory] = useState(categories[0]);

    const handleTabChange = (category) => {
        setCurrentCategory(category);
    };

    return (
        <div className="home">
            {/* 餐厅基本信息 */}
            <div className="restaurant-header">
                <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                <h1 className="restaurant-name">{restaurant.name}</h1>
                <p className="restaurant-category">{restaurant.category}</p>
                <p className="restaurant-description">{restaurant.description}</p>
                <div className="restaurant-rating">Rating: {restaurant.rating} ★</div>
            </div>

            {/* 搜索菜单 */}
            <div className="menu-search">
                <input
                    type="text"
                    placeholder="Search menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
            </div>
            <div className="menu-content">
                <UserNavbar categories={categories} onTabChange={handleCategoryChange} />
                <Restaurant displayedMenu={displayedMenu} />
            </div>
        </div>

    );
}