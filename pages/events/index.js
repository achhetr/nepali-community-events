import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../helpers/apiUtils";

function AllEventsPage(props) {
	const { events } = props;
	const router = useRouter();

	function findEventsHandler(year, month) {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	}

	return (
		<Fragment>
			<Head>
				<title>Nepalese Events</title>
				<meta
					name="description"
					content="Find a lot of great events that allows you to connect"
				/>
			</Head>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</Fragment>
	);
}

export async function getStaticProps() {
	const events = await getAllEvents();

	return {
		props: {
			events,
		},
		revalidate: 60,
	};
}

export default AllEventsPage;
