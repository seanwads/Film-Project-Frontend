import {  useState } from 'react';
import { Container, Button, ButtonGroup } from 'reactstrap';

export default function FilterBar({ getFilteredList }){

    function getFilter(i){
      getFilteredList(i);
    }
  
    const [rSelected, setRSelected] = useState(null);
  
    return(
      <Container fluid>
        <h2 style={{ padding:5}}>Filter by category:</h2>
  
        <ButtonGroup>
          <FilterButton 
            clickGetFilter={() => getFilter(0)} 
            clickSelected={() => setRSelected(0)} 
            categoryName={"All"}
            categoryId={0}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(1)} 
            clickSelected={() => setRSelected(1)} 
            categoryName={"Action"}
            categoryId={1}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(2)} 
            clickSelected={() => setRSelected(2)} 
            categoryName={"Adventure"}
            categoryId={2}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(3)} 
            clickSelected={() => setRSelected(3)} 
            categoryName={"Children"}
            categoryId={3}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(4)} 
            clickSelected={() => setRSelected(4)} 
            categoryName={"Classics"}
            categoryId={4}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(5)} 
            clickSelected={() => setRSelected(5)} 
            categoryName={"Comedy"}
            categoryId={5}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(6)} 
            clickSelected={() => setRSelected(6)} 
            categoryName={"Documentary"}
            categoryId={6}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(7)} 
            clickSelected={() => setRSelected(7)} 
            categoryName={"Drama"}
            categoryId={7}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(8)} 
            clickSelected={() => setRSelected(8)} 
            categoryName={"Family"}
            categoryId={8}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(9)} 
            clickSelected={() => setRSelected(9)} 
            categoryName={"Foreign"}
            categoryId={9}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(10)} 
            clickSelected={() => setRSelected(10)} 
            categoryName={"Games"}
            categoryId={10}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(11)} 
            clickSelected={() => setRSelected(11)} 
            categoryName={"Horror"}
            categoryId={10}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(12)} 
            clickSelected={() => setRSelected(12)} 
            categoryName={"Music"}
            categoryId={12}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(13)} 
            clickSelected={() => setRSelected(13)} 
            categoryName={"New"}
            categoryId={13}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(14)} 
            clickSelected={() => setRSelected(14)} 
            categoryName={"Sci-Fi"}
            categoryId={14}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(15)} 
            clickSelected={() => setRSelected(15)} 
            categoryName={"Sports"}
            categoryId={15}
            isSelected={rSelected}/>
          <FilterButton 
            clickGetFilter={() => getFilter(16)} 
            clickSelected={() => setRSelected(16)} 
            categoryName={"Travel"}
            categoryId={16}
            isSelected={rSelected}/>
        </ButtonGroup>
        
      </Container>
    )
}
  

//individual filter button as part of overall filter bar
function FilterButton({ clickGetFilter, clickSelected, categoryName, categoryId, isSelected}){

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
    active={isSelected===categoryId}
    >
        <div className='category-name'>
        {categoryName}
        </div>

    </Button>
)
}