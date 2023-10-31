import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";

import City from "./components/City.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import Form from "./components/Form.jsx";
import ProtectedRoute from "./Pages/ProtectedRoute.jsx";
import { Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

const HomePage = lazy(() => import("./Pages/Homepage.jsx"));
const AppLayOut = lazy(() => import("./Pages/AppLayout.jsx"));
const Login = lazy(() => import("./Pages/Login.jsx"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound.jsx"));
const Pricing = lazy(() => import("./Pages/Pricing.jsx"));
const Product = lazy(() => import("./Pages/Product.jsx"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayOut />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                {/* replace to make it possible to get back, because without replace it`ll not allow you to go back to previous page */}
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
