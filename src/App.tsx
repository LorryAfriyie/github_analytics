// Components and Views
import { Followers } from "./followers";
import { Following } from "./following";

// Styles
import "./styles/style.scss";

// Components

function App() {
  return (
    <div className="app">
      <Followers />
      <Following />
    </div>
  );
}

export default App;
