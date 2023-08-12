import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddBook from "./Components/AddData/AddBook";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminPage from "./Components/Admin/AdminPage";
import AdminPrivateRoute from "./Components/AdminPrivateRoute/AdminPrivateRoute";
import BookDisplay from "./Components/Display/BookDisplay";
import ViewPdf from "./Components/Display/ViewPdf";
import BannerEditDisplaybook from "./Components/EditData/BannerEditDisplaybook";
import BooklistEdit from "./Components/EditData/BookListEdit";
import FrontPageEdit from "./Components/EditData/FrontPageEdit";
import TermsConditionEdit from "./Components/EditData/TermsConditionEdit";
import Home from "./Components/Home/Home";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import TermsCondition from "./Components/TermsCondition/TermsCondition";
import NotFound from "./Components/NotFound/NotFound";
import FrontPage from "./Components/Home/New/FrontPage";
import NewLogin from "./Components/Home/New/NewLogin";
import NewSignup from "./Components/Home/New/NewSignup";
import ForgotPassword from "./Components/Home/New/ForgotPassword";
import ResetPassword from "./Components/Home/New/ResetPassword";
import PrivateRouteLogin from "./Components/Authentication/PrivateRouteLogin";
import AllUser from "./Components/EditData/AllUser";
import ClientAddBook from "./Components/AddData/ClientAddBook";
import PendingClientsBooks from "./Components/EditData/PendingClientsBooks";

function App() {
  //condition if localstroage.length home otherwise loginpage
  const loginData = sessionStorage.getItem("loginDentalJournal24Data");
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <FrontPage />
        </Route>
        <Route path="/login">{loginData ? <Home /> : <NewLogin />}</Route>
        <Route path="/signUp">{loginData ? <Home /> : <NewSignup />}</Route>
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>

        <Route path="/reset_password">
          <ResetPassword />
        </Route>

        <PrivateRouteLogin path="/home">
          <Home />
        </PrivateRouteLogin>

        <PrivateRoute path="/termsCondition">
          <TermsCondition />
        </PrivateRoute>

        <AdminPrivateRoute path="/addBook">
          <AddBook />
        </AdminPrivateRoute>

        <PrivateRoute path="/clientAddBook">
          <ClientAddBook />
        </PrivateRoute>

        <AdminPrivateRoute path="/termsConditionEdit">
          <TermsConditionEdit />
        </AdminPrivateRoute>

        <Route path="/adminLogin">
          <AdminLogin />
        </Route>

        <AdminPrivateRoute path="/dashboard">
          <AdminPage />
        </AdminPrivateRoute>

        <AdminPrivateRoute path="/allUser">
          <AllUser />
        </AdminPrivateRoute>

        <AdminPrivateRoute path="/bookListEdit">
          <BooklistEdit />
        </AdminPrivateRoute>

        <AdminPrivateRoute path="/frontPageEdit">
          <FrontPageEdit />
        </AdminPrivateRoute>

        <AdminPrivateRoute path="/bannerEditDisplaybook">
          <BannerEditDisplaybook />
        </AdminPrivateRoute>

        <AdminPrivateRoute path="/pendingClientBooks">
          <PendingClientsBooks />
        </AdminPrivateRoute>

        <PrivateRoute path="/books">
          <BookDisplay />
        </PrivateRoute>

        <PrivateRoute path="/viewPdf/:bookId">
          <ViewPdf />
        </PrivateRoute>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
