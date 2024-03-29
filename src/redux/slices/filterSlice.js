import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sort: 'rating',
    },
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.currentPage = +action.payload.currentPage;
            state.categoryId = +action.payload.categoryId;
            state.sort = action.payload.sort;
        },
    },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
    filterSlice.actions;

export default filterSlice.reducer;
