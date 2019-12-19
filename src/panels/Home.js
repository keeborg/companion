import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Search from '@vkontakte/vkui/dist/components/Search/Search';
import List from '@vkontakte/vkui/dist/components/List/List';
import Separator from "@vkontakte/vkui/dist/components/Separator/Separator";
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';


const Home = function ({ id, go, fetchedUser, events }) {
	console.log('SOOQA');
	console.log(events);
	return(
		<Panel id={id}>
			<PanelHeader>Companion</PanelHeader>
			{/* <Search value={''} onChange={''} /> */}
			{/* {//events.length > 0 &&
				<List>
					{events.map((item, i) => <><Div key={item.id}>{item.title}</Div><Separator /></>)}
				</List>
			} */}
			{fetchedUser &&
			<Group id="user-block">
				<Cell
					before={fetchedUser.photo_100 ? <Avatar src={fetchedUser.photo_200}/> : null}
					description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
				>
					{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
				</Cell>
			</Group>}

			<Group title="Navigation Example">
				<Div>
					<Button size="xl" level="2" onClick={go} data-to="persik">
						Show me the Persik, please
					</Button>
				</Div>
			</Group>
		</Panel>
	)
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_100: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
