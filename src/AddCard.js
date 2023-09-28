import {  useState } from 'react';
import { Button, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function AddCardForm({ updateFilms}){

  
    const[cardContent, setCardContent] = useState(<Button onClick={() => {initAddCardMenu()}}>Add</Button>);
  
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    function initAddCardMenu(){
        setCardContent(

        <Form inline onSubmit={submitForm}>
  
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="titleInput" className='mr-sm-2'>Film Title:</Label>
              <Input type="text" placeholder="GARFIELD: THE MOVIE" name="titleInput" id="titleInput" data-testid="title-input"/>
            </FormGroup>
  
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="descriptionInput" className='mr-sm-2'>Film Description:</Label>
              <Input type="text" placeholder="A family movie about a cat" name="descriptionInput" id="descriptionInput" data-testid="desc-input"/>
            </FormGroup>
  
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="yearInput" className='mr-sm-2'>Release Year:</Label>
              <Input type="number" placeholder="2004" name="yearInput" id="yearInput" data-testid="year-input"/>
            </FormGroup>



            <Button type='submit'>Submit</Button>
  
          </Form>

      );
    }
  
    const submitForm = async(event) => {
  
      event.preventDefault();
  
      await fetch('http://localhost:8080/createFilm', {
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
      <div id='addFilmForm'>
        <Button color='primary' onClick={toggle}>
          +
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Enter details to add new film
        </ModalHeader>
        <Form onSubmit={submitForm}>
          <ModalBody>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="titleInput" className='mr-sm-2'>Film Title:</Label>
              <Input type="text" placeholder="GARFIELD: THE MOVIE" name="titleInput" id="titleInput" data-testid="title-input"/>
            </FormGroup>

            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="descriptionInput" className='mr-sm-2'>Film Description:</Label>
              <Input type="text" placeholder="A family movie about a cat" name="descriptionInput" id="descriptionInput" data-testid="desc-input"/>
            </FormGroup>

            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="yearInput" className='mr-sm-2'>Release Year:</Label>
              <Input type="number" placeholder="2004" name="yearInput" id="yearInput" data-testid="year-input"/>
            </FormGroup>
            
          </ModalBody>
          <ModalFooter>
            <Button type='submit' onClick={toggle} color='success'>Submit</Button>
            {'   '}
            <Button color='danger' onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
      </div>
      
    )
}