/**
 * @overview
 * Exports the `PlainDate` class.
 */

/**
 * @type {Object}
 * This cache object makes direct comparisons possible `==` and
 * can potentially save space by reuse of existing PlainDate objects.
 */
const cache = Object.create(null)


/**
 * @typedef {Object} PlainDate
 *
 * @description
 * PlainDate objects represent calendar dates or months.
 * They focus on ease of use and are very light in comparison
 * with JavaScript's native Date type.
 *
 * They have a small set of properties, are immutable,
 * and every date can only ever exist once.
 *
 * If you try to create a new PlainDate object with a date
 * that has previously been created, you will receive that
 * pre-existing PlainDate object.
 *
 * Additionally, PlainDate objects can be intuitively compared.
 *
 * PlainDate objects can be constructed with one to three parameters.
 * Behaviour for unexpected inputs is not defined.
 * In order to stay light-weight, there is no intelligent type checking.
 *
 * @property {number} year
 * @property {number} month
 * @property {number} date
 * @property {number} timestamp
 *
 * @example
 * new PlainDate('2019-04-01') === new PlainDate('2019-04-01') // => true
 *
 * @example
 * new PlainDate('2019-04-01') < new PlainDate('2019-04-01') // => false
 *
 * @example
 * new PlainDate('2019-04-01') < new PlainDate('2019-04-11') // => true
 *
 * @example
 * new PlainDate('2019-04-01') > new PlainDate('2019-04-11') // => false
 *
 */
/**
 * @constructor
 *
 * PlainDate/3_parameters
 *
 * @param {number|string} year
 * @param {number|string} month
 * @param {number|string} date
 *
 * @example
 * new PlainDate(2019, 4, 1)
 *
 * @example
 * new PlainDate('2019', '04', '01')
 */
/**
 * @constructor
 *
 * PlainDate/2_parameters
 *
 * @param {number|string} year
 * @param {number|string} month
 *
 * @example
 * new PlainDate(2019, 4)
 *
 * @example
 * new PlainDate('2019', '4')
 */
/**
 * @constructor
 *
 * PlainDate/1_parameter
 *
 * @param {string|Date|PlainDate|{year: number, month: number, date: ?number}} fullDate
 *
 * @example
 * new PlainDate('2019-04-01')
 *
 * @example
 * new PlainDate('2019-04')
 *
 * @example
 * new PlainDate(new Date(2019,3,1))
 *
 * @example
 * new PlainDate({
 *   year: 2019,
 *   month: 4,
 * })
 */
module.exports = class PlainDate {
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

			if (cache[dateObject.timestamp]) {
				return cache[dateObject.timestamp]
			}

			this.year = dateObject.year
			this.month = dateObject.month
			this.date = dateObject.date
		} else if (typeof yearOrDate === 'string' && yearOrDate.length > 4) {
			const [foundYear, foundMonth, foundDate] = yearOrDate.split('-')

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

		if (cache[this.timestamp]) {
			return cache[this.timestamp]
		}

		Object.freeze(this)
		cache[this.timestamp] = this
	}

	/**
	 * Creates a new equivalent `Date` object.
	 * Multiple calls yield multiple distinct objects.
	 *
	 * @returns {Date}
	 */
	getComplexDate () {
		return new Date(this.year, this.month - 1, this.date || 1)
	}

	/**
	 * Replaces each token in the given string by
	 * the appropriate string representation of the related data:
	 * + YYYY: full year-number.
	 * + YY: last two digits of year.
	 * + MM: zero-padded two-digit month.
	 * + DD: zero-padded two-digit date.
	 *
	 * Defaults to the ISO format.
	 *
	 * @param {string} [format='YYYY-MM[-DD]']
	 *
	 * @returns {string}
	 */
	toString (format = this.date ? 'YYYY-MM-DD' : 'YYYY-MM') {
		return format
		.replace('YYYY', this.year)
		.replace('YY', padded(this.year))
		.replace('MM', padded(this.month))
		.replace('DD', padded(this.date))
	}

	/**
	 * Enables fast comparison via `<` and `>`.
	 *
	 * @returns {number}
	 */
	valueOf () {
		return this.timestamp
	}
}


// HELPERS


/**
 * Zero-pads a number to 2 digits.
 *
 * @param {number} [number=0]
 *
 * @returns {string}
 */
function padded (number = 0) {
	return `0${number}`.slice(-2)
}
