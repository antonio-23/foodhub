import { BookOutlined, UserOutlined } from "@ant-design/icons";
import Stat from "./Stat";
import { useQuery } from "@tanstack/react-query";
import { numberOfRecipes as numberOfRecipesApi } from "../../services/apiRecipe";
import { numberOfUsers as numberOfUsersApi } from "../../services/apiAuth";

export default function Stats() {
  const { data: numberOfRecipes } = useQuery(
    ["numberOfRecipes"],
    numberOfRecipesApi
  );
  const { data: numberOfUsers } = useQuery(["numberOfUsers"], numberOfUsersApi);

  return (
    <>
      <Stat
        title='Liczba użytkowników'
        color='green'
        icon={<UserOutlined />}
        value={numberOfUsers ?? 0}
      />
      <Stat
        title='Liczba przepisów'
        color='indigo'
        icon={<BookOutlined />}
        value={numberOfRecipes ?? 0}
      />
    </>
  );
}
