import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../dummy-data";

function HomePage() {
	const featuredEvents = getFeaturedEvents();
	return <EventList items={featuredEvents} />;
}

export default HomePage;
