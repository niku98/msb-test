import ProductRepository from "src/modules/products/repositories/ProductRepository";

interface ProductsCheckboxProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const ProductsCheckbox = ({ value = [], onChange }: ProductsCheckboxProps) => {
  // Handle fetch products
  const { data: productResponse } = useObxQuery({
    queryKey: ["products"],
    queryFn: () => {
      return ProductRepository.getList();
    },
    showLoading: false,
  });

  // Handle value
  const [mergedValue, setMergedValue] = useState(value);

  const isChecked = (itemValue: string) => {
    return mergedValue.includes(itemValue);
  };

  const addItem = (itemValue: string) => {
    setMergedValue((current) => {
      const newValue = current.slice(0);
      newValue.push(itemValue);
      onChange?.(newValue);

      return newValue;
    });
  };

  const removeItem = (itemValue: string) => {
    setMergedValue((current) => {
      const newValue = current.slice(0);
      const itemIndex = newValue.findIndex((item) => item === itemValue);

      if (itemIndex > -1) {
        newValue.splice(itemIndex, 1);
        onChange?.(newValue);
      }

      return newValue;
    });
  };

  useDidUpdate(() => {
    setMergedValue(value);
  }, [value]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {productResponse?.data?.map((product) => (
        <div
          key={product.id}
          className="flex flex-row items-start space-x-3 space-y-0"
        >
          <Checkbox
            id={`product-${product.id}`}
            checked={isChecked(product.id)}
            onCheckedChange={(checked) => {
              return checked ? addItem(product.id) : removeItem(product.id);
            }}
          />
          <Label htmlFor={`product-${product.id}`}>{product.title}</Label>
        </div>
      ))}
    </div>
  );
};

export default ProductsCheckbox;
