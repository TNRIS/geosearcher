import React from 'react';
import mapboxgl from 'mapbox-gl';

import GeoSearcher from './GeoSearcher';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -99.341389,
            lat: 31.33,
            zoom: 6,
            selectedFeature: this.props.selectedFeature
        };
        this.addMapLayer = this.addMapLayer.bind(this);
        this.handleGeoSearcherChange = this.handleGeoSearcherChange.bind(this);
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        this._map = map;
    }
    
    getLayerProps = (featureType) => {
        if (featureType === 'Point' || featureType === 'MultiPoint') {
            return {
                'type': 'circle',
                'paint': {
                    'circle-radius': 8,
                    'circle-color': '#f08',
                    'circle-opacity': 0.1
                }
            };
        } else if (
            featureType === 'Polygon' || featureType === 'MultiPolygon') {
                return {
                    'type': 'fill',
                    'paint': {
                        'fill-color': '#f08',
                        'fill-opacity': 0.1
                    }
                };
        } else if (
            featureType === 'LineString' || featureType === 'MultiLinestring') {
                return {
                    'type': 'line',
                    'paint': {
                        'line-color': '#f08',
                        'line-width': 6,
                        'line-opacity': 0.1
                    }
                };
        }
    }

    addMapLayer = (selectedFeature) => {
        this._map.addLayer({
            'id': 'selected-feature',
            'type': this.getLayerProps(
                selectedFeature.geometry.type).type,
            'source': 'selected-feature',
            'paint': this.getLayerProps(
                selectedFeature.geometry.type).paint
        });
    }
    
    handleGeoSearcherChange = (selectedFeature) => {
        if (selectedFeature !== null) {

            const selectedFeatureSource = this._map.getSource(
                'selected-feature');
            
            if (typeof selectedFeatureSource === 'undefined') {
                this._map.addSource('selected-feature', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            selectedFeature
                        ]
                    }
                });
            } else {
                selectedFeatureSource.setData({
                    'type': 'FeatureCollection',
                    'features': [
                        selectedFeature
                    ]
                });
            }

            const selectedFeatureLayer = this._map.getLayer('selected-feature');

            if (typeof selectedFeatureLayer === 'undefined') {
                this.addMapLayer(selectedFeature);
            } else {
                this._map.removeLayer('selected-feature');
                this.addMapLayer(selectedFeature);
            }


            this._map.fitBounds(
                selectedFeature.bbox,
                {padding: {top: 50, bottom:50, left: 50, right: 50}}
            );
        }
    }

    render() {
        return (
            <div>
                <GeoSearcher
                    handleGeoSearcherChange={ this.handleGeoSearcherChange }
                />
                <div
                    ref={el => this.mapContainer = el}
                    className='mapContainer'
                />
            </div>
        )
    }
}