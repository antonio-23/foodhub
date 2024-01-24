import { useQuery } from "react-query";
import { fetchRecipes } from "../../services/recipesAPI";
import Spinner from "../Spinner";
import { Box, Image, RecipeItem, Recipes, Title } from "./styles";

function RecipeList() {
  const { isLoading, data } = useQuery({
    queryFn: fetchRecipes,
    queryKey: ["recipes"],
  });
  if (isLoading) return <Spinner />;
  return (
    <Recipes>
      {data?.map((item) => (
        <RecipeItem>
          <Box>
            <Image src={item.photo_url} />
            <Title>{item.recipe_name}</Title>
          </Box>
        </RecipeItem>
      ))}
    </Recipes>
  );
}

export default RecipeList;
