const test = require('ava')

const PlainDate = require('../..')
const { daysBetween } = require('../../calculation')


const one = new PlainDate(2018, 5, 18)
const other = new PlainDate(2018, 5, 23)
const otherYear = new PlainDate(2019, 1, 23)

test('returns 0 when given two objects representing the same day', t => {
	t.is(daysBetween(one, one), 0)
	t.is(daysBetween(other, other), 0)
})

test('return a positive integer if the second argument is later than the first', t => {
	t.is(daysBetween(one, other), 5)
	t.is(daysBetween(one, otherYear), 250)
})

test('return a negative integer if the second argument is earlier than the first', t => {
	t.is(daysBetween(other, one), -5)
	t.is(daysBetween(otherYear, one), -250)
})
