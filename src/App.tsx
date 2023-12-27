import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyPets from "./pages/MyPets/MyPets";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./hoc/Layout/Layout";
import Favorites from "./pages/Favorites/Favorites";
import Message from "./pages/MyAccount/PasswordRenewal/Message/Message";
import PersonalInformation from "./pages/MyAccount/PersonalInformation/PersonalInformation";

import ScrollToTop from "./hooks/ScrollToTop";
import PetRegForm from "./pages/PetProfile/PetRegForm/PetRegForm";
import SeePetProfile from "./pages/PetProfile/SeePetProfile/SeePetProfile";
import RegistrationForm from "./pages/MyAccount/RegistrationForm/RegistrationForm";
import WelcomeRegistration from "./pages/MyAccount/RegistrationForm/WelcomeRegistration";
import LayoutSecondary from "./hoc/LayoutSecondary/LayoutSecondary";
import ForgotPassword from "./pages/MyAccount/PasswordRenewal/ForgotPassword/ForgotPassword";
import EmailNotification from "./pages/MyAccount/PasswordRenewal/EmailNotification/EmailNotification";
import NewPassword from "./pages/MyAccount/PasswordRenewal/NewPassword/NewPassword";
import AuthForm from "./pages/MyAccount/AuthForm/AuthForm";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/pets/:id" element={<SeePetProfile />} />
            <Route
              path="/happy-stories"
              element={
                <div className="text-center p-5">
                  <h2>Щасливі історії</h2>
                  Дана сторінка знаходиться у розробці
                </div>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/messages" element={"<Messages />"} />
            <Route path="/favorites" element={<Favorites />} />

            {/* Private route */}
            <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
              <Route path="/my-pets" element={<MyPets />} />
              <Route path="/add-pet" element={<PetRegForm />} />
              <Route path="/edit-pet" element={<PetRegForm />} />
              <Route path="/my-account" element={<PersonalInformation />} />

              {/* ADMIN route */}
              <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
                <Route path="/admin-panel/*" element={<AdminPanel />} />
              </Route>
            </Route>
          </Route>

          <Route path="/welcome-reg" element={<WelcomeRegistration />} />
          <Route path="/message" element={<Message />} />
          <Route path="/" element={<LayoutSecondary />}>
            <Route path="/reg-form" element={<RegistrationForm />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/emailnotification" element={<EmailNotification />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="/auth-form" element={<AuthForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
