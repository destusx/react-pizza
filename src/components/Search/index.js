import { useContext, useRef, useState, useCallback } from 'react';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';

const Search = () => {
    const [value, setValue] = useState();
    const { setSearchValue } = useContext(SearchContext);
    const inputRef = useRef(null);

    const onClearInput = () => {
        setSearchValue('');
        setValue('');
        inputRef.current.focus();
    };

    const updateSearchValue = useCallback(
        debounce(str => {
            setSearchValue(str);
        }, 300),
        []
    );

    const onChangeInput = e => {
        setValue(e.target.value);
        updateSearchValue(e.target.value);
    };

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="11" cy="11" r="5.5" stroke="#000000" />
                <path
                    d="M15 15L19 19"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder="Поиск пиццы..."
            />
            {value ? (
                <svg
                    onClick={() => {
                        onClearInput();
                    }}
                    className={styles.clearIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18 6L6 18"
                        stroke="#33363F"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M6 6L18 18"
                        stroke="#33363F"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            ) : null}
        </div>
    );
};

export default Search;
