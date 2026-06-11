import './App.css'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/users/:userId/home" element={<Home />} />
        <Route path="/users/:userId/todos" element={<Todos />} />
        <Route path="/users/:userId/info" element={<Info />} />
        <Route path="/users/:userId/posts" element={<Posts />} />
        <Route path="/users/:userId/albums" element={<Albums />} />
        <Route path="/users/:userId/albums/:albumId/photos" element={<Photos />} />
        <Route path="/photos/:albumId" element={<Photos />} />
        <Route path="/users/:userId/posts/:postId/comments" element={<Comments />} /> */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


// import './App.css'
// import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
// import Login from './pages/Login'
// import ProtectedRoute from './common/ProtectedRoute'

// // קבועים עבור התפקידים במערכת לשמירה על סדר
// const ROLES = {
//   ADMIN: 'admin',
//   LECTURER: 'lecturer',
//   STUDENT: 'student'
// };

// function App() {
//   // מוק זמני לצורך פיתוח - שנו את ה-role שלו כדי לבדוק את הראוטינג במקביל!
//   // (מחר חברה שלך תחליף את זה ב-State האמיתי של המשתמש המחובר)
//   const mockUser = { name: "משתמש בדיקה", role: 'student' }; // אפשרויות: 'student', 'lecturer', 'admin'

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* נתיב ציבורי - נגיש תמיד */}
//         <Route path="/login" element={<Login />} />

//         {/* ----------------- נתיבי סטודנט מוגנים ----------------- */}
//         <Route element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]} user={mockUser} />}>
//           <Route path="/student/dashboard" element={<div>עמוד הבית של הסטודנט - מטלות להגשה</div>} />
//           {/* כאן תוכלי להוסיף בהמשך: <Route path="/student/grades" element={<StudentGrades />} /> */}
//         </Route>

//         {/* ----------------- נתיבי מרצה מוגנים ----------------- */}
//         <Route element={<ProtectedRoute allowedRoles={[ROLES.LECTURER]} user={mockUser} />}>
//           <Route path="/lecturer/dashboard" element={<div>עמוד מרצה - בדיקת מטלות וציונים</div>} />
//         </Route>

//         {/* ----------------- נתיבי מנהל מוגנים ----------------- */}
//         <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} user={mockUser} />}>
//           <Route path="/admin/dashboard" element={<div>עמוד מנהל - ניהול משתמשים וקבוצות</div>} />
//         </Route>

//         {/* הפניה אוטומטית: כל מי שמגיע לדף הבית מועבר ל-Login */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
        
//         {/* נתיב לכל כתובת לא מוכרת (404) */}
//         <Route path="*" element={<div>הדף לא נמצא (404)</div>} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App