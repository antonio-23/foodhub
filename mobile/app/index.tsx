import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/welcome" />;
  // return <Redirect href="/(tabs)/home/Home" />;
}
