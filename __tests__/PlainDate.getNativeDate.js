const test = require('ava')

const PlainDate = require('..')


const subject = new PlainDate(2018, 4, 13)

test('returns a `Date`', t => {
	t.true(subject.getNativeDate() instanceof Date)
})

test('properly translates to 0-based month', t => {
	t.is(subject.getNativeDate().getFullYear(), 2018)
	t.is(subject.getNativeDate().getMonth(), 3)
	t.is(subject.getNativeDate().getDate(), 13)
})

test('always returns a different `Date`', t => {
	t.not(subject.getNativeDate(), subject.getNativeDate())
	t.deepEqual(subject.getNativeDate(), subject.getNativeDate())
})

test('returns the first day if the object represents a month', t => {
	t.deepEqual(
		new PlainDate(2018, 4).getNativeDate(),
		new PlainDate(2018, 4, 1).getNativeDate()
	)
})
