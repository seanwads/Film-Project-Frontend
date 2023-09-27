import {  useState } from 'react';
import { Button, Card, CardBody, CardTitle, Form, FormGroup, Label, Input } from 'reactstrap';

export default function AddCard({ updateFilms}){

  
    const[cardContent, setCardContent] = useState(<Button onClick={() => {initAddCardMenu()}}>Add</Button>);
  


    function initAddCardMenu(){
        setCardContent(
        <Form inline onSubmit={submitForm}>
  
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="title-input" className='mr-sm-2'>Film Title:</Label>
              <Input type="text" placeholder="GARFIELD: THE MOVIE" name="titleInput" id="titleInput" data-testid="title-input"/>
            </FormGroup>
  
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="description-input" className='mr-sm-2'>Film Description:</Label>
              <Input type="text" placeholder="A family movie about a cat" name="descriptionInput" id="descriptionInput" data-testid="desc-input"/>
            </FormGroup>
  
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="year-input" className='mr-sm-2'>Release Year:</Label>
              <Input type="number" placeholder="2004" name="yearInput" id="yearInput" data-testid="year-input"/>
            </FormGroup>
  
            <Button type='submit'>Submit</Button>
  
          </Form>
      );
    }
  
    const submitForm = async(event) => {
  
      event.preventDefault();
  
      await fetch('http://localhost:8080/demo/createFilm', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "film_id": 0,
          "title": event.target.titleInput.value,
          "description": event.target.descriptionInput.value,
          "releaseYear": event.target.yearInput.value,
          "languageId": 1
        })});
  
        updateFilms();
  
    }
  
  
    return(
      <Card id="add-card">
        <CardTitle>ADD FILM</CardTitle>
        <CardBody>
          {cardContent}
        </CardBody>
      </Card>
    )
}