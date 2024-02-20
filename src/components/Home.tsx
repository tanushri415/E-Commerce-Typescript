import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';

const defaultFilterState = {
  price: { minPrice: null, maxPrice: null },
  rating: null,
};

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}>
      <Header />
      {/* <Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          flexDirection: 'row',
          gap: '0px',
          marginTop: '100px',
        }}>
        {products?.length > 0 && (
          <ProductFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setFilter={setFilter}
          />
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
            <Product key={index} item={item} />
          ))}
        </Box>
      </Box> */}
    </Box>
  );
};

export default Home;
