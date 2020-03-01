import React, { useState, useEffect } from 'react'
import connect from '@vkontakte/vk-connect'
import View from '@vkontakte/vkui/dist/components/View/View'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Epic from '@vkontakte/vkui/dist/components/Epic/Epic'
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar'
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem'
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner'
import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline'
import Icon24List from '@vkontakte/icons/dist/24/list';
import Icon28Profile from '@vkontakte/icons/dist/28/profile'
import '@vkontakte/vkui/dist/vkui.css'

import AllEvents from './panels/Events/AllEvents'
import Persik from './panels/Persik'

const App = () => {
	const [activeStory, setActiveStory] = useState('all-events')
	const [activePanel, setActivePanel] = useState('all-events')
	// const [fetchedUser, setUser] = useState(null)
	// const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	
	useEffect(() => {
		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme')
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light'
				document.body.attributes.setNamedItem(schemeAttribute)
			}
		});
		// async function fetchData() {
		// 	const user = await connect.sendPromise('VKWebAppGetUserInfo');
		// 	setUser(user);
		// 	console.log(user);
		// 	setPopout(null);
		// }
		// fetchData();

	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to)
	}

	const onStoryChange = e => {
		setActiveStory(e.currentTarget.dataset.story)
		setActivePanel(e.currentTarget.dataset.story)
	}

	return (
		<Epic activeStory={activeStory} tabbar={
			<Tabbar>
				<TabbarItem
					onClick={onStoryChange}
					selected={activeStory === 'all-events'}
					data-story="all-events"
					text="Все события">
					<Icon28ArticleOutline />
				</TabbarItem>
				<TabbarItem
					onClick={onStoryChange}
					selected={activeStory === 'my-events'}
					data-story="my-events"
					text="Мои события">
					<Icon24List width={28} height={28} />
				</TabbarItem>
				<TabbarItem
					onClick={onStoryChange}
					selected={activeStory === 'profile'}
					data-story="profile"
					label="12"
					text="Профиль">
					<Icon28Profile />
				</TabbarItem>
			</Tabbar>
		}>
			<View id="all-events" activePanel={activePanel}>
				<AllEvents id='all-events' go={go} />
				<Persik id='persik' go={go} />
			{/*	TODO Panel with info about one event*/}
			</View>
			<View id="my-events" activePanel={activePanel}>
				<Panel id="my-events">
					<PanelHeader>My Events</PanelHeader>
				</Panel>
			</View>
			<View id="profile" activePanel={activePanel}>
				<Panel id="profile">
					<PanelHeader>Профиль</PanelHeader>
				</Panel>
			</View>
		</Epic>
	)
}

export default App

