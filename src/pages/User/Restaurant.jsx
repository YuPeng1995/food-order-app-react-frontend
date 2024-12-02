export default function Restaurant({ displayedMenu }) {
    return (
        <div>
            {/* 餐厅菜单 */}
            <h2 className="menu-title">Menu</h2>
            <div className="menu-list">
                {displayedMenu.length > 0 ? (
                    displayedMenu.map((item) => (
                        <div key={item.id} className="menu-item">
                            <img src={item.image} alt={item.name} className="menu-item-image" />
                            <div className="menu-item-info">
                                <h3 className="menu-item-name">{item.name}</h3>
                                <p className="menu-item-description">{item.description}</p>
                                <p className="menu-item-price">${item.price.toFixed(2)}</p>

                                {/* 数量选择器 */}
                                <div className="quantity-selector">
                                    <button className="quantity-btn" onClick={() => dispatch(removeItem({ id: item.id }))}>-</button>
                                    <span className="quantity-value">0</span>
                                    <button className="quantity-btn" onClick={() => dispatch(addItem({ id: item.id }))}>+</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-items-message">No items found.</p>
                )}
            </div>
        </div>
    );
}