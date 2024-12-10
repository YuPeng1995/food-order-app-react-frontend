import { useState } from "react";
import adminApiClient from "../../../utils/adminApiClient";
export default function CategoryNav({ setCurrentPage, setCategories }) {
    const [searchName, setSearchName] = useState("");
    const [searchType, setSearchType] = useState("");

    function handleSearchCategories() {
        adminApiClient.get("http://localhost:8080/admin/category/page", {
            params: { name: searchName, type: searchType, page: 1, pageSize: 10 }
        }).then((response) => {
            console.log(response.data.data.records);
            setCategories(prev => response.data.data.records);
        });
    }

    return (
        <div className="admin-categories-nav">
            <div className="admin-categories-search">
                <div className="admin-categories-search-name">
                    <label htmlFor="search-name">Category Name</label>
                    <input type="text" id="search-name" placeholder="Search categories" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                </div>
                <div className="admin-categories-search-type">
                    <label htmlFor="search-type">Category Type</label>
                    <select id="search-type" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option >All</option>
                        <option value="1">Dishes</option>
                        <option value="2">Combo Meals</option>
                    </select>
                </div>
                <button onClick={handleSearchCategories}>Search</button>
            </div>
            <div className="admin-categories-add">
                <button onClick={() => setCurrentPage("new-category-dishes")}>Add Dishes Category</button>
                <button onClick={() => setCurrentPage("new-category-combo-meals")}>Add Combo Meals Category</button>
            </div>
        </div>
    );
}