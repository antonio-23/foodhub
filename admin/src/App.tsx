import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Recipes from "./pages/Recipes";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout/AppLayout";
import { DarkModeProvider } from "./context/DarkModeContext";
import Account from "./pages/Account";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />

        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='users' element={<Users />} />
              <Route path='recipes' element={<Recipes />} />
              <Route path='account' element={<Account />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
