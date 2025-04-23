import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Carousel */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousal">
          <div className="carousel-caption" style={{ zIndex: '10' }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 bg-dark text-light border-secondary"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-light text-white bg-success" type="submit">
                Search
              </button>
            </div>
          </div>

          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg"
              className="d-block w-100"
              alt="Pizza"
              style={{ height: '500px', objectFit: 'cover', filter: 'brightness(30%)' }}
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg"
              className="d-block w-100"
              alt="Burger"
              style={{ height: '500px', objectFit: 'cover', filter: 'brightness(30%)' }}
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg"
              className="d-block w-100"
              alt="Chicken"
              style={{ height: '500px', objectFit: 'cover', filter: 'brightness(30%)' }}
            />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Food Categories and Cards */}
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div key={data._id} className="mb-4">
              <h3 className="fs-3 m-3">{data.CategoryName}</h3>
              <hr />
              <div className="row">
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filteredItem) => (
                      <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3 mb-3">
                        <Card
                          foodItem={filteredItem}
                          options={filteredItem.options}
                        />
                      </div>
                    ))
                ) : (
                  <div>No such data found</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <Footer />
    </div>
  );
}
