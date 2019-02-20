const PlainDate = require('.')


module.exports = {
	daysBetween,

	startOfMonth,
	endOfMonth,

	startOfWeek,
	endOfWeek,

	weekNumber,
}


// calculation

const lengthOfDay = 24 * 60 * 60 * 1000

/**
 * @param {PlainDate} one
 * @param {PlainDate} other
 *
 * @returns {number} Difference between both dates, in days.
 */
function daysBetween (one, other) {
	return Math.round((other.getNativeDate() - one.getNativeDate()) / lengthOfDay)
}

const daysPerWeek = 7
const lastDayIndex = daysPerWeek - 1

/**
 * @param {PlainDate} given
 *
 * @returns {PlainDate} - The first of the same month.
 */
function startOfMonth (given) {
	return new PlainDate(given.year, given.month, 1)
}
/**
 * @param {PlainDate} given
 *
 * @returns {PlainDate} - The last of the same month.
 */
function endOfMonth (given) {
	return new PlainDate(
		new Date(given.year, given.month, 0)
	)
}

/**
 * @param {PlainDate} given
 * @param {number} firstDayIndex
 *
 * @returns {PlainDate} - The first of the same week.
 */
function startOfWeek (given, firstDayIndex) {
	const date = given.date - weekday(given, firstDayIndex)

	return new PlainDate(new Date(given.year, given.month - 1, date))
}
/**
 * @param {PlainDate} given
 * @param {number} firstDayIndex
 *
 * @returns {PlainDate} - The last of the same week.
 */
function endOfWeek (given, firstDayIndex) {
	const dayOffset = lastDayIndex - weekday(given, firstDayIndex)
	const date = given.date + dayOffset

	return new PlainDate(new Date(given.year, given.month - 1, date))
}

/**
 * @param {PlainDate} given
 * @param {number} [firstDayIndex=0] - 0 represents sunday.
 *
 * @returns {number} - Index of weekday, offset according to given index.
 */
function weekday (given, firstDayIndex = 0) {
	const rawDay = given.getNativeDate().getDay()
	const shiftedDay = rawDay - firstDayIndex
	const offsetDay = shiftedDay + daysPerWeek
	const normalizedDay = offsetDay % daysPerWeek

	return normalizedDay
}


/**
 * @param {PlainDate} given
 *
 * @returns {number}
 * The number of the week within the current year, as per ISO 8601.
 *
 * @see https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php#6117889
 */
function weekNumber (given) {
	const date = given.getNativeDate()

	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	date.setDate(date.getDate() + (4 - (date.getDay() || 7)))

	// Get first day of year
	const yearStart = new Date(date.getFullYear(), 0, 1)

	// Calculate full weeks to nearest Thursday
	const weekNo = Math.ceil((((date - yearStart) / lengthOfDay) + 1) / 7)

	// Return week number
	return weekNo
}
