import Link from "next/link";

function EventItem(props) {
	const { title, image, date, location, id } = props;
	const humanReadableFormat = new Date(date).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	const formattedAddress = location.replace(", ", "\n");
	const exploreLink = `/events/${id}`;
	return (
		<li>
			<img src={"/" + image} alt={title} />
			<div>
				<div>
					<h2>{title}</h2>
					<div>
						<time>{humanReadableFormat}</time>
					</div>
					<div>
						<address>{formattedAddress}</address>
					</div>
				</div>
				<div>
					<Link href={exploreLink}>Explore Events</Link>
				</div>
			</div>
		</li>
	);
}

export default EventItem;