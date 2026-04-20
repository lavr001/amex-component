import React from 'react';
import Accordion from './components/Accordion/Accordion';
import './App.css';

const panels = [
  {
    title: 'Panel One',
    content: 'Content for panel one',
  },
  {
    title: 'Panel Two',
    content: 'Content for panel two',
  },
  {
    title: 'Panel Three',
    content: 'Content for panel three',
  },
];

const App = () => {
  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <section style={{ marginTop: '2rem' }}>
        <h2>Accordion</h2>
        <Accordion panels={panels} />
      </section>
    </div>
  );
};

export default App;
