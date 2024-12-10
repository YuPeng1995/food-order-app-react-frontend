import CategoryNav from "./CategoryNav";
import { useNavigate } from "react-router-dom";

export default function DisplayCategories({ categories, handleEnableAndDisableCategory, setCurrentPage, handleDeleteCategory, setCategories }) {
    const navigate = useNavigate();

    return (
        <div className="admin-display-categories">
            <h1>Categories</h1>
            <CategoryNav setCurrentPage={setCurrentPage} setCategories={setCategories} />
            <ul className="categories-table">
                <li className="table-header">
                    <span>Name</span>
                    <span>Type</span>
                    <span>Order</span>
                    <span>Status</span>
                    <span>Update Time</span>
                    <span>Actions</span>
                </li>
                {categories.map((category) => (
                    <li key={category.id} className="table-row">
                        <span>{category.name}</span>
                        {category.type === 1 ? <span>Dish</span> : <span>Combo Meal</span>}
                        <span>{category.sortOrder}</span>
                        {category.status === 0 ? <span>Disabled</span> : <span>Enabled</span>}
                        <span>{category.updateTime}</span>
                        <div className="actions">
                            <button onClick={() => navigate("/admin/category", { state: { categoryId: category.id } })}>Update</button>
                            {category.status === 0 ?
                                <button onClick={() => handleEnableAndDisableCategory(category.status, category.id)}>Enable</button> :
                                <button onClick={() => handleEnableAndDisableCategory(category.status, category.id)}>Disable</button>}
                            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}