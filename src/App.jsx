import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Question from "./pages/Question";
import CreateQuiz from "./pages/CreateQuiz";
import Activity from "./pages/Activity";
import Quiz from "./pages/Quiz";
import QuizDetails from "./pages/QuizDetails";
import PlayQuiz from "./pages/PlayQuiz";
import ReportCard from "./pages/ReportCard";
import RequiredAuth from "./components/Auth/RequiredAuth";
import { STUDENT, TEACHER } from "./helpers/constants";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Auth />}></Route>
        <Route element={<RequiredAuth allowedRoles={[TEACHER,STUDENT]}/>}>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/quizzes" element={<Quiz />}></Route>
        <Route path="/report" element={<ReportCard />}></Route>

        </Route>
        <Route path="/*" element={<NotFound />}></Route>
        <Route path="/access-denied" element={<AccessDenied />}></Route>
        <Route element={<RequiredAuth allowedRoles={[TEACHER]} />}>
          <Route path="/create-question" element={<Question />}></Route>
          <Route path="/create-quiz" element={<CreateQuiz />}></Route>
          <Route path={`/activity/${TEACHER}`} element={<Activity />}></Route>
        </Route>
        
        <Route
          path="/quizzes/quiz-details/:quizId"
          element={<QuizDetails />}
        ></Route>
        <Route path="/quizzes/play-quiz/:quizId" element={<PlayQuiz />}></Route>
      </Routes>
    </>
  );
}

export default App;
