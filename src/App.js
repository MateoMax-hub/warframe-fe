import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Header from "./components/header/Header";
import Inventory from "./routes/Inventory";
import Items from "./routes/Items";
import Parts from "./routes/Parts/Parts";
import 'antd/dist/antd.css'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/parts" element={<Parts />}/>
        <Route path="/items" element={<Items />}/>
        <Route path="/inventory" element={<Inventory />}/>
        <Route path="*" element={<Navigate to="/parts" />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
