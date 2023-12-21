import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  NavLink,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import AuthService from "services/auth.service";

import Discover from "pages/Discover";
import Profile from "pages/Profile";
import { DiscoverContext } from "common/Context";
import Dashboard from "pages/Dashboard";
import AccountBoard from "components/Profile/AccountBoard";
import PaymentBoard from "components/Profile/PaymentBoard";
import WelcomePage from "pages/WelcomePage";

const DISCOVERS = [
  {
    title: "Create a PCOS Friendly Meal Plan",
    imgUrl: "assets/images/discover/Create PCOS Friendly Meal Plan.png",
    assistantID: "asst_velI3sQFDjxH0aqd8wFPnW1v",
    baseContext: `Great! Let’s make a meal plan together. Your meal plan will be PCOS friendly and customized to your needs.

    If there’s anything you don’t like in your final plan, let me know and we can always adjust it.\n
    
    Can you start off by telling me if you want a plan for 1 day, 1 week or even longer?
    `,
  },
  {
    title: "Explore Nutritional Supplement Options",
    imgUrl: "assets/images/discover/Explore Nutritional Supplement Options.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Sure! Let’s create a personalized supplement plan for your PCOS type.

    First of all, can you start off by telling me some of the symptoms you are experiencing?\n
    
    If you changes to your plan at any time, let me know and we can make changes.
    `,
  },
  {
    title: "Understand my PCOS type",
    imgUrl: "assets/images/discover/Understand my PCOS type.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Sure! I'd love to help you understand your PCOS type. 

    Why don't you start by telling me some information about your symptoms?\n
  
    Do you suffer from acne; hair loss; excess weight; insulin resistance or anything else related to PCOS?\n
    
    I may ask you a lot of questions, so if you don’t know an answer just say “I don’t know”.
    `,
  },
  {
    title: "Personalize a Workout Routine",
    imgUrl: "assets/images/discover/Personalize a workout routine.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Definitely! I can help you create a custom workout routine based on your age, fitness and energy levels.

    Let’s start with a question: what exercise do you love to do?\n
    
    If there is anything you don’t like in your routine, just let me know.
    `,
  },
  {
    title: "Create a PCOS friendly meal plan",
    imgUrl: "assets/images/discover/Create PCOS Friendly Meal Plan.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Of course! Let’s make a meal plan personalized to you and your PCOS symptoms.

    By default, I will create a 7 day meal plan to support PCOS. If you’d like more ideas, let me know at the end.\n
    
    If there’s anything you don’t like to eat in the meal plan, we can always change it.\n
    
    Can we start by understanding your dietary preferences?
    
    `,
  },
  {
    title: "Find a PCOS Friendly Snack",
    imgUrl: "assets/images/discover/Find a PCOS friendly snack.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Absolutely!

    What do you feel like eating right now? Sweet or savory?
    
    `,
  },
  {
    title: "Create a Recipe For My PCOS Type",
    imgUrl: "assets/images/discover/Create a recipe for my PCOS type.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Of course! Let’s create a tasty recipe that is simple and helps you achieve your goals.

    Do you have any dietary preferences or any strong dislikes?\n
    
    Remember you can always ask me to change anything or start over again if you don’t like the recipe.    
    `,
  },
  {
    title: "Plan a PCOS Friendly Shopping List",
    imgUrl: "assets/images/discover/Plan A PCOS Friendly Shopping List.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Perfect! 

    Do you have any meals you want to cook this week?    
    `,
  },
  {
    title: "Recommend a PCOS Friendly Restaurant In My Area",
    imgUrl:
      "assets/images/discover/Recommend a PCOS friendly restaurant in my area.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Perfect! 

    Can I ask what area you live in?\n
    
    The more specific you can be, the better my recommendation will be.    
    `,
  },
  {
    title: "Fix My Symptoms",
    imgUrl: "assets/images/discover/Fix my symptoms.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Of course.

    Let’s start by understanding what your most challenging symptoms are?    
    `,
  },
  {
    title: "Discover More PCOS Resources",
    imgUrl: "assets/images/discover/Discover more PCOS resources.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Definitely!

    What were you looking to understand more about?    
    `,
  },
  {
    title: "Feel Calm",
    imgUrl: "assets/images/discover/Feel calm.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Okay!

    Reducing cortisol and stress levels is so critical for managing PCOS symptoms.\n
    
    What’s on your mind that’s worrying you?    
    `,
  },
  {
    title: "Track My Symptoms",
    imgUrl: "assets/images/discover/Track my symptoms.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Definitely! Let’s track your symptoms.

    Start off by telling me some of the issues you’re having.\n
    
    You can always come back to me and share your symptoms. I will save and record them so I can provide you with insights later.
    
    `,
  },
  {
    title: "Talk With Someone About PCOS",
    imgUrl: "assets/images/discover/Talk with someone about PCOS.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Sure! I can answer any questions you might have about PCOS. If it’s emotional support you need, I’m here for that too.
    `,
  },
  {
    title: "Just Talk To Someone",
    imgUrl: "assets/images/discover/Just Talk To Someone.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Just need to vent or have someone listen? Go for it.
    `,
  },
  {
    title: "Learn More About This App",
    imgUrl: "assets/images/discover/Learn More About This App.png",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Of course! What would you like to know about me?
    `,
  },
];

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // renders the child routes if the user is authenticated
};
const ProtectLogOutRoute = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />; // renders the child routes if the user is authenticated
};

function App() {
  const [idxOfDiscover, setIdxOfDiscover] = useState(0);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const isAuthenticated = currentUser !== undefined;
  return (
    <>
      <DiscoverContext.Provider
        value={{ DISCOVERS, idxOfDiscover, setIdxOfDiscover }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route
              element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/profile" element={<Profile />}>
                <Route path="account" element={<AccountBoard />} />
                <Route path="payment" element={<PaymentBoard />} />
              </Route>
            </Route>
            <Route
              element={<ProtectLogOutRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </Router>
      </DiscoverContext.Provider>
    </>
  );
}

export default App;
