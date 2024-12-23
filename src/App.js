// to be upload your seminar IDEA at selling items



import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar"
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword"
import UpdatePassword from "./pages/UpdatePassword"
import ItemDetails from "./components/core/Items/ItemDetails";
// import WebSocketTest from "./components/core/chat/WebSocket";
import WebSkt from "./pages/WebSkt"
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import AddItem from "./components/core/Dashboard/AddItem.js"
import Myprofile from "./components/core/Dashboard/MyProfile.jsx"
import MyItemList from "./components/core/Dashboard/MyItemList.jsx";
import EditItem from "./components/core/Dashboard/EditItem"
import SearchResults from "./components/core/Items/SearchResults.jsx";
import Catalog from "./pages/Catalog.jsx";
import Cart from "./components/core/Dashboard/Cart/index.jsx";
import About from "./pages/About.jsx";
import Indexer from "./components/core/Dashboard/settings/Indexer.jsx";
import FollowList from "./components/core/Dashboard/followHandler/FollowList.jsx"
import ProfileViewer from "./components/core/Dashboard/followHandler/ProfileViewer.jsx";
import StickyLabel from "./components/common/StickyLabel.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/common/Footer.jsx"
import { useSelector } from "react-redux";
import AddPyq from "./components/core/Dashboard/academics/AddPyq.jsx";
import ShowPaper from "./components/core/Dashboard/academics/ShowPaper.jsx";
import Create_Category from "./components/core/Dashboard/Admin/Create_Category.jsx";
import TermsAndConditions from "./components/common/TermsAndConditions.jsx";


function App() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  return (

    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="verify-email" element={<VerifyEmail />} />


        {/* WebSocket Chat */}
        <Route path="/chat" element={<WebSkt />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="update-password/:id" element={<UpdatePassword />} />
        <Route path="item/:itemId/owner/:ownerId" element={<ItemDetails />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="/profile/:friendId" element={<ProfileViewer />} />
        <Route path="/T&C" element={<TermsAndConditions />} />

        {/* Protected Routes for Dashboard */}
        <Route
          path="dashboard/*"
          element={
            <PrivateRoute>

              <Dashboard />
            </PrivateRoute>
          }
        >



          {user?.accountType === "Admin" && (
            <>
              <Route path='AddPyq' element={<AddPyq />} />

            </>
          )}
          {user?.accountType === "Admin" && (
            <>
              <Route path='addcategory' element={<Create_Category />} />

            </>
          )}


          <Route path="my-profile" element={<Myprofile />} />
          <Route path="Academics" element={<ShowPaper />} />
          <Route path="cart" element={<Cart />} />
          <Route path="add-item" element={<AddItem />} />
          <Route path="followers" element={<FollowList />} />
          <Route path="my-items" element={<MyItemList />} />
          <Route path="edit-item/:itemId" element={<EditItem />} />
          <Route path="settings" element={<Indexer />} />
        </Route>
        
      </Routes>


    //<StickyLabel /> {/* Include sticky label */}
      <Footer />
    </div>
  );
}

export default App;
