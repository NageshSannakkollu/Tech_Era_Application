import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './component/Home'

import './App.css'
import CourseItemDetails from './component/CourseItemDetails'
import NotFound from './component/NotFound'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
