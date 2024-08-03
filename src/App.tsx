import { BrowserRouter } from "react-router-dom";
import "./styles/f.css";
import AppContent from "./routes/AppContent";


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


export default App;
