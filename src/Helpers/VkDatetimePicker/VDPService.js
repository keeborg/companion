const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const monthDeclension = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

export class VDPService {

    /**
     * Get the current hours
     */
    currentHours() {
        return new Date().getHours()
    }

    /**
     * Get the current minutes
     */
    currentMinutes() {
        return new Date().getMinutes()
    }

    /**
     * Get the current day
     */
    currentDay() {
        return new Date().getDate()
    }

    /**
     * Get the current month
     * @param {boolean} stringify - return as month name
     */
    currentMonth(stringify = false) {
        let month = new Date().getMonth()
        return stringify ? months[month] : month
    }

    /**
     * Get the current year
     */
    currentYear() {
        return new Date().getFullYear()
    }

    /**
     * Get the month name by its ordinal
     * @param {number} monthOrdinal 
     */
    getMonthName(monthOrdinal) {
        return months[monthOrdinal]
    }

    /**
     * Get the month ordinal by its name
     * @param {string} monthName 
     */
    getMonthOrdinal(monthName) {
        return months.indexOf(monthName)
    }

    /**
     * Get the month name or month ordinal based on given offset
     * @param {number|string} startingPoint - the month from which we calc the offset
     * @param {number} offset - negative or positive integer
     */
    getMonthOffset(startingPoint, offset) {
        if (typeof startingPoint === 'string') {
            startingPoint = months.indexOf(startingPoint)
            return months[((startingPoint + offset) % months.length + months.length) % months.length]
        } else if (typeof startingPoint === 'number') {
            return ((startingPoint + offset) % months.length + months.length) % months.length
        }
    }

    /**
     * Get the index of the name of a week day
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     */
    getWeekDay(year, month, day) {
        year  = year  ? year  : new Date().getFullYear()
        month = month ? month : new Date().getMonth()
        day   = day   ? day   : new Date().getDay()

        let weekDay = new Date(year, month, day).getDay() - 1

        return weekDay === -1 ? 6 : weekDay
    }

    /**
     * Get the number of days in a certain month
     * 
     * @param {number} year - number, e.g. 2020
     * @param {number} month - number from 1 to 12
     * @returns {number} - the number of days in provided month
     */
    daysInMonth(year, month) {
        let date = new Date()
        let yearToCheck = year ? year : date.getFullYear()
        let monthToCheck = month ? month : date.getMonth()

        return new Date(yearToCheck, monthToCheck + 1, 0).getDate()
    }

    /**
     * Generate the calendar sheet for a given month
     * @param {number} year 
     * @param {number} month 
     */
    generateCalendarMonth(year, month) {
        let daysInCurrMonth = this.daysInMonth(year, month)
        let yearForPrev = month === 0 ? year - 1 : year
        let daysInPrevMonth = this.daysInMonth(yearForPrev, this.getMonthOffset(month, -1))
        
        let startMonthWeekday = this.getWeekDay(year, month, 1)
        
        let calendar = this.initCalendar()
        let currMonthIncrement = 1
        let nextMonthIncrement = 1
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < startMonthWeekday) {
                    let prevMonthDay = daysInPrevMonth - (startMonthWeekday - j - 1)
                    calendar[i][j] = {className: 'prev-month', day: prevMonthDay}
                } else if (currMonthIncrement <= daysInCurrMonth) {
                    calendar[i][j] = { className: 'curr-month', day: currMonthIncrement++ }
                } else {
                    calendar[i][j] = { className: 'next-month', day: nextMonthIncrement++ }
                }
            }
        }

        return calendar
    }

    /**
     * Initialize calendar array 6x7
     */
    initCalendar() {
        let calendar = new Array(6)
        for (let i = 0; i < 6; i++) {
            calendar[i] = new Array(7)
        }

        return calendar
    }

    /**
     * Generate the final string with chosen date and time
     * @param {number} day 
     * @param {number} month 
     * @param {number} year 
     * @param {number} hours 
     * @param {number} minutes 
     */
    createFullDate(day, month, year, hours, minutes) {
        let weekday = days[this.getWeekDay(year, month, day)]
        month = new Date(year, month, 1).toLocaleString('ru-ru', { month: 'long' })

        monthDeclension.forEach(declension => {
            if (declension.toLowerCase().indexOf(month.slice(0, -1)) !== -1) {
                month = declension
                return false
            }
        })

        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes

        return `${weekday}, ${day} ${month} ${year} г., ${hours}:${minutes}`
    }

}