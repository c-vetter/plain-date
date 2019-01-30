/**
 * @overview
 * Exports the `PlainDate` class.
 */

const all = {}

/**
 * @typedef {Object} PlainDate
 *
 * @property {number} year - Indicates whether the Courage component is present.
 * @property {number} month - Indicates whether the Power component is present.
 * @property {number} date - Indicates whether the Wisdom component is present.
 * @property {number} timestamp
 */
module.exports = class PlainDate {
	/**
	 * @param {number|Date|PlainDate|{year: number, month: number, date: ?number}} yearOrDate -
	 * if a `Date`, `PlainDate` (or similar), or ISO-string is given,
	 * the other parameters are ignored.
	 * @param {number} month
	 * @param {number} date
	 *
	 * @returns {PlainDate}
	 */
	constructor (yearOrDate, month, date) {
		if (yearOrDate instanceof PlainDate) {
			return yearOrDate
		}

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
			/** @type {PlainDate} */
			const dateObject = yearOrDate

			if (all[dateObject.timestamp]) {
				return all[dateObject.timestamp]
			}

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

		if (all[this.timestamp]) {
			return all[this.timestamp]
		}

		Object.freeze(this)
		all[this.timestamp] = this
	}

	/**
	 * @returns {string} - Represents the same day or month.
	 */
	toString () {
		return this.timestamp.toString(10)
		.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
		.replace(/-00$/, '')
	}

	/**
	 * Replaces each token in the given string by
	 * the appropriate string representation of the related data:
	 * + YYYY: full year-number.
	 * + YY: last two digits of year.
	 * + MM: zero-padded two-digit month.
	 * + DD: zero-padded two-digit date.
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
	 * @returns {Date} - Represents the same day or month.
	 */
	getComplexDate () {
		return new Date(this.year, this.month - 1, this.date || 1)
	}
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
