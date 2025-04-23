import React from 'react';

export default function Carousal() {
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      style = {{objectFit:"contain !important"}}
    >
      <div className="carousel-inner" id="carousal">
        <div className="carousel-caption" style={{ zIndex: '10' }}>
          <form className="d-flex justify-content-center">
            <input
              className="form-control me-2 bg-dark text-light border-secondary"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light text-white bg-success" type="submit">
              Search
            </button>
          </form>
        </div>

        {/* Slide 1 */}
        <div className="carousel-item active">
          <img
            src="https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg"
            className="d-block w-100"
            alt="Pizza"
            style={{ height: '500px', objectFit: 'cover', filter: 'brightness(30%)' }}
          />
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg"
            className="d-block w-100"
            alt="Burger"
            style={{ height: '500px', objectFit: 'cover', filter: 'brightness(30%)' }}
          />
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg"
            className="d-block w-100"
            alt="Chicken"
            style={{ height: '500px', objectFit: 'cover', filter: 'brightness(30%)' }}
          />
        </div>
      </div>

      {/* Carousel controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
