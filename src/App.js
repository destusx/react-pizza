import Header from "./scss/components/Header";
import Categories from "./scss/components/Categories";
import Sort from "./scss/components/Sort";
import PizzaBlock from "./scss/components/PizzaBlock";
import "./scss/app.scss";

function App() {
    return (
        <div class="wrapper">
            <Header />
            <div class="content">
                <div class="container">
                    <div class="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 class="content__title">Все пиццы</h2>
                    <div class="content__items">
                        <PizzaBlock title="Мексиканская" price={500} />
                        <PizzaBlock />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
