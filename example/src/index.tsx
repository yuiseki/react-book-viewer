
import { render } from 'react-dom'
import { BookViewer } from '../../src/ts/BookViewer'
import { useImage } from './hooks/useImage'
import './index.css'

const images = useImage()
const offSetHeight = '80px'
const GlobalHeader: React.FC = () => {
  return (
      <>
     　<div className="header" style={{height: offSetHeight}}>
          <div className="mini">
          </div>
          <a id="link" href='/'>&gt; top page</a>
          <span id="arrow"></span><a id="link" href='/aboutus'>&gt; about us</a>
          <span id="arrow"></span><a id="link" href='/contactus'>&gt; contact us</a>
          <span id="arrow"></span><a id="link" href='/joinus'>&gt; join us</a>
       </div>
      </>
  )
}
const children = {
  Render: GlobalHeader,
  height: offSetHeight
}
const App = () => <BookViewer pages={images} children={children}/>;
render(<App />, document.getElementById('root'));