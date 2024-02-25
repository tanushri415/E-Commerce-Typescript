import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import { Product, ProductFilter } from '../model';
import ProductComponent from './ProductComponent';
import { productApi } from '../api';
import ProductFilterComponent from './ProductFilterComponent';

const defaultFilterState: ProductFilter = {
  price: { minPrice: undefined, maxPrice: undefined },
  rating: 0,
};

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [filter, setFilter] = useState<ProductFilter | null>(null);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      await productApi.getAllProducts().then((data) => {
        if (search !== undefined && search !== null && search.length > 0) {
          data = data.filter((product) => product.title.toUpperCase().includes(search.toUpperCase()));
        }
        const max = Math.ceil(Math.max(...data.map((product) => product.price), 100));
        const min = Math.ceil(Math.min(...data.map((product) => product.price), 0));
        //find minimum price
        setMaxPrice(max);
        //find maximum price
        setMinPrice(min);

        setFilteredProducts(data);
        setProducts(data);
      });
    };

    const fetchProductsForCategory = async (category: string) => {
      await productApi.getProductsOfSpecificCategory(category).then((data) => {
        if (search !== undefined && search !== null) {
          data = data.filter((product) => product.title.toUpperCase().includes(search.toUpperCase()));
        }

        const max = Math.ceil(Math.max(...data.map((product) => product.price), 100));
        const min = Math.ceil(Math.min(...data.map((product) => product.price), 0));
        //find minimum price
        setMaxPrice(max);
        //find maximum price
        setMinPrice(min);
        setFilteredProducts(data);
        setProducts(data);
      });
    };
    //if there is query string for category then call api to get products for category or all products
    if (category !== undefined && category !== null) {
      fetchProductsForCategory(category);
    } else {
      fetchProducts();
    }
  }, [search, category]);

  useEffect(() => {
    if (filter !== null && filter !== defaultFilterState) {
      let filteredProds = products;
      if (filter.price !== null && filter.price !== undefined) {
        if (filter.price.minPrice !== undefined) {
          filteredProds = filteredProds.filter((product) => product.price >= filter.price.minPrice!);
        }
        if (filter.price.maxPrice !== undefined) {
          filteredProds = filteredProds.filter((product) => product.price <= filter.price.maxPrice!);
        }
      }
      if (filter.rating !== 0) {
        filteredProds = filteredProds.filter((product) => product.rating >= filter.rating);
      }
      setFilteredProducts(filteredProds);
    }
  }, [filter, products]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          flexDirection: 'row',
          gap: '0px',
          marginTop: '100px',
        }}>
        {products?.length > 0 && (
          <ProductFilterComponent minPrice={minPrice} maxPrice={maxPrice} onFilterChange={setFilter} />
        )}
        <Box
          sx={{
            backgroundColor: '#EAEDED',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginLeft: '50px',
          }}>
          {filteredProducts?.map((item, index) => (
            <ProductComponent key={index} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
