function initMap() {
    navigator.geolocation.getCurrentPosition(function (position) {
        const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };

        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: userLocation
        });

        const userMarker = new google.maps.Marker({
            position: userLocation,
            map: map,
            title: 'Tu Ubicación'
        });

        const ipsLocations = [
            { lat: 4.7110, lng: -74.0721, name: 'IPS 1' },
            { lat: 4.7100, lng: -74.0730, name: 'IPS 2' },
            { lat: 4.7120, lng: -74.0740, name: 'IPS 3' }
        ];

        ipsLocations.forEach(ips => {
            const ipsMarker = new google.maps.Marker({
                position: { lat: ips.lat, lng: ips.lng },
                map: map,
                title: ips.name
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `<div><h3>${ips.name}</h3><p>Ubicación: ${ips.lat}, ${ips.lng}</p></div>`
            });

            ipsMarker.addListener('click', () => {
                infoWindow.open(map, ipsMarker);
            });
        });

        // Calcular la IPS más cercana
        const nearestIpsLocation = findNearestIps(userLocation, ipsLocations);

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        const request = {
            origin: userLocation,
            destination: nearestIpsLocation,
            travelMode: 'DRIVING'
        };

        directionsService.route(request, function (result, status) {
            if (status === 'OK') {
                directionsRenderer.setDirections(result);
            } else {
                console.error('No se pudieron mostrar las direcciones: ' + status);
            }
        });
    }, function () {
        alert('Error al obtener la ubicación.');
    });
}

function findNearestIps(userLocation, ipsLocations) {
    return ipsLocations.reduce((nearest, ips) => {
        const distanceToIps = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(userLocation.lat, userLocation.lng),
            new google.maps.LatLng(ips.lat, ips.lng)
        );

        return (distanceToIps < nearest.distance) ? { ips, distance: distanceToIps } : nearest;
    }, { ips: null, distance: Infinity }).ips;
}
