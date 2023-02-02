import { Route, Switch } from 'react-router-dom';
import About from './Components/About/About';
import Detail from './Components/Detail/Detail';
import Form from './Components/Form/Form';
import Home from './Components/Home/Home';
import Landing from './Components/Landing/Landing';
import NavBar from './Components/NavBar/NavBar';
import axios from "axios";


function App() {
  return (
    <div >
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/">
          <NavBar />
          <Route exact path="/recipes" component={Home} />
          <Route exact path="/home" component={NavBar} />
          <Route exact path="/recipes/:id" component={Detail} />
          <Route exact path="/create" component={Form} />
          <Route exact path="/about" component={About} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
