const test = require('ava')

const PlainDate = require('../..')
const { startOfMonth } = require('../../calculation')


const month = new PlainDate(2018, 5)
const first = new PlainDate(2018, 5, 1)
const middle = new PlainDate(2018, 5, 16)

test('returns a `PlainDate`', t => {
	t.true(startOfMonth(middle) instanceof PlainDate)
})

test('returns the first day in the month of a given day', t => {
	t.is(startOfMonth(middle), first)
})

test('returns the first day for a given month', t => {
	t.is(startOfMonth(month), first)
})
