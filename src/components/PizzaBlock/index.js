import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

const typeNames = ['тонкое', 'традиционное'];

function PizzaBlock({ id, name, imageUrl, price, sizes, types }) {
    const [actviveType, setActiveType] = useState(0);
    const [actviveSize, setActiveSize] = useState(0);
    const cartItem = useSelector(state =>
        state.cart.items.find(item => item.id === id)
    );

    console.log(cartItem);

    const dispatch = useDispatch();

    const addedCount = cartItem ? cartItem.count : 0;

    const onAdd = () => {
        const item = {
            id,
            name,
            imageUrl,
            price,
            type: typeNames[actviveType],
            size: sizes[actviveSize],
        };
        dispatch(addItem(item));
    };

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
                <h4 className="pizza-block__title">{name}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((item, i) => (
                            <li
                                key={i}
                                onClick={() => setActiveType(i)}
                                className={actviveType === item ? 'active' : ''}
                            >
                                {typeNames[item]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((item, i) => (
                            <li
                                key={i}
                                onClick={() => setActiveSize(i)}
                                className={actviveSize === i ? 'active' : null}
                            >
                                {item} см.
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <button
                        onClick={onAdd}
                        className="button button--outline button--add"
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PizzaBlock;
