import Header from "../components/Header";
import RecipeList from "../components/RecipeList";
import { Content, Wrapper } from "./styles";

function Recipes() {
  return (
    <Wrapper>
      <Header label="Przepisy" />
      <Content>
        <RecipeList />
      </Content>
    </Wrapper>
  );
}

export default Recipes;
