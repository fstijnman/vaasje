// Importing the venues data
import venues from '../data/venues.json';

interface Venue {
    id: number;
    lat: number;
    lon: number;
    name: string;
    price: number;
}

async function initMap(): Promise<void> {
    const mapOptions: google.maps.MapOptions = {
        center: { lat: 52.3676, lng: 4.9041 },
        disableDefaultUI: true,
        zoom: 12,
        mapId: "71532d6fa0d0e6af",
    };
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    // Adding markers for each venue
    venues.forEach((venue: Venue) => {
        const marker = new AdvancedMarkerElement({
            position: { lat: venue.lat, lng: venue.lon },
            map: map,
            title: venue.name,
            collisionBehavior: google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${venue.name}</h3><p>Price: $${venue.price.toFixed(2)}</p>`,
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

window.onload = initMap;