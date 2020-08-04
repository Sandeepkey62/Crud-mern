import React,{Component} from 'react';
import './App.css';
import AddItem from './components/AddItem';
import EditExercise from './components/edit-exercise.component';
import { BrowserRouter as Router ,Route} from 'react-router-dom'
class App extends Component{
   render(){
     return (
       <div className="App">
       

 <Router>
 <AddItem/>
 <Route path="/edit/:id" exact component={EditExercise} />
 </Router>
       </div>
 
      );
   }
}

export default App;