import React from "react";

function Categories({ value, onClickCategory }) {
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    return (
        <div className="categories">
            <ul>
                {categories.map((categories, i) => {
                    return (
                        <li
                            onClick={() => onClickCategory(i)}
                            className={value === i ? "active" : null}
                            key={i}
                        >
                            {categories}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Categories;
