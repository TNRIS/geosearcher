import React from 'react';
import ReactDOM from 'react-dom';
import './css/site.css';

import Map from './Map';

class App extends React.Component {

    render() {
        return (
            <div>
                <Map />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));