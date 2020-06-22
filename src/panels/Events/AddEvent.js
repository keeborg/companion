import React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { usePlatform, ANDROID, IOS } from '@vkontakte/vkui'
import { Panel, PanelHeader, Button, PanelHeaderBack, FormLayout, FormLayoutGroup, Input, Select,
    Radio, Textarea, Checkbox, HorizontalScroll, Avatar, RangeSlider } from '@vkontakte/vkui'
import Icon24User from '@vkontakte/icons/dist/24/user'
import Icon16Cancel from '@vkontakte/icons/dist/16/cancel'

import VkDatetimePicker from '../../Helpers/VkDatetimePicker/VkDatetimePicker'
import CustomModal from "../../Helpers/CustomModal/CustomModal"
import '../css/form.css'

const AddEvents = ({ id, go }) => {
    const platform = usePlatform();
    const [activeModal, setActiveModal] = useState('')

    const [eventTitle, setEventTitle] = useState('')
    const [eventDesc, setEventDesc] = useState('')
    const [eventDescLength, setEventDescLength] = useState(1024)
    const [eventPlace, setEventPlace] = useState('')
    const [eventDates, setEventDates] = useState([1, 2])
    const [dateChoiceType, setDateChoiceType] = useState('collective')

    const onChangeFuncs = {
        eventTitle: setEventTitle,
        eventPlace: setEventPlace,
        dateChoiceType: setDateChoiceType
    }

    const onChange = e => {
        const { name, value } = e.currentTarget
        onChangeFuncs[name](value)
    }

    const eventDescChange = (e) => {
        let length = 1024 - e.target.value.length
        setEventDescLength(length)
        setEventDesc(e.target.value)
    }

    return(
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={go} data-to="my-events" />}>
                Добавить событие
            </PanelHeader>

            <FormLayout style={{zIndex: 1}}>
                <Input
                    type="text"
                    top="Название события:"
                    name="eventTitle"
                    value={eventTitle}
                    maxLength={42}
                    onChange={onChange}
                    status={eventTitle ? 'valid' : 'error'}
                    bottom={eventTitle ? '' : 'Пожалуйста, введите название события'}
                />

                <Textarea
                    maxLength={1024}
                    onChange={eventDescChange}
                    top={'Краткое описание (' + eventDescLength + ' символов):'}
                />

                <Input
                    type="text"
                    top="Место:"
                    name="eventPlace"
                    value={eventPlace}
                    maxLength={82}
                    onChange={onChange}
                    status={eventPlace ? 'valid' : 'error'}
                    bottom={eventPlace ? '' : 'Пожалуйста, выберите место проведения события'}
                />

                <FormLayoutGroup top="Дата">
                    <Select defaultValue={dateChoiceType} onChange={onChange} name="dateChoiceType">
                        <option value="collective">Выбрать коллективно</option>
                        <option value="individual">Выбрать окончательную дату</option>
                    </Select>
                    {
                        ((dateChoiceType === 'collective' && eventDates.length > 0) || (dateChoiceType === 'individual' && eventDates.length === 1)) &&
                        <HorizontalScroll>
                            <div className="dates-horizontal-scroll">
                                <div className="date-card">
                                    <div className="date-card-header"><button className="naked-btn"><Icon16Cancel /></button>{/* TODO Render only for event owner*/}</div>
                                    <div className="date-card-day">ВС, 12 СЕН</div>
                                    <div className="date-card-time">13:00</div>
                                    <div className="date-card-bottom">
                                        <button className="naked-btn choose-date-btn">Выбрать</button> {/* TODO Render only for event owner*/}
                                        <span>14 чел.</span>
                                    </div>
                                </div>
                                <div className="date-card">
                                    <div className="date-card-header"><button className="naked-btn"><Icon16Cancel /></button>{/* TODO Render only for event owner*/}</div>
                                    <div className="date-card-day">ВС, 12 СЕН</div>
                                    <div className="date-card-time">13:00</div>
                                    <div className="date-card-bottom">
                                        <button className="naked-btn choose-date-btn">Выбрать</button> {/* TODO Render only for event owner*/}
                                        <span>14 чел.</span>
                                    </div>
                                </div>
                                <div className="date-card">
                                    <div className="date-card-header"><button className="naked-btn"><Icon16Cancel /></button>{/* TODO Render only for event owner*/}</div>
                                    <div className="date-card-day">ВС, 12 СЕН</div>
                                    <div className="date-card-time">13:00</div>
                                    <div className="date-card-bottom">
                                        <button className="naked-btn choose-date-btn">Выбрать</button> {/* TODO Render only for event owner*/}
                                        <span>14 чел.</span>
                                    </div>
                                </div>
                                <div className="date-card">
                                    <div className="date-card-header"><button className="naked-btn"><Icon16Cancel /></button>{/* TODO Render only for event owner*/}</div>
                                    <div className="date-card-day">ВС, 12 СЕН</div>
                                    <div className="date-card-time">13:00</div>
                                    <div className="date-card-bottom">
                                        <button className="naked-btn choose-date-btn">Выбрать</button> {/* TODO Render only for event owner*/}
                                        <span>14 чел.</span>
                                    </div>
                                </div>
                                <div className="date-card">
                                    <div className="date-card-header"><button className="naked-btn"><Icon16Cancel /></button>{/* TODO Render only for event owner*/}</div>
                                    <div className="date-card-day">ВС, 12 СЕН</div>
                                    <div className="date-card-time">13:00</div>
                                    <div className="date-card-bottom">
                                        <button className="naked-btn choose-date-btn">Выбрать</button> {/* TODO Render only for event owner*/}
                                        <span>14 чел.</span>
                                    </div>
                                </div>
                                <div className="date-card">
                                    <div className="date-card-header"><button className="naked-btn"><Icon16Cancel /></button>{/* TODO Render only for event owner*/}</div>
                                    <div className="date-card-day">ВС, 12 СЕН</div>
                                    <div className="date-card-time">13:00</div>
                                    <div className="date-card-bottom">
                                        <button className="naked-btn choose-date-btn">Выбрать</button> {/* TODO Render only for event owner*/}
                                        <span>14 чел.</span>
                                    </div>
                                </div>
                                <div className="date-card">
                                    <div className="date-card-header"><button className="naked-btn"><Icon16Cancel /></button>{/* TODO Render only for event owner*/}</div>
                                    <div className="date-card-day">ВС, 12 СЕН</div>
                                    <div className="date-card-time">13:00</div>
                                    <div className="date-card-bottom">
                                        <button className="naked-btn choose-date-btn">Выбрать</button> {/* TODO Render only for event owner*/}
                                        <span>14 чел.</span>
                                    </div>
                                </div>
                            </div>
                        </HorizontalScroll>
                    }
                    <Button onClick={()=>setActiveModal('datetime-picker')} mode="secondary" size="xl" style={{marginTop: 5 + 'px'}}>
                        Добавить дату
                    </Button>
                </FormLayoutGroup>

                <RangeSlider
                    top="Количество участников (по умолчанию неограничено)"
                    min={1}
                    max={100}
                    step={1}
                    defaultValue={[1, 100]}
                />

                <FormLayoutGroup top="Видимость:">
                    <Radio defaultChecked name="confidentialType" value="all">Для всех</Radio>
                    <Radio name="confidentialType" value="friends">Только для друзей</Radio>
                    <Radio name="confidentialType" value="invite">По приглашению</Radio>
                </FormLayoutGroup>

                {/*<Select*/}
                {/*    top="Цель поездки"*/}
                {/*    placeholder="Выберите цель поездки"*/}
                {/*    status={purpose ? 'valid' : 'error'}*/}
                {/*    bottom={purpose ? '' : 'Пожалуйста, укажите цель поездки'}*/}
                {/*    onChange={this.onChange}*/}
                {/*    value="{}"*/}
                {/*    name="purpose"*/}
                {/*>*/}
                {/*    <option value="0">Бизнес или работа</option>*/}
                {/*    <option value="1">Индивидуальный туризм</option>*/}
                {/*    <option value="2">Посещение близких родственников</option>*/}
                {/*</Select>*/}

                {/*<Checkbox>Согласен со всем <Link>этим</Link></Checkbox>*/}
                <Button size="xl">Создать событие</Button>
            </FormLayout>


            <CustomModal
                activeModal={activeModal}
                close={() => setActiveModal('')}
                id="datetime-picker"
                maxDates={dateChoiceType === 'individual' ? 1 : 15}
            >
                <VkDatetimePicker onSave={() => console.log("Saved date")} />
            </CustomModal>

        </Panel>
    )
}

AddEvents.propTypes = {
}

export default AddEvents
