/**
 * @overview
 * Exports the `PlainDate` class,
 * as well as related helper functions
 * for comparison and calculation.
 */

export {
	// comparison
	compare,

	isEqual,
	isBefore,
	isAfter,
	isInRange,

	equal,
	before,
	after,


	// calculation
	daysBetween,

	startOfMonth,
	endOfMonth,

	startOfWeek,
	endOfWeek,

	weekNumber,

	offset,
}

/**
 * Represents a date or a month,
 * depending on whether the instance is constructed
 * with three or two parameters, respectively.
 */
export default class PlainDate {
	/**
	 * @param {number|Date|PlainDate|{year: number, month: number, date: ?number}} yearOrDate -
	 * if a `Date`, `PlainDate` (or similar), or ISO-string is given,
	 * the other parameters are ignored
	 * @param {number} month
	 * @param {number} date
	 */
	constructor (yearOrDate, month, date) {
		if (!yearOrDate) {
			// eslint-disable-next-line no-param-reassign
			yearOrDate = new Date()
		}

		if (yearOrDate instanceof Date) {
			const dateObject = yearOrDate

			this.year = dateObject.getFullYear()
			this.month = dateObject.getMonth() + 1
			this.date = dateObject.getDate()
		} else if (typeof yearOrDate === 'object') {
			// PlainDate or similar expected
			const dateObject = yearOrDate

			this.year = dateObject.year
			this.month = dateObject.month
			this.date = dateObject.date
		} else if (typeof yearOrDate === 'string' && yearOrDate.length > 4) {
			const [, foundYear, foundMonth, foundDate] =
			yearOrDate.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?/)

			this.year = parseInt(foundYear, 10)
			this.month = parseInt(foundMonth, 10)
			if (foundDate) {
				this.date = parseInt(foundDate, 10)
			}
		} else {
			this.year = parseInt(yearOrDate, 10)
			this.month = parseInt(month, 10)
			if (date) {
				this.date = parseInt(date, 10)
			}
		}

		this.timestamp =
		(this.year * 10000) +
		(this.month * 100) +
		(this.date || 0)

		Object.freeze(this)
	}

	/**
	 * @returns {string} - represents the same day or month
	 */
	toString () {
		return this.timestamp.toString(10)
		.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
		.replace(/-00$/, '')
	}

	/**
	 * Replaces tokens in the given string by
	 * the appropriate string representation of the related data:
	 * + YYYY: full year-number
	 * + YY: last two digits of year
	 * + MM: zero-padded two-digit month
	 * + DD: zero-padded two-digit date
	 *
	 * @param {string} format
	 *
	 * @returns {string}
	 */
	formatString (format = 'YYYY-MM-DD') {
		return format
		.replace('YYYY', this.year)
		.replace('YY', padded(this.year))
		.replace('MM', padded(this.month))
		.replace('DD', padded(this.date))
	}

	/**
	 * @returns {Date} - represents the same day or month
	 */
	getComplexDate () {
		return new Date(this.year, this.month - 1, this.date || 1)
	}
}


// comparison

const equal = 0
const before = -1
const after = 1

/**
 * Comparison function for two `PlainDate`s, as per `Array#sort`.
 *
 * @param {PlainDate} one
 * @param {PlainDate} other
 *
 * @returns {number}
 */
function compare (one, other) {
	if (one.timestamp < other.timestamp) {
		return before
	}
	if (one.timestamp > other.timestamp) {
		return after
	}
	return equal
}

/**
 * Returns true if both given `PlainDate`s represent the same day,
 * false otherwise.
 *
 * @param {PlainDate} one
 * @param {PlainDate} other
 *
 * @returns {boolean}
 */
function isEqual (one, other) {
	if (!one || !other) {
		return false
	}
	return compare(one, other) === equal
}

/**
 * Returns true if the first parameter is before the second,
 * false otherwise.
 *
 * @param {PlainDate} one
 * @param {PlainDate} other
 *
 * @returns {boolean}
 */
function isBefore (one, other) {
	if (!one || !other) {
		return false
	}
	return compare(one, other) === before
}

/**
 * Returns true if the first parameter is after the second,
 * false otherwise.
 *
 * @param {PlainDate} one
 * @param {PlainDate} other
 *
 * @returns {boolean}
 */
function isAfter (one, other) {
	if (!one || !other) {
		return false
	}
	return compare(one, other) === after
}

/**
 * Tells whether the given `PlainDate` is between the given start and end, inclusive.
 *
 * @param {object} options
 * @param {PlainDate} options.date - the date to check
 * @param {PlainDate} options.start - the range's lower bound
 * @param {PlainDate} options.end - the range's upper bound
 *
 * @returns {boolean}
 */
function isInRange ({ date, start, end }) {
	if (!date || !start || !end) {
		return false
	}

	if (date.timestamp < start.timestamp) {
		return false
	}

	if (date.timestamp > end.timestamp) {
		return false
	}

	return true
}


// HELPERS


/**
 * Zero-pads a number to 2 digits.
 *
 * @param {number} number
 *
 * @returns {string}
 */
function padded (number) {
	return `0${number}`.slice(-2)
}


// calculation

const lengthOfDay = 24 * 60 * 60 * 1000

/**
 * @param {PlainDate} one
 * @param {PlainDate} other
 *
 * @returns {number} difference between both dates, in days
 */
function daysBetween (one, other) {
	return Math.round((other.getComplexDate() - one.getComplexDate()) / lengthOfDay)
}

const daysPerWeek = 7
const lastDayIndex = daysPerWeek - 1

/**
 * @param {PlainDate} given
 *
 * @returns {PlainDate} - the first of the same month
 */
function startOfMonth (given) {
	return new PlainDate(given.year, given.month, 1)
}
/**
 * @param {PlainDate} given
 *
 * @returns {PlainDate} - the last of the same month
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
 * @returns {PlainDate} - the first of the same week
 */
function startOfWeek (given, firstDayIndex) {
	const date = given.date - weekday(given, firstDayIndex)

	return new PlainDate(new Date(given.year, given.month - 1, date))
}
/**
 * @param {PlainDate} given
 * @param {number} firstDayIndex
 *
 * @returns {PlainDate} - the last of the same week
 */
function endOfWeek (given, firstDayIndex) {
	const dayOffset = lastDayIndex - weekday(given, firstDayIndex)
	const date = given.date + dayOffset

	return new PlainDate(new Date(given.year, given.month - 1, date))
}

/**
 * @param {PlainDate} given
 * @param {number} [firstDayIndex=0] - 0 represents sunday
 *
 * @returns {number} - index of weekday, offset according to given index
 */
function weekday (given, firstDayIndex = 0) {
	const rawDay = given.getComplexDate().getDay()
	const shiftedDay = rawDay - firstDayIndex
	const offsetDay = shiftedDay + daysPerWeek
	const normalizedDay = offsetDay % daysPerWeek

	return normalizedDay
}


/**
 * @param {PlainDate} given
 *
 * @returns {number}
 * the number of the week within the current year, as per ISO 8601
 *
 * @see https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php#6117889
 */
function weekNumber (given) {
	const date = given.getComplexDate()

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
