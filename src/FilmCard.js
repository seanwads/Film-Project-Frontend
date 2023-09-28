import {  useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle, CardText, ButtonGroup, Form, FormGroup, Label, Input, CardSubtitle } from 'reactstrap';

export default function FilmCard({ filmInfo, fetchFilms, updateCardCount }){
  
    const[updateActive, setUpdateActive] = useState(false);
    const[category, setCategory] = useState("");

    // useEffect(() => {
    //     fetchCategoryName();
    // })
  
    async function updateCard(){
        setUpdateActive(!updateActive);
    }
    
    // async function fetchCategoryName(){
    //     const response = await fetch('http://localhost:8080/demo/getCategoryNames?id=' + filmInfo.film_id);
    //     const body = await response.json;
    //     setCategory(body);
    // }

    return (
        <Card key={filmInfo.film_id} data-testid={'film-card-' + filmInfo.film_id} style={{minWidth: '50rem', padding:'15px', margin: '15px'}}>
            {updateActive
                ? <UpdateForm 
                    film={filmInfo}
                    updateFilm={() => updateCard()}
                    fetchFilmList={() => fetchFilms(0)}/>
                : <InfoCard
                    film={filmInfo}
                    updateFilm={() => updateCard()}
                    fetchFilmList={() => fetchFilms(0)}
                    categoryName={category}/>
            }
        </Card>
    )
    
}

function InfoCard({ film, updateFilm, fetchFilmList, categoryName }){

    async function deleteFilm(){
        await fetch('http://localhost:8080/deleteFilmByID?id=' + film.film_id, {method:'DELETE'});
        fetchFilmList();
      }

    return(
        <div>
            <CardBody>
                <CardTitle>
                    { film.title } 
                </CardTitle>

                <CardSubtitle>
                    {  }
                </CardSubtitle>

                <CardText>
                    {film.description}
                </CardText>

                <ButtonGroup>
                <Button color='primary' outline onClick={() => updateFilm(film.film_id)}>Update</Button>
                <Button color='danger' outline onClick={() => deleteFilm()}>Delete</Button>
                </ButtonGroup>

            </CardBody>
        </div>
    )
}

function UpdateForm({ film, updateFilm, fetchFilmList }){

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        await fetch('http://localhost:8080/updateFilm', {
          method:'PUT',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            "film_id": film.film_id,
            "title": event.target.nameEditInput.value,
            "description": event.target.descEditInput.value,
            "releaseYear": film.year,
            "languageId": film.language_id
          })
        });
    
        fetchFilmList();
        updateFilm();
    }

    return(
        <div>
            <Form inline onSubmit={handleSubmit}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="nameEditInput" className='mr-sm-2'>Change Title:</Label>
                <Input type="text" name="nameEditInput" id="nameEditInput" defaultValue={film.title} data-testid="nameTextbox"/>

                <Label for="descEditInput" className='mr-sm-2'>Change Description:</Label>
                <Input type="text" name="descEditInput" id="descEditInput" defaultValue={film.description} data-testid="descTextbox"/>
              </FormGroup>
              <Button type='submit' color='success' outline>Submit</Button>
            </Form>
        </div>
    )
}