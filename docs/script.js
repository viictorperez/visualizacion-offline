// Initialize the map
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Handle file upload
document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                results.data.forEach(row => {
                    const id = row.id;
                    const timestamp = row.timestamp;
                    const direction = parseFloat(row.direccion);
                    const azimut = parseFloat(row.azimut);

                    // Calculate position (simple demo)
                    const distance = 0.05; // Placeholder distance
                    const radian = (azimut * Math.PI) / 180;
                    const lat = distance * Math.cos(radian);
                    const lng = distance * Math.sin(radian);

                    // Add marker to map
                    const marker = L.marker([lat, lng]).addTo(map);
                    marker.bindPopup(`<strong>ID:</strong> ${id}<br><strong>Timestamp:</strong> ${timestamp}`);
                });
                map.setView([0, 0], 2);
            }
        });
    }
});
