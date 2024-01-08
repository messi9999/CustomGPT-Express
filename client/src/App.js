import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import AuthService from "services/auth.service";

import Create from "pages/Create";
import Profile from "pages/Profile";
import { CreateContext } from "common/Context";
import Dashboard from "pages/Dashboard";
import AccountBoard from "components/Profile/Account/AccountBoard";
import PaymentBoard from "components/Profile/Payment/PaymentBoard";
import WelcomePage from "pages/WelcomePage";

import { DisplayTextContext } from "common/Context";
import Feedback from "pages/Feedback";
import Success from "components/Profile/Payment/Success";
import Cancel from "components/Profile/Payment/Cancel";

const CREATES = [
  {
    title: "Create a PCOS Friendly Meal Plan",
    imgUrl: "assets/images/create/Create PCOS Friendly Meal Plan.png",
    assistantID: "asst_j3JLCZxlIFrU2QgaYUHJQYyc",
    baseContext: `Great! Let’s make a meal plan together. Your meal plan will be PCOS friendly and customized to your needs.

    If there’s anything you don’t like in your final plan, let me know and we can always adjust it. \n
    
    To get started just write “Create a meal plan” in the box below.    
    `,
  },
  {
    title: "Explore Nutritional Supplement Options",
    imgUrl: "assets/images/create/Explore Nutritional Supplement Options.png",
    assistantID: "asst_1kcoR7EywMR0Ci8tAm7UqzNh",
    baseContext: `Sure! Let’s create a personalized supplement plan for your PCOS type.

    If you changes to your plan at any time, let me know and we can make changes.\n
    
    To get started, enter “Create a personalized supplement plan” below.    
    `,
  },
  {
    title: "Understand my PCOS type",
    imgUrl: "assets/images/create/Understand my PCOS type.png",
    assistantID: "asst_m7FDil5Gei1IUGIiydpWGNpm",
    baseContext: `Sure! I'd love to help you understand your PCOS type. 

    I may ask you a lot of questions, so if you don’t know an answer just say “I don’t know”.\n
    
    To get started, enter “What is my PCOS type?” below.    
    `,
  },
  {
    title: "Personalize a Workout Routine",
    imgUrl: "assets/images/create/Personalize a workout routine.png",
    assistantID: "asst_mGQfecbb9v5eUNwheAE38uld",
    baseContext: `Definitely! I can help you create a custom workout routine based on your age, fitness and energy levels.

    If there is anything you don’t like in your routine, just let me know.\n
    
    To get started, enter “Create a workout routine for me” below.    
    `,
  },
  {
    title: "Find a PCOS Friendly Snack",
    imgUrl: "assets/images/create/Find a PCOS friendly snack.png",
    assistantID: "asst_VwKeai4n7dtrg1ctwXBwLMmP",
    baseContext: `Absolutely!

    To get started, type “Get me a snack!” below.   
    
    `,
  },
  {
    title: "Create a Recipe For My PCOS Type",
    imgUrl: "assets/images/create/Create a recipe for my PCOS type.png",
    assistantID: "asst_HHKfVxspt9ZLEKwJubMnBNXE",
    baseContext: `Of course! Let’s create a tasty recipe that is simple and helps you achieve your goals.

    Remember you can always ask me to change anything or start over again if you don’t like the recipe.\n
    
    To get started, type “Create a recipe for my PCOS type” below.    
    `,
  },
  {
    title: "Plan a PCOS Friendly Shopping List",
    imgUrl: "assets/images/create/Plan A PCOS Friendly Shopping List.png",
    assistantID: "asst_H6wwqLkXlKww2pkJpY1mnVXs",
    baseContext: `Perfect! 

    We can create a shopping list that is tailored to your specific likes and dislikes, as well as supporting your PCOS symptoms.\n
    
    To get started, enter “Create me a shopping list” below.        
    `,
  },
  {
    title: "Support PCOS at restaurants",
    imgUrl:
      "assets/images/create/Recommend a PCOS friendly restaurant in my area.png",
    assistantID: "asst_NjyZmDLim6LsaS0XKF23KtoK",
    baseContext: `Perfect! 

    It can be so hard to know how to eat to support your symptoms when out. \n
    
    To get started, enter “What should I eat when dining out?” below.      
    `,
  },
  {
    title: "Fix My Symptoms",
    imgUrl: "assets/images/create/Fix my symptoms.png",
    assistantID: "asst_6JnvHrWBB3Cw4zU9DZlh71GL",
    baseContext: `Of course.

    We can get started with a number of different ways to support your symptoms.\n
    
    To get started, type “Fix my PCOS symptoms” below.        
    `,
  },
  {
    title: "Discover More PCOS Resources",
    imgUrl: "assets/images/create/Discover more PCOS resources.png",
    assistantID: "asst_bCA5S2ZHuukiABKTF6ZLtkJe",
    baseContext: `Definitely!

    I can recommend a bunch of different resources for further reading.\n
    
    To get started, enter “I want PCOS resources” below.        
    `,
  },
  {
    title: "Feel Calm",
    imgUrl: "assets/images/create/Feel calm.png",
    assistantID: "asst_jNqlLlOptwouobwm2FuuPySP",
    baseContext: `Okay!

    Reducing cortisol and stress levels is so critical for managing PCOS symptoms.\n
    
    Type “Help me feel calm” into the chat box below to get started.        
    `,
  },
  {
    title: "Track My Symptoms",
    imgUrl: "assets/images/create/Track my symptoms.png",
    assistantID: "asst_7L2p51JEyR5PQcODrePz0Tfh",
    baseContext: `Definitely! Let’s track your symptoms.

    You can always come back to me and share your symptoms. I will save and record them so I can provide you with insights later.\n
    
    Type “Help me track my symptoms” into the box below to get started.   
    
    `,
  },
  {
    title: "Talk With Someone About PCOS",
    imgUrl: "assets/images/create/Talk with someone about PCOS.png",
    assistantID: "asst_zpuMIpwCDvrrp2jbMY6ijRvr",
    baseContext: `Sure! I can answer any questions you might have about PCOS. If it’s emotional support you need, I’m here for that too.

    Type “I want to talk about my PCOS” below to get started.    
    `,
  },
  {
    title: "Just Talk To Someone",
    imgUrl: "assets/images/create/Just Talk To Someone.png",
    assistantID: "asst_SrVRYOpsDyPTvkfbG8BowaMQ",
    baseContext: `Just need to vent or have someone listen? Go for it.
    `,
  },
  {
    title: "Learn More About This App",
    imgUrl: "assets/images/create/Learn More About This App.png",
    assistantID: "asst_YQF53IFVaIThDkkBkQvXB8Rz",
    baseContext: `Of course! What would you like to know about me?
    `,
  },
];

const ProtectedRoute = ({ isAuthenticated, isPayment }) => {
  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    return <Navigate to="/login" replace />;
  }
  // if (!isPayment) {
  //   return <Navigate to="/profile/payment" replace />;
  // }

  return <Outlet />; // renders the child routes if the user is authenticated
};
// const ProtectLogOutRoute = ({ isAuthenticated }) => {
//   if (isAuthenticated) {
//     // Redirect them to the /login page, but save the current location they were trying to go to
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />; // renders the child routes if the user is authenticated
// };

function App() {
  const [idxOfCreate, setIdxOfCreate] = useState(0);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [displayText, setDisplayText] = useState();

  const [isPayment, setIsPayment] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);

      try {
        if (user.subscription.planDuration > 0) {
          setIsPayment(true);
        } else {
          setIsPayment(false);
        }
      } catch {
        setIsPayment(false);
      }
    }
  }, []);
  const isAuthenticated = currentUser && typeof currentUser === 'object';
  return (
    <div>
      <CreateContext.Provider value={{ CREATES, idxOfCreate, setIdxOfCreate }}>
        <DisplayTextContext.Provider value={{ displayText, setDisplayText }}>
          <Router>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route
                element={
                  <ProtectedRoute
                    isAuthenticated={{ isAuthenticated, isPayment }}
                  />
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<Create />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/profile" element={<Profile />}>
                  <Route path="account" element={<AccountBoard />} />
                  <Route path="payment" element={<PaymentBoard />} />
                </Route>
              </Route>
              <Route path="/profile/payment/success" element={<Success />} />
              <Route path="/profile/payment/cancel" element={<Cancel />} />
              {/* <Route
                  element={
                    <ProtectLogOutRoute isAuthenticated={isAuthenticated} />
                  }
                > */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* </Route> */}
            </Routes>
          </Router>
        </DisplayTextContext.Provider>
      </CreateContext.Provider>
    </div>
  );
}

export default App;
