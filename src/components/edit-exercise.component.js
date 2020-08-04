import React, { Component } from 'react';
import '../Addstyle/update.css';
import axios from 'axios';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/user/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,

        })   
      })
      .catch(function (error) {
        console.log(error);
      })
    axios.get('http://localhost:5000/user/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            user: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  addItem=(e)=> {
    e.preventDefault();
    const user = {
      username: this.state.username
    }
    axios.post('http://localhost:5000/user/update/' + this.props.match.params.id, user)
      .then(res => console.log(res.data));
window.location='/' ;
  }
  onChangeUsername=(e)=> {
    this.setState({
      username: e.target.value
    })
  }

  render() {
    return (
    <React.Fragment >
      <h3 className="header">Update UserName</h3>
       <form onSubmit={this.addItem.bind(this)} >
  <div className="infield">

          <input type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              placeholder="Update your username"
              />
        </div>
        <div >
          <input className="upbtn" type="submit" value="Update" />
        </div>
</form>
    </React.Fragment>
    )
  }
}