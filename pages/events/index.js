import { Fragment } from "react";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../dummy-data";

function AllEventsPage(props) {
	const events = getAllEvents();
	return (
		<Fragment>
			<EventsSearch />
			<EventList items={events} />
		</Fragment>
	);
}

export default AllEventsPage;
