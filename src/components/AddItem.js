import React,{Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router , Link,Route} from 'react-router-dom'
import '../Addstyle/add.css';
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
.get('http://localhost:5000/user/')  
.then(res=>{
  
    this.setState({email:res.data});
});
}
  AddItem=(e)=> {
    const user = {
      username: this.state.username
    }
        axios.post('http://localhost:5000/user/add', user)
      .then(res => console.log(res.data));
    this.setState({
      username: ''
    })
    window.location = '/';
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
 <div className="header">

<input type="text"
name="username"
className="intName"
onChange={this.handleChnage}
placeholder="enter your username"
value={this.state.username}
/>
<div className="adbtn">
<button className="addbtn" onClick={this.AddItem}>ADD ITEM</button>
</div>
<div className="tbl">
      <table id="customers" >
      <thead>
      <tr>
      <th>Name</th>
      <th>Action</th>
      </tr>

      </thead>
   <tbody>
        {
        
          this.state.email.map(person=>(
       
              <tr key={person.id}> 
              <td> {person.username} </td>
            <td className="rmbtn" >
             <button  className="rembtn"  onClick={this.removeItem.bind(this,person._id)}>
                Delete</button>
             
       <Link className="edbtn" to={"/edit/"+person._id}>edit</Link>

       </td>
              </tr> 

            ))
          
        }
         </tbody>
        </table>
        </div>        
        </div>
      );
   }
}

export default App;