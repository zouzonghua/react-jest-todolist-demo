import React from 'react';
import TodoList from './containers/TodoList'

function App() {
  const env = process.env.REACT_APP_API_URL
  console.log('env:', env)
  return (
    <div>
      <TodoList />
    </div>
  );
}

export default App;
