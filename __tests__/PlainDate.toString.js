const test = require('ava')

const PlainDate = require('..')


const date = new PlainDate(2018, 7, 8)

test('returns a string representation according to the given format', t => {
	const format1 = 'YYMMDD'
	const format2 = 'YYYYMMDD'
	const format3 = 'DD.MM.YYYY'
	const format4 = 'MM/DD/YY'

	t.is(date.toString(format1), '180708')
	t.is(date.toString(format2), '20180708')
	t.is(date.toString(format3), '08.07.2018')
	t.is(date.toString(format4), '07/08/18')
})

test('defaults to ISO format', t => {
	t.is(date.toString(), '2018-07-08')
})

test('leaves off the date component for a month', t => {
	t.is(new PlainDate(2018, 7).toString(), '2018-07')
})
