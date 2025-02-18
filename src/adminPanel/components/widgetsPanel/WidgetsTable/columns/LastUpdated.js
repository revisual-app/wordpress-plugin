/**
 * Created by piotr.pozniak@thebeaverhead.com on 09/01/2025
 */

const dateFormatter = new Intl.DateTimeFormat(window.navigator.language, {
	year: "numeric",
	month: "numeric",
	day: "numeric",
	minute: "2-digit",
	hour: "2-digit",
	second: "2-digit",
});

const LastUpdated = ({ row }) => {
	return dateFormatter.format(new Date(row.modified * 1000));
};

export default LastUpdated;
