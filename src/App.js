import React, {Component} from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import './App.css';

class App extends Component {
    constructor() {
        super()
        // this state now owns robots so it can change it
        this.state = {
            robots: [],
            searchfield : ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(user => {this.setState({ robots: user})});
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value})
    }

    render(){
        //accessing the data and filtering the array
        const filteredRobots = this.state.robots.filter(robots => {
            //returns lowercase robots name if it includes the searchfield in lowercase
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        if (this.state.robots.length === 0) {
            return <h1>Loading...</h1>
        } else{
            return(
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            );
        }
    }
}

export default App