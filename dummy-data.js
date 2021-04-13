const DUMMY_EVENTS = [
	{
		id: "e1",
		title: "Morning in Nepal - Kathmandu",
		description:
			"Every morning in Nepal is a happy morning for two reasons, it shows that you are alive and secondly it encourage that why we are alive",
		location: "Somestreet 25, 12345 Melbourne Australia",
		date: "2021-05-12",
		image: "images/rising-sun.jpg",
		isFeatured: false,
	},
	{
		id: "e2",
		title: "Our cool dudes can share wealth of knowledge - Baje",
		description:
			"Baje is often a term referred to a person who is older in age, experience and journey of our life. He or she will be there for you when you need them or they will witness everything and share there wealth with another generations.",
		location: "Somestreet 25, 12345 Canberra Australia",
		date: "2021-05-30",
		image: "images/baje.jpg",
		isFeatured: true,
	},
	{
		id: "e3",
		title:
			"Hamro Bazar - a way to mix and merge our local culture into the world",
		description:
			"You have been to many places in the world, but when you land in Nepal. You will visit yourself. Nepal answers your many questions which left wandered",
		location: "Somestreet 25, 12345 Sydney Australia",
		date: "2022-04-10",
		image: "images/market.jpg",
		isFeatured: true,
	},
];

export function getFeaturedEvents() {
	return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents() {
	return DUMMY_EVENTS;
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
