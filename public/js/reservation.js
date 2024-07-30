document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservationForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('http://localhost:3000/api/reservations', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Reserva realizada con éxito!');
            } else {
                alert('Error al realizar la reserva.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al realizar la reserva.');
        });
    });
});
