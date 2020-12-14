import React, { useState, useEffect } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import Request from '../Connections/ApiConnection';

const Thread = ({ token }) => {
	const [threads, setThreads] = useState([]);

	useEffect(() => {
		const getThreads = async () =>
			await Request.get('/Thread').then((response) => {
				setThreads(response.data.data);
			});
		getThreads();

		return () => {};
	}, []);

	const showThreads = threads.map((item) => {
		return (
			<Table.Row>
				<Table.Cell>
					<h5>{item.category}</h5>
				</Table.Cell>
				<Table.Cell textAlign='center'>#</Table.Cell>
				<Table.Cell textAlign='right'>
					<p>
						{item.title} by {item.user}
					</p>

					<p>Created {item.dateAndTimeCreated}</p>
				</Table.Cell>
			</Table.Row>
		);
	});

	return (
		<Table selectable stackable style={{ width: '70vw' }}>
			<Table.Header style={{ background: 'teal' }}>
				<Table.Row>
					<Table.HeaderCell>Category</Table.HeaderCell>
					<Table.HeaderCell textAlign='center'>Responses</Table.HeaderCell>
					<Table.HeaderCell textAlign='right'>Thread Title</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>{showThreads}</Table.Body>
		</Table>
	);
};
export default Thread;
