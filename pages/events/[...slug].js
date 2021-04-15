import { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";

function FilteredEventsPage() {
	const router = useRouter();
	const filterData = router.query.slug;
	if (!filterData) {
		return <p className="center">Loading...</p>;
	}

	const [filteredYear, filteredMonth] = filterData;
	const numYear = +filteredYear;
	const numMonth = +filteredMonth;
	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth > 12 ||
		numMonth < 1
	)
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid filters</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show all Events</Button>
				</div>
			</Fragment>
		);

	const filteredEvents = getFilteredEvents({
		year: numYear,
		month: numMonth,
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
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
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</Fragment>
	);
}

export default FilteredEventsPage;
