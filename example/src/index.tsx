
import { render } from 'react-dom'
import { Slider } from '../../src'

const App = () => <Slider pages={[0,1,2]}/>;
render(<App />, document.getElementById('root'));