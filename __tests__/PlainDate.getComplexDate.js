const test = require('ava')

const PlainDate = require('..')


const subject = new PlainDate(2018, 4, 13)

test('returns a `Date`', t => {
	t.true(subject.getComplexDate() instanceof Date)
})

test('properly translates to 0-based month', t => {
	t.is(subject.getComplexDate().getFullYear(), 2018)
	t.is(subject.getComplexDate().getMonth(), 3)
	t.is(subject.getComplexDate().getDate(), 13)
})

test('always returns a different `Date`', t => {
	t.not(subject.getComplexDate(), subject.getComplexDate())
	t.deepEqual(subject.getComplexDate(), subject.getComplexDate())
})

test('returns the first day if the object represents a month', t => {
	t.deepEqual(
		new PlainDate(2018, 4).getComplexDate(),
		new PlainDate(2018, 4, 1).getComplexDate()
	)
})
