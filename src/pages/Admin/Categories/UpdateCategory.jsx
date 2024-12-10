import { useLocation } from "react-router-dom";
import AdminNavbar from "../AdminNavbar";
import { useState } from "react";
import adminApiClient from "../../../utils/adminApiClient";
import { useNavigate } from "react-router-dom";

export default function UpdateCategory() {
    const { categoryId } = useLocation().state || "";
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    function handleOnChange(e) {
        setCategory((prevCategory) => ({ ...prevCategory, [e.target.name]: e.target.value }));
    }

    async function handleSubmitUpdateCategory(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const type = formData.get("type");
        const sortOrder = formData.get("sort-order");

        try {
            const response = await adminApiClient.put("http://localhost:8080/admin/category", {
                id: categoryId, name, type, sortOrder
            });
            console.log(response);
            navigate("/admin/categories");
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <div className="admin-categories">
            <AdminNavbar />
            <div className="admin-update-category">
                <h2>Update Category</h2>
                <form onSubmit={handleSubmitUpdateCategory}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={category.name} onChange={handleOnChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select id="type" name="type" value={category.type} onChange={handleOnChange}>
                            <option value="1">Dish</option>
                            <option value="2">Combo Meal</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="sort-order">Sort Order</label>
                        <input type="number" id="sort-order" name="sort-order" value={category.sortOrder} onChange={handleOnChange} />
                    </div>

                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
}