import React from 'react';
import ColorPicker from './components/ColorPicker';

function App() {
  return (
    <div>
      <ColorPicker width={1200} height={400} onSelect={(x, y) => { console.log(x, y); }}></ColorPicker>
    </div>
  );
}

export default App;
