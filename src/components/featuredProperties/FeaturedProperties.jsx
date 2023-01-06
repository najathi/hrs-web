import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const { data, loading, error } = useFetch("/hotels?featured=true");

  return (
    <div className="fp" style={{ flexWrap: 'wrap' }}>
      {loading ? "Loading" : <>
        {data.map(item => (
          <div className="fpItem" key={item._id}>
            <img
              src={item.photos ? item.photos[0] : 'https://via.placeholder.com/250x250.png'}
              alt={item.title}
              className="fpImg"
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from Rs.{item.cheapestPrice}</span>
            {item.rating &&
              <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>
            }
          </div>
        ))
        }
      </>}
    </div>
  );
};

export default FeaturedProperties;
