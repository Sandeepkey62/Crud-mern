import React,{Component} from 'react';
import axios from 'axios';
import EditExercise from "./edit-exercise.component";
import { BrowserRouter as Router , Link,Route} from 'react-router-dom'

class App extends Component{
  constructor(props){
     super(props);
     this.state={
      username:'',
       email:[] // we can write anything 
     }
  }
componentDidMount(){
axios
.get(`http://localhost:5000/user/`)  
.then(res=>{
  
    this.setState({email:res.data});
});
}
  AddItem=(e)=> {
    console.log(e);
    const user = {
      username: this.state.username
    }
    console.log(user);
    axios.post('http://localhost:5000/user/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }
handleChnage=(e)=>{
 this.setState({username:e.target.value})
}
  removeItem=(id)=> {
    axios.delete('http://localhost:5000/user/'+id)
      .then(response => { console.log(response.data)});
    this.setState({
      email: this.state.email.filter(el => el._id !== id)
    })
  }
   render(){
     return (
 <div>

 <Router>

 <Route path="/edit/:id" component={EditExercise} />
 </Router>
  <div>
  </div>
<input type="text"
name="username"
onChange={this.handleChnage}
value={this.state.username}
/>
<button  onClick={this.AddItem}>ADD Item</button>
      <ul>
        {
          this.state.email.map(person=>(
              <li key={person.id}> 
               {person.username} 
               <button onClick={this.removeItem.bind(this,person._id)}>Delete</button>
               <Router>
         <Link to={"/edit/"+person._id}>edit</Link>
         </Router>
              </li> 

            ))
        }
        </ul>


        </div>
      );
   }
}

export default App;