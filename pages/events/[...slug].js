import { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/apiUtils";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";

function FilteredEventsPage(props) {
	const router = useRouter();
	const { filteredEvents, hasError } = props;

	// const filterData = router.query.slug;
	// if (!filterData) {
	// 	return <p className="center">Loading...</p>;
	// }

	// const [filteredYear, filteredMonth] = filterData;
	// const numYear = +filteredYear;
	// const numMonth = +filteredMonth;
	if (hasError) {
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
	}

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

	const date = new Date(props.date.year, props.date.month - 1);
	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</Fragment>
	);
}

export async function getServerSideProps(context) {
	const { params } = context;

	const [filteredYear, filteredMonth] = params.slug;
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
		return {
			props: {
				hasError: true,
			},
		};

	const filteredEvents = await getFilteredEvents({
		year: numYear,
		month: numMonth,
	});

	return {
		props: {
			filteredEvents,
			date: {
				year: numYear,
				month: numMonth,
			},
		},
	};
}

export default FilteredEventsPage;
