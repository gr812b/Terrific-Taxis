import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";


export const GooglePlacesInputDestination = (props) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Where are you going?'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                props.setDestinationAddress(details.formatted_address);
                const location = { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng }
                props.setDestination(location);
                props.setMapLocation(location);
            }}
            query={{
                key: "AIzaSyBomDl6jr68SAPfj---QNBjc5-NX0xI7xQ",
                language: 'en',
                components: 'country:ca',
            }}
            fetchDetails={true}
        />
    );
};

export const GooglePlacesInputOrigin = (props) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Where are you located?'
            onPress={(data, details = null) => {
                props.setLocationAddress(details.formatted_address);
                // 'details' is provided when fetchDetails = true
                const location = { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng }
                props.setLocation(location);
                props.setMapLocation(location);
            }}
            query={{
                key: "AIzaSyBomDl6jr68SAPfj---QNBjc5-NX0xI7xQ",
                language: 'en',
                components: 'country:ca',

            }}
            fetchDetails={true}
        />
    );
};
