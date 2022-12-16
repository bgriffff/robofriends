import React, {useState, useEffect} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

function App() {
    //setRobots is the function that will change robots
    // put in the useState() the initial value you want
    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')
    const [count, setCount] = useState(0)


    //everytime this app is run it calls the useEffect. if you dont add the 
    // [] at the end of useEffect or it will be an infinite loop 
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(user => {setRobots(user)});    
            console.log(count)   
        }, [count]) // only run if count changes

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

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
                <button onClick={() =>setCount(count+1)}>Click Me!</button>
                <p className='f1'>{count}</p>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
}

export default App