import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './css/site.css';

import Map from './Map';

mapboxgl.accessToken = 'pk.eyJ1IjoidG5yaXMtZmxvb2QiLCJhIjoiY2pua25lYTJrMWM1ODNwb3N3Y2c0aGZ5YSJ9.qfk_KrxbrQrLhPS5ZSakLQ';

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