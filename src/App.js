import { HashRouter } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes/AppRoutes";

function App() {
  return (
    // HashRouter for hash routing in URL
    <HashRouter hashType="slash">
      <div className="App">
        <Header />
        {/* rendering appRoutes */}
        <main className="container mt-5">
          <AppRoutes />
        </main>
        <Footer developerName={"Sagar"} />
      </div>
    </HashRouter>
  );
}

export default App;
