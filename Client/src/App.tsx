import NavBar from "./Components/NavBar/NavBar";
import ProductList from "./Components/Products/ProductList";

function App() {
  return (
    <div className="bg-gray-200 dark:bg-gray-900">
      <NavBar />
      <ProductList />
    </div>
  );
}

export default App;
