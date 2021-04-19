import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import useSWR from "swr";

function FilteredEventsPage(props) {
	const [loadedEvents, setLoadedEvents] = useState();
	const router = useRouter();

	const { data, error } = useSWR(
		"https://next-nepal-event-default-rtdb.firebaseio.com/events.json"
	);

	useEffect(() => {
		if (data) {
			const events = [];
			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}

			setLoadedEvents(events);
		}
	}, [data]);

	const filterData = router.query.slug;
	const [filteredYear, filteredMonth] = filterData;
	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	const pageHeadData = (
		<Head>
			<title>Filtered Events</title>
			<meta
				name="description"
				content={`All events for year and month ${numYear}/ ${numMonth}`}
			/>
		</Head>
	);

	if (!loadedEvents) {
		return (
			<Fragment>
				{pageHeadData}
				<p className="center">Loading...</p>
			</Fragment>
		);
	}
	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth > 12 ||
		numMonth < 1 ||
		error
	) {
		return (
			<Fragment>
				{pageHeadData}
				<ErrorAlert>
					<p>Invalid filters</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show all Events</Button>
				</div>
			</Fragment>
		);
	}

	const filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === numYear &&
			eventDate.getMonth() === numMonth - 1
		);
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				{pageHeadData}
				<ErrorAlert>
					<p>No events found for the chosen filters</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show all Events</Button>
				</div>
			</Fragment>
		);
	}

	const date = new Date(numYear, numMonth - 1);
	return (
		<Fragment>
			{pageHeadData}
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</Fragment>
	);
}

export default FilteredEventsPage;
