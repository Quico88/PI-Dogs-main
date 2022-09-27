import ShallowRenderer from 'react-shallow-renderer';
import LandingPage from './components/Navigation/LandingPage/LandingPage.jsx'
import App from './App'

describe('LandingPage', () => {

    const renderer = new ShallowRenderer();
    it('renders appropriately', () => {
        renderer.render(<LandingPage />);
        const result = renderer.getRenderOutput();
        expect(result.type).toBe('div');
    })
})