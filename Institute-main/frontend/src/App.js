import React, { useState, useEffect } from 'react';
//for listening or emitting event we need socket.io-client library
import io from 'socket.io-client';

function App() {
  //create state for data count and course id
  const [count, setCount] = useState(0);
  const [id, setId] = useState('');

  //create socket instance
  const socket = io('http://localhost:5000');

  //use effect hook to listen for data event from server
  useEffect(() => {
    //listen for data event
    socket.on('data', (data) => {
      //update state with data from server
      setCount(data.buyers);
      setId(data._id)
    });
    //cleanup function to disconnect socket when component unmounts
    return ()=>{
      socket.disconnect();
    }
  }, []);


  //handle buy button click
  const handleBuy = () => {
    //emit buy event to server with course id
    socket.emit('buy', id);

    /**------OR------ */

    //send put request to server with course id 
    // fetch(`http://localhost:5000/buy/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <h1>Course Buyers</h1>
      <div className="card">
        <h2>Java Course</h2>
        <p>Learn the basics of Java programming language.</p>
        <p>The number of buyers for this course are: {count}</p>
        <button onClick={handleBuy}>Buy Now</button>
      </div>
    </div>
  );
}

export default App;