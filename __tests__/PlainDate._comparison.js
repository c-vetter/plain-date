const it = require('ava')

const PlainDate = require('../index')


const early = new PlainDate(2018, 1, 1)
const late = new PlainDate(2019, 12, 31)

it('tests correctly for equality', t => {
	t.true(early === new PlainDate(early))
	t.true(late === new PlainDate(late))

	t.false(early === late)
	t.false(late === early)
})

it('tests correctly for inequality', t => {
	t.true(early < late)
	t.true(late > early)

	t.false(late < early)
	t.false(early > late)
})
