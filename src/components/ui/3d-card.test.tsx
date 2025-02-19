const { render, screen } = require('@testing-library/react');
const ThreeDCard = require('./3d-card');

test('hello world!', () => {
	render(<ThreeDCard />);
	const element = screen.getByText(/hello world/i);
	expect(element).toBeInTheDocument();
});