import axios from 'axios';
import qs from 'qs';
import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useRef } from 'react';

const Home = () => {
    const { categoryId, sort, currentPage } = useSelector(state => state.filter);
    const sortType = sort.sort;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { searchValue } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const testRef = useRef('RenderRef');
    const [isLoading, setIsLoading] = useState(true);

    const fetchPizzas = () => {
        setIsLoading(true);

        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        axios
            .get(
                `https://637de83ccfdbfd9a63a088b9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortby=${sortBy}&order=${order}${search}`
            )
            .then(res => {
                setItems(res.data);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    };

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    };

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = list.find(item => (item.sort = params.sort));

            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sortType, searchValue, currentPage]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sort: sort.sort,
                categoryId,
                currentPage,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortType, searchValue, currentPage]);

    const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={i => dispatch(setCategoryId(i))}
                />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoading ? skeletons : pizzas}</div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
