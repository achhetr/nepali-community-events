import { useRouter } from "next/router";

import { getEventById } from "../../dummy-data";

function AllEventsPage(props) {
	const router = useRouter();
	const { eventId } = router.query;
	const event = getEventById(eventId);

	if (!event) return <p>No event found!</p>;

	return (
		<div>
			<h1>AllEventsPage</h1>
		</div>
	);
}

export default AllEventsPage;
// Show all events page "/events" routes => Show all projects
