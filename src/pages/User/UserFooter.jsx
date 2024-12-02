import { Link } from "react-router-dom";

export default function UserFooter() {
    return (
        <>
            {/* 底部导航 */}
            <div className="home-footer">
                <Link to="/restaurant" className="footer-link">Chat with Us</Link>
                <Link to="/orders" className="footer-link">My Orders</Link>
            </div>
        </>
    );
}