import { useQuery } from "@tanstack/react-query";
import { Heading } from "../components/Heading";
import { Row } from "../components/Row";
import { getRecipes } from "../services/apiRecipe";

function Recipes() {
  const x = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  console.log(x);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Przepisy</Heading>
      </Row>
    </>
  );
}

export default Recipes;
