const test = require('ava')

const PlainDate = require('../..')
const { endOfWeek } = require('../../calculation')


const sunday = new PlainDate(2018, 5, 6)
const saturday = new PlainDate(2018, 5, 12)

test('returns a `PlainDate`', t => {
	t.true(endOfWeek(sunday) instanceof PlainDate)
})
test('returns the next saturday for a given sunday', t => {
	t.is(
		endOfWeek(sunday),
		saturday
	)
})
test('returns the given saturday', t => {
	t.is(
		endOfWeek(saturday),
		saturday
	)
})
test('correctly wraps around month boundaries', t => {
	t.is(
		endOfWeek(new PlainDate(2018, 5, 31)),
		new PlainDate(2018, 6, 2)
	)
})


test('returns the given sunday with second argument `1`', t => {
	t.is(
		endOfWeek(sunday, 1),
		sunday
	)
})
