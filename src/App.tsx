import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main/Main';
import ErrorBoundry from './utility/ErrorBoundry';
function App() {
  return (
    <ErrorBoundry>
    <div className="App">
      <Main></Main>
    </div>
    </ErrorBoundry>
  );
}

export default App;
