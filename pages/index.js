import Head from "next/head";

import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/apiUtils";

function HomePage(props) {
	return (
		<div>
			<Head>
				<title>Nepalese Events</title>
				<meta
					name="description"
					content="Find a lot of great events that allows you to connect"
				/>
			</Head>
			<EventList items={props.featuredEvents} />
		</div>
	);
}

export async function getStaticProps(context) {
	const featuredEvents = await getFeaturedEvents();
	return {
		props: {
			featuredEvents,
		},
		revalidate: 1800,
	};
}

export default HomePage;
