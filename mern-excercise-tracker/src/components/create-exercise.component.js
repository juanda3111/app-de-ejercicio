import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercises extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users:[]
        }
    }
    componentDidMount(){
       axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    onChangeUsername(e){
        this.setState({
            username:e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }
    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }
    onChangeDate(date){
        this.setState({
            date: date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const exercise= {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise)
        .then(res => console.log(res.data));

        //esta linea es la q no deja que aparezca el JSON de la consola de firefox
        window.location = '/';
    }

    render(){
        return (
            <div>
                <h2>Crear un nuevo registro de Entrada</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Usuario: </label>
                        <select ref="userInput"
                                required
                                className= "form-control"
                                value= {this.state.username}
                                onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user){
                                        return <option
                                        key={user}
                                        value={user}> {user}      
                                        </option>;
                                    })
                                }    

                        </select>
                    </div>

                    <div className="form-group">
                            <label> Descripción: </label>
                            <input type="text"
                                required
                                className="form-control"
                                defaultValue={this.state.description}
                                onChange={this.onChangeDescription}
                            />
                    </div>

                    <div className="form-group">
                        <label> duración: (en minutos) </label>
                        <input 
                          type="text"
                          className="form-control"
                          defaultValue={this.state.duration}
                          onChange={this.onChangeDuration}
                        />  
                    </div>
                    
                    <div className="form-group">
                        <label> Fecha: </label>
                        <div>
                            <DatePicker 
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            />
                        </div> 
                    </div>

                    <div className="form-group">
                        <input type="submit" defaultValue="Crear un ejercicio" className="btn btn-primary" />
                    </div>

                </form>
            </div>
        );
    }
}