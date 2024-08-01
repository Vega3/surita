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

        // Crear el servicio de lugares
        const service = new google.maps.places.PlacesService(map);

        // Realizar una búsqueda de IPS cerca de la ubicación del usuario
        service.nearbySearch({
            location: userLocation,
            radius: 1000, // Radio de búsqueda en metros
            type: ['doctor'] // Tipo de lugar
        }, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                if (results.length > 0) {
                    const nearestIps = results[0]; // IPS más cercana
                    const ipsLocation = nearestIps.geometry.location;

                    const ipsMarker = new google.maps.Marker({
                        position: ipsLocation,
                        map: map,
                        title: nearestIps.name
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
                            alert('No se pudo mostrar la ruta debido a: ' + status);
                        }
                    });
                } else {
                    alert('No se encontraron IPS cercanas.');
                }
            } else {
                alert('Error en la búsqueda de lugares: ' + status);
            }
        });
    }, function () {
        alert('Error al obtener la ubicación.');
    });
}
