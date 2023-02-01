import './App.css';
// import axios from 'axios';
import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(response => response.json())
      .then(data => setData(data.products.slice(0,50)))
      .catch(error => setError(error));
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    
    <div className="container">
      <input type="search" placeholder='Search Bar'></input>
      <div className='container2'>
      <div className="card-deck">
        {currentItems.map(item => (
          <div key={item.id} className="card col-3">
            <div className='content-img'>
            <h2 className='card-title'>{item.title}</h2>
            <img src={item.thumbnail} alt={item.title} className="img" />
            <p className='discription'>{item.description}</p>
            </div>
          </div>
      ))}
      </div>
      </div>
        {pageNumbers.map(number => (
          <button key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </button>
        ))}
        <p>Please click on button for the respective page</p>
        <p>Please Wait until it load, its taking few seconds to load. thank you</p>
  </div>
  );
};


export default App;