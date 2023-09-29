import './App.css';
import { useEffect, useState } from 'react';
import { CardGroup, Col, Navbar, NavbarBrand, Row } from 'reactstrap';
import FilmCard from './FilmCard';
import FilterBar from './FilterBar';
import AddCard from './AddCard';
import FilterBarRating from './FilterBarRating';

export default function App() {

  const[filmResponse, setFilmResponse] = useState([]);
  let isLoading = true;

  useEffect(() => {
    if(isLoading){
      fetchFilmData('http://sakilaproject-env.eba-bus2q3ex.eu-north-1.elasticbeanstalk.com/allFilms');
      isLoading=false;
    }
    
  }, [])


  async function fetchFilmData(link) {
    const response = await fetch(link);
    const body = await response.json();
    setFilmResponse(body);
  }

  function FetchFilteredCatList(i){
    fetchFilmData('http://sakilaproject-env.eba-bus2q3ex.eu-north-1.elasticbeanstalk.com/filterFilmsByCategory?id=' + i);
  }

  function FetchFilteredRatList(rating){
    if(rating === "all"){
      fetchFilmData('http://sakilaproject-env.eba-bus2q3ex.eu-north-1.elasticbeanstalk.com/filterFilmsByCategory?id=0');
    }
    else {
      fetchFilmData('http://sakilaproject-env.eba-bus2q3ex.eu-north-1.elasticbeanstalk.com/filterFilmsByRating?rating=' + rating)
    }
  }

  return (
    <div className="App">
      <Navbar color='dark'>
        <NavbarBrand>
          <h2 style={{color:'DodgerBlue'}}>Totally Real And Not Auto-Generated Movies</h2>
        </NavbarBrand>
      </Navbar>
        <Row>
          <Col xs="6">
            <FilterBar getFilteredList={FetchFilteredCatList} />
          </Col>
          <Col xs="6">
            <FilterBarRating getFilteredList={FetchFilteredRatList} />
          </Col>
        </Row>
        <div className='list'>

          <div className='page-content'>
          <AddCard 
            updateFilms={() => FetchFilteredCatList(0)}
            />
            <CardGroup>
              { filmResponse.map(film =>
                <FilmCard key={film.film_id}
                filmInfo={film}
                  fetchFilms={() => FetchFilteredCatList(0)}
                  />
              )}
            </CardGroup>
        </div>
      </div>
    </div>
  );
}