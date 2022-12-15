import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
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
        const {robots, searchfield} = this.state
        //accessing the data and filtering the array
        const filteredRobots = robots.filter(robot => {
            //returns lowercase robots name if it includes the searchfield in lowercase
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        if (robots.length === 0) {
            return <h1>Loading...</h1>
        } else {
            return(
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App