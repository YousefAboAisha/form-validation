import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ContactUs from "./Containers/Contactus/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ContactUs />
      </div>
    </BrowserRouter>
  );
}

export default App;
