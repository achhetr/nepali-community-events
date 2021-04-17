import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../healpers/apiUtils";

function HomePage(props) {
	return <EventList items={props.featuredEvents} />;
}

export async function getStaticProps(context) {
	const featuredEvents = await getFeaturedEvents();
	return {
		props: {
			featuredEvents,
		},
	};
}

export default HomePage;
