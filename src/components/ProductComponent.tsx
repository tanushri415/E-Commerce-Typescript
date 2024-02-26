import './Product.css';
// import { CartContext } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import { Product } from '../model';

interface Props {
  item: Product;
  detailMode?: boolean;
}
const ProductComponent: React.FC<Props> = ({ item, detailMode = false }) => {
  //   const { addToCart } = useContext(CartContext);
  // const [buttonText, setButtonText] = useState('Add to cart');
  // const [productButton, setProductButton] = useState('productButton');

  //   const addToCartHandler = () => {
  //     addToCart(item);
  //     setButtonText('Item added');
  //     setProductButton('new-btn');
  //     let reinit = () => {
  //       setButtonText('Add to cart');
  //       setProductButton('productButton');
  //     };
  //     setTimeout(reinit, 1000);
  //   };

  const navigate = useNavigate();
  return (
    <div className={`product ${detailMode ? 'detailed' : ''}`}>
      <a href={`/product/${item?.id}`} aria-label={item?.title}>
        <img className='product__image' src={item?.image} />
      </a>
      {detailMode === true ? (
        <>
          <p className='product__title'>{item?.title}</p>
          <p className='product__description'>{item?.description}</p>
        </>
      ) : (
        <p className='product__title'>{item?.title.length > 30 ? item?.title.substr(0, 30) + '...' : item?.title}</p>
      )}

      <span>
        <span className='product__price__currency'>$</span>
        <span className='product__price'>{item?.price}</span>
      </span>
      {/* <button
        className={productButton}
        onClick={(event) => {
          // addToCartHandler(event);
          console.log('add to cart called');
        }}>
        {buttonText}
      </button> */}
      {detailMode === true && (
        <button
          className='productButton'
          onClick={() => {
            navigate(-1);
          }}>
          Back to products
        </button>
      )}

      {/*
          <p>🌟</p>
          <p>🌟</p>
          <p>🌟</p>
       */}
    </div>
  );
};

export default ProductComponent;
