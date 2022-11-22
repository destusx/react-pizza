import React from "react";

function Categories() {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    const onClickCategory = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="categories">
            <ul>
                {categories.map((item, i) => {
                    return (
                        <li
                            onClick={() => onClickCategory(i)}
                            className={activeIndex === i ? "active" : null}
                            key={i}
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Categories;
