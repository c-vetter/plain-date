const it = require('ava')

const PlainDate = require('../index')

it('returns an ISO-formatted string representation', t => {
	t.is(new PlainDate(2018, 7, 8).toString(), '2018-07-08')
	t.is(new PlainDate(2018, 7).toString(), '2018-07')
})
