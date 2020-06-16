import React, { useState } from 'react'


function App(props) {
  const [count, setCount] = useState(() => {
    console.log("init count")
    return props.defaultCount || 0
  });
  return (
    <div>
      <button onClick={() =>setCount(count+1)}>+ 1</button>
      <h1>count: { count }</h1>
    </div>
  )
}

export default App