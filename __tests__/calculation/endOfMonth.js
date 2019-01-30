const it = require('ava')

const PlainDate = require('../../index')
const { endOfMonth } = require('../../calculation')


const month = new PlainDate(2018, 5)
const middle = new PlainDate(2018, 5, 16)
const last = new PlainDate(2018, 5, 31)

it('returns a `PlainDate`', t => {
	t.true(endOfMonth(middle) instanceof PlainDate)
})

it('returns the last day in the month of a given day', t => {
	t.is(endOfMonth(middle), last)
})

it('returns the last day for a given month', t => {
	t.is(endOfMonth(month), last)
})
