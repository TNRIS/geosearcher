import React from 'react';
import Downshift from 'downshift';

export default class GeoSearcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            features: [],
            inputValue: ''
        }
    }
    
    // onChange method for the input field
    inputOnChange = event => { 
        this.setState({ inputValue: event.target.value });
        // fetch features from the api after input change      
        this.fetchFeatures(event.target.value)
    }
    
    // method to fetch the features from the geocoder api
    fetchFeatures = feature => {    
        const geocodeUrl = `${process.env.REACT_APP_NOMINATIM_URL}/search/\
            ${feature}?format=geojson&polygon_geojson=1`;
        // ajax request to retrieve the features
        fetch(geocodeUrl)
            .then(response => response.json())
            .then(json => this.setState({ features: json.features })) 
    }

    render() {
        return (
            <div className='geoSearcher'>
                <Downshift
                onChange={ this.props.handleGeoSearcherChange }
                itemToString={ item => (item ? item.value : '')}
                >
                {({
                    selectedItem,
                    getInputProps,
                    getItemProps,
                    highlightedIndex,
                    isOpen,
                    inputValue,
                    getLabelProps,
                    getRootProps,
                    getMenuProps,
                }) => (
                    <div className='downshift'>
                    <div
                        style={ {display: 'inline-block'} }
                        { ...getRootProps({}, {suppressRefError: true}) }
                    >
                        <input
                        className='downshift-input'
                        {...getInputProps({
                            placeholder: "Search for Places in Texas",
                            onChange: this.inputOnChange,
                            value: this.state.inputValue
                        })}
                        />
                    </div>
                    <ul
                        className="downshift-dropdown"
                        { ...getMenuProps() }
                        style={ {listStyle: 'none'} }
                    >
                        {isOpen ?
                        this.state.features
                            .map((item, index) => (
                            <li
                                className="dropdown-item"
                                { ...getItemProps({ key: index, index, item }) }
                                style={{
                                backgroundColor: highlightedIndex === index ?
                                    'lightgray' : 'white',
                                fontWeight: selectedItem === item ?
                                    'bold' : 'normal',
                                }}>
                                { item.properties.display_name }
                            </li>
                            ))
                        : null}
                    </ul>
                    </div>
                )}
                </Downshift>
            </div>
        )
    }
}