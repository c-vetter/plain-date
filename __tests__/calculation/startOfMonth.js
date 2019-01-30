const it = require('ava')

const PlainDate = require('../../index')
const { startOfMonth } = require('../../calculation')


const month = new PlainDate(2018, 5)
const first = new PlainDate(2018, 5, 1)
const middle = new PlainDate(2018, 5, 16)

it('returns a `PlainDate`', t => {
	t.true(startOfMonth(middle) instanceof PlainDate)
})

it('returns the first day in the month of a given day', t => {
	t.is(startOfMonth(middle), first)
})

it('returns the first day for a given month', t => {
	t.is(startOfMonth(month), first)
})
