type ProductSelectorProps = {
  type: string;
  setSelectedType: (type: string) => void;
};

function ProductSelector({ type, setSelectedType }: ProductSelectorProps) {
  return (
    <button
      key={type}
      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-gray-300 dark:hover:text-gray-100"
      onClick={() => setSelectedType(type)}
    >
      {type}
    </button>
  );
}
export default ProductSelector;
