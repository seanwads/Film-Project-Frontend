import {  useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle, CardText, ButtonGroup, Form, FormGroup, Label, Input, CardSubtitle } from 'reactstrap';

export default function FilmCard({ filmInfo, fetchFilms, updateCardCount }){
  
    const[updateActive, setUpdateActive] = useState(false);
    const[categories, setCategories] = useState([]);
    let isLoading=true;
    
  
    async function updateCard(){
        setUpdateActive(!updateActive);
    }

    useEffect(() => {
        if(isLoading){
            fetchCategoryData('http://sakilaproject-env.eba-bus2q3ex.eu-north-1.elasticbeanstalk.com/getCategory?id=' + filmInfo.film_id);
            isLoading=false;
        }
    },[])

    async function fetchCategoryData(link) {
        const response = await fetch(link);
        const body = await response.json();
        setCategories(body);
    }
    
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
                    categoryList={categories}/>
            }
        </Card>
    )
    
}

function InfoCard({ film, updateFilm, fetchFilmList, categoryList}){

    async function deleteFilm(){
        await fetch('http://sakilaproject-env.eba-bus2q3ex.eu-north-1.elasticbeanstalk.com/deleteFilmByID?id=' + film.film_id, {method:'DELETE'});
        fetchFilmList();
    }
    
    


    return(
        <div>
            <CardBody>
                <CardTitle>
                    { film.title } 
                </CardTitle>

                <CardSubtitle>
                    { film.rating } 
                    {categoryList.map(category => <p key={category.category_id}>{category.name} </p>)}
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
    
        await fetch('http://sakilaproject-env.eba-bus2q3ex.eu-north-1.elasticbeanstalk.com/updateFilm', {
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