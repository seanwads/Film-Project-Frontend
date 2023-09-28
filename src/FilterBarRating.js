import {  useState } from 'react';
import { Container, Button, ButtonGroup } from 'reactstrap';

export default function FilterBarRating({ getFilteredList }){

    function getFilter(rating){
      getFilteredList(rating);
    }
  
    const [rSelected, setRSelected] = useState(null);
  
    return(
      <Container fluid>
        <h2 style={{ padding:5}}>Filter by category:</h2>
        <ButtonGroup>
            <FilterButton 
            clickGetFilter={() => getFilter("G")} 
            clickSelected={() => setRSelected(1)} 
            ratingName={"G"}
            ratingId={1}
            isSelected={rSelected}/>

            <FilterButton 
            clickGetFilter={() => getFilter("PG")} 
            clickSelected={() => setRSelected(2)} 
            ratingName={"PG"}
            ratingId={2}
            isSelected={rSelected}/>

            <FilterButton 
            clickGetFilter={() => getFilter("PG13")} 
            clickSelected={() => setRSelected(3)} 
            ratingName={"PG13"}
            ratingId={3}
            isSelected={rSelected}/>

            <FilterButton 
            clickGetFilter={() => getFilter("NC17")} 
            clickSelected={() => setRSelected(4)} 
            ratingName={"NC17"}
            ratingId={4}
            isSelected={rSelected}/>

            <FilterButton 
            clickGetFilter={() => getFilter("R")} 
            clickSelected={() => setRSelected(5)} 
            ratingName={"R"}
            ratingId={5}
            isSelected={rSelected}/>
        </ButtonGroup>
      </Container>
    )
}
  

//individual filter button as part of overall filter bar
function FilterButton({ clickGetFilter, clickSelected, ratingName, ratingId, isSelected}){

function handleClick(filter, selected, setFilterState){
    filter();
    selected();
}

return(

    <Button 
    className='filterButton'
    color="primary"
    size='sm'
    outline
    onClick={() => {handleClick(clickGetFilter, clickSelected)}}
    active={isSelected===ratingId}
    >
        <div>
        {ratingName}
        </div>

    </Button>
)
}