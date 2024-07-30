document.addEventListener('DOMContentLoaded', function () {
    fetchAvailableAppointments();

    const reservationForm = document.getElementById('reservation-form');
    reservationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

        const formData = new FormData(reservationForm);
        const data = {
            user_id: formData.get('id'),
            appointment_date: formData.get('appointment-date'),
            appointment_time: formData.get('appointment-time'),
            specialist: formData.get('specialist')
        };

        fetch('/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            reservationForm.reset(); // Limpiar el formulario
        })
        .catch(error => console.error('Error reservando cita:', error));
    });
});

function fetchAvailableAppointments() {
    fetch('/api/available-appointments')
        .then(response => response.json())
        .then(data => {
            const appointmentsList = document.getElementById('appointments-list');
            appointmentsList.innerHTML = ''; // Limpiar cualquier contenido previo

            data.forEach(appointment => {
                const listItem = document.createElement('li');
                listItem.textContent = `${appointment.appointment_date} ${appointment.appointment_time} - ${appointment.specialist}`;
                appointmentsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching appointments:', error));
}
