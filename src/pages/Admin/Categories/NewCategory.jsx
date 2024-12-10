import adminApiClient from "../../../utils/adminApiClient";

export default function NewCategory({ type, setCurrentPage, getCategories }) {

    async function handleSubmitNewCategory(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const sortOrder = formData.get("sort-order");
        try {
            const response = await adminApiClient.post("http://localhost:8080/admin/category", {
                name,
                sortOrder,
                type
            });
            console.log(response);
            getCategories();
            setCurrentPage("display");
        } catch (error) {
            console.error('There was an error adding the category!', error);
        }
    }

    return (
        <div className="admin-new-category">
            <h2>Add {type === 1 ? "Dish" : "Combo Meal"} Category</h2>
            <form onSubmit={handleSubmitNewCategory}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" />
                </div>

                <div className="form-group">
                    <label htmlFor="sort-order">Sort Order</label>
                    <input type="text" id="sort-order" name="sort-order" />
                </div>

                <button type="submit" className="submit-button">Submit</button>
                <button onClick={() => setCurrentPage("display")}>Cancel</button>
            </form>
        </div>
    );
}