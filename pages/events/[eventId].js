import { Fragment } from "react";
import Head from "next/head";

import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";

import { getEventById, getFeaturedEvents } from "../../helpers/apiUtils";

function EventDetailPage(props) {
	const { event } = props;

	if (!event)
		return (
			<Fragment>
				<div className="center">
					<p>Loading....</p>
				</div>
			</Fragment>
		);

	return (
		<Fragment>
			<Head>
				<title>{event.title}</title>
				<meta name="description" content={event.description} />
			</Head>
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

export async function getStaticProps(context) {
	const eventId = context.params.eventId;
	const event = await getEventById(eventId);

	return {
		props: {
			event,
		},
		revalidate: 30,
	};
}

export async function getStaticPaths() {
	const events = await getFeaturedEvents();
	const paths = events.map((event) => ({ params: { eventId: event.id } }));
	return {
		paths,
		fallback: true,
	};
}

export default EventDetailPage;
