
import React from 'react';
import { useParams,useLocation, useNavigate} from 'react-router-dom';  // To extract URL params
import './productDetails.css'

const ProductDetailsC = () => {
const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  // The article data passed from the previous page
  const article = location.state?.article;
  console.log(article)

  return (
    <div className='details-cards'>
      <div>
      {/* Use article data to display details */}
      <h1>{article.title}</h1>
      <img
        src={article.image}
        alt={article.title}
        className="img-item"
        onError={(e) => (e.target.src = '/media/default.jpg')} // Add fallback
      />
   
      <div>{article.author}</div>
      {/* Other details */}
      <div>
      <button onClick={() => navigate(-1)} className="nav-button">retour</button>
      </div>
      </div>
      
    </div>

      // <div className="card" >
      //       <img src={article.image} alt={article.image} className="card-image" />
      //       <div className="card-content">
      //            <h3 className="card-title">{article.title}</h3>
      //           <p className="card-author">Par :{article.author}</p>
      //       </div>
      //   </div>


  );
};
export default ProductDetailsC;

