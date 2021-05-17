
import { render } from 'react-dom'
import { BookViewer } from '../../src/ts/BookViewer'
import { useImage } from './hooks/useImage'

const images = useImage()
const App = () => <BookViewer pages={images}/>;
render(<App />, document.getElementById('root'));