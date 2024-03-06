import { Heading } from "../components/Heading";
import RecipesTable from "../components/RecipesTable/RecipesTable";
import { Row } from "../components/Row";

function Recipes() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Przepisy</Heading>
      </Row>
      <Row>
        <RecipesTable />
      </Row>
    </>
  );
}

export default Recipes;
