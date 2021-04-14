import EventList from "../../components/events/EventList";
import { getAllEvents } from "../../dummy-data";

function AllEventsPage(props) {
	const events = getAllEvents();

	return <EventList items={events} />;
}

export default AllEventsPage;
// Show all events page "/events" routes => Show all projects
