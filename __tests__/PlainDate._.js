const test = require('ava')

const PlainDate = require('..')


const year = 2018
const month = 5
const date = 8

const validateDay = (t, subject) => {
	t.is(subject.year, year)
	t.is(subject.month, month)
	t.is(subject.date, date)
}
const validateMonth = (t, subject) => {
	t.is(subject.year, year)
	t.is(subject.month, month)
	t.is(subject.date, undefined) // eslint-disable-line no-undefined
}


test('exposes its parameters as members', t => {
	validateDay(t, new PlainDate(year, month, date))
})
test('defaults to the current date', t => {
	const subject = new PlainDate()
	const today = new Date()

	t.is(subject.year, today.getFullYear())
	t.is(subject.month, today.getMonth() + 1)
	t.is(subject.date, today.getDate())
})
test('handles `null` like `undefined`', t => {
	const subject = new PlainDate(null)
	const today = new Date()

	t.is(subject.year, today.getFullYear())
	t.is(subject.month, today.getMonth() + 1)
	t.is(subject.date, today.getDate())
})

test('works with two parameters', t => {
	validateMonth(t, new PlainDate(year, month))
})

test('accepts strings as parameters', t => {
	validateDay(t, new PlainDate(`${year}`, `0${month}`, `0${date}`))
	validateDay(t, new PlainDate(`${year}`, `${month}`, `${date}`))
	validateMonth(t, new PlainDate(`${year}`, `${month}`))
})

test('accepts mixed parameters', t => {
	validateDay(t, new PlainDate(year, `${month}`, `0${date}`))
})

test('accepts a `Date` as single parameter', t => {
	validateDay(t, new PlainDate(new Date(year, month - 1, date)))
})

test('accepts a `PlainDate` as single parameter', t => {
	const object = new PlainDate(year, month, date)
	const subject = new PlainDate(object)

	validateDay(t, subject)
})

test('accepts a `PlainDate`-like object as single parameter', t => {
	validateDay(t, new PlainDate({ year, month, date }))
	validateMonth(t, new PlainDate({ year, month }))
})

test('accepts an ISO-formatted date string as single parameter', t => {
	validateMonth(t, new PlainDate(`${year}-0${month}`))
	validateDay(t, new PlainDate(`${year}-0${month}-0${date}`))
})
test('ignores the time in an ISO-formatted date-time string', t => {
	validateDay(t, new PlainDate(`${year}-0${month}-0${date}T00:00:00.000+01:00`))
	validateDay(t, new PlainDate(`${year}-0${month}-0${date}T02:00:00.000+02:00`))
	validateDay(t, new PlainDate(`${year}-0${month}-0${date}T15:00:00.000+03:00`))
})
test('accepts a date string with a year-size other than 4 digits', t => {
	const subject = new PlainDate('40000-01')
	t.is(subject.year, 40000)
	t.is(subject.month, 1)
})

test('cannot be changed after creation', t => {
	const subject = new PlainDate(2018, 8, 20)
	const error = /Cannot assign to read only property/

	t.throws(() => { subject.year = 2019 }, error)
	t.throws(() => { subject.month = 9 }, error)
	t.throws(() => { subject.date = 21 }, error)
})

test('always yields the same Object for the same date', t => {
	t.is(
		new PlainDate(2019, 1, 30),
		new PlainDate(2019, 1, 30)
	)
})
