import React, { useEffect } from 'react';
const WebsiteName = "Fresher Academy Management"

export default function TabBar ({ title }) {
	useEffect(() => {
		document.title = `${title} | ${WebsiteName}`;

		return () => {
			document.title = `${WebsiteName}`;
		};
	}, [title]);

	return (
		<></>
	);
};