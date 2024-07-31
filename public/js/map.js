// map.js

// Inicializa el mapa y dibuja la ruta
function initMap() {
    // Crear un mapa centrado en la ubicación del usuario
    navigator.geolocation.getCurrentPosition(function (position) {
        const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };

        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: userLocation
        });

        const userMarker = new google.maps.Marker({
            position: userLocation,
            map: map,
            title: 'Your Location'
        });

        // Definir la ubicación de la IPS más cercana (ejemplo)
        const ipsLocation = { lat: 4.7110, lng: -74.0721 }; // Reemplaza con la ubicación real de la IPS

        const ipsMarker = new google.maps.Marker({
            position: ipsLocation,
            map: map,
            title: 'Nearest IPS'
        });

        // Crear la ruta entre la ubicación del usuario y la IPS más cercana
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        const request = {
            origin: userLocation,
            destination: ipsLocation,
            travelMode: 'DRIVING'
        };

        directionsService.route(request, function (result, status) {
            if (status === 'OK') {
                directionsRenderer.setDirections(result);
            } else {
                alert('Could not display directions due to: ' + status);
            }
        });
    }, function () {
        alert('Error in retrieving your location.');
    });
}
