import { useRouter } from "next/router";
import { Fragment } from "react";

import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";

import { getEventById } from "../../dummy-data";
import ErrorAlert from "../../components/ui/ErrorAlert";

function EventDetailPage(props) {
	const router = useRouter();
	const { eventId } = router.query;
	const event = getEventById(eventId);

	if (!event)
		return (
			<Fragment>
				<ErrorAlert>
					<p>No event found!</p>
				</ErrorAlert>
			</Fragment>
		);

	return (
		<Fragment>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</Fragment>
	);
}
export default EventDetailPage;
