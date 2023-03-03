import { useContext } from 'react';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';

const Search = () => {
    const { searchValue, setSearchValue } = useContext(SearchContext);
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
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className={styles.input}
                placeholder="Поиск пиццы..."
            />
            {searchValue ? (
                <svg
                    onClick={() => setSearchValue('')}
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
