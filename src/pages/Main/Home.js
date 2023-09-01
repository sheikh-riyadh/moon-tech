import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrands } from "../../app/features/filter/filterSlice";
import { useGetProductsQuery } from "../../app/features/api/apiSlice";



const Home = () => {
const dispatch = useDispatch()
const {stock, brands} = useSelector(state=>state.filter)
const {data, isLoading} = useGetProductsQuery()
const products = data?.data
if(isLoading){
  return <p>Loading...</p>
}
 
  const activeClass = "text-white bg-indigo-500 border-white";

  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${stock? activeClass:null} `}
          onClick={()=> dispatch(toggle())}
        >
          In Stock
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold
        ${brands.includes('amd')? activeClass: null}`}
        onClick={()=>dispatch(toggleBrands('amd'))}
        >
          AMD
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold
        ${brands.includes('intel')? activeClass: null}
        `}
        onClick={()=>dispatch(toggleBrands('intel'))}
        >
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {products?.map((product) => (
          <ProductCard key={product.model} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
