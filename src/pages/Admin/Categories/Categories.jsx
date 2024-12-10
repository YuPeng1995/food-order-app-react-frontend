import adminApiClient from "../../../utils/adminApiClient";
import AdminNavbar from "../AdminNavbar";
import { useState, useEffect } from "react";
import DisplayCategories from "./DisplayCategories";
import NewCategory from "./NewCategory";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState("display");

    useEffect(() => { getCategories() }, []);

    async function getCategories() {
        adminApiClient.get('http://localhost:8080/admin/category/page', {
            params: {
                page: 1,
                pageSize: 20,
            }
        })
            .then((response) => {
                setCategories(response.data.data.records);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function handleEnableAndDisableCategory(status, id) {
        try {
            const response = await adminApiClient
                .post(`http://localhost:8080/admin/category/status/${status === 0 ? 1 : 0}`, null, {
                    params: { id: id },
                });
            getCategories();
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    }

    async function handleDeleteCategory(id) {
        try {
            const response = await adminApiClient.delete("http://localhost:8080/admin/category", {
                params: { id: id },
            });
            getCategories();
        } catch (error) {
            console.error('There was an error deleting the category!', error);
        }
    }

    return (
        <div className="admin-categories">
            <AdminNavbar />
            {currentPage === "display" && <DisplayCategories
                categories={categories}
                handleEnableAndDisableCategory={handleEnableAndDisableCategory}
                handleDeleteCategory={handleDeleteCategory}
                setCurrentPage={setCurrentPage}
                setCategories={setCategories}
            />}
            {currentPage === "new-category-dishes" && <NewCategory setCurrentPage={setCurrentPage} type={1} getCategories={getCategories} />}
            {currentPage === "new-category-combo-meals" && <NewCategory setCurrentPage={setCurrentPage} type={2} getCategories={getCategories} />}
        </div>
    );
}