export async function getAllEvents() {
	const baseUrl =
		"https://next-nepal-event-default-rtdb.firebaseio.com/events.json";
	const response = await fetch(baseUrl);
	const data = await response.json();

	const events = [];
	for (const key in data) {
		events.push({
			id: key,
			...data[key],
		});
	}

	return events;
}

export async function getFeaturedEvents() {
	const allEvents = await getAllEvents();
	return allEvents.filter((event) => event.isFeatured);
}

export function getFilteredEvents(dateFilter) {
	const { year, month } = dateFilter;

	let filteredEvents = DUMMY_EVENTS.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
		);
	});

	return filteredEvents;
}

export function getEventById(id) {
	return DUMMY_EVENTS.find((event) => event.id === id);
}
