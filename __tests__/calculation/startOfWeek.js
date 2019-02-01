const test = require('ava')

const PlainDate = require('../..')
const { startOfWeek } = require('../../calculation')


const monday = new PlainDate(2018, 5, 7)
const sunday = new PlainDate(2018, 5, 6)

test('returns a `PlainDate`', t => {
	t.true(startOfWeek(monday) instanceof PlainDate)
})
test('returns the previous sunday for a given monday', t => {
	t.is(
		startOfWeek(monday),
		sunday
	)
})
test('returns the given sunday', t => {
	t.is(
		startOfWeek(sunday),
		sunday
	)
})
test('correctly wraps around month boundaries', t => {
	t.is(
		startOfWeek(new PlainDate(2018, 5, 1)),
		new PlainDate(2018, 4, 29)
	)
})


test('returns the given monday with second argument `1`', t => {
	t.is(
		startOfWeek(monday, 1),
		monday
	)
})
