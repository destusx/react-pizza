import axios from 'axios';
import qs from 'qs';
import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
    const { categoryId, sort, currentPage } = useSelector(state => state.filter);
    const sortType = sort.sort;
    const dispatch = useDispatch();
    const { searchValue } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    };

    useEffect(() => {
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
    }, [categoryId, sortType, searchValue, currentPage]);

    useEffect(() => {
        const queryString = qs.stringify({
            sort: sort.sort,
            categoryId,
            currentPage,
        });

        console.log(queryString);
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
