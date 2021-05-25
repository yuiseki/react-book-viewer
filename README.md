# react-book-viewer
## Getting started
### Installation
`npm install react-book-viewer` or `yarn add react-book-viewer`
### Useage

```
import {BookViewer} from 'react-book-viewer'

cosnt App = () => {
  pages = ['imgSrc1', 'imgSrc2', 'imgSrc3']
  return (
    <BookViewer pages={pages}/>
  )
}
```
you can insert header if you want
```
const offSetHeight = '80px'
const Header () = {
  return (
    <div className='header' style={{height: offSetHeight}}>
      <a id="link" href='/'>&gt; top page</a>
      <a id="link" href='/aboutus'>&gt; about us</a>
      <a id="link" href='/contactus'>&gt; contact us</a>
      <a id="link" href='/joinus'>&gt; join us</a>
    </div>
  )
}
const children = {
  Render: Header
  height: offSetHeight
}
cosnt App = () => {
  pages = ['imgSrc1', 'imgSrc2', 'imgSrc3']
  return (
    <BookViewer pages={pages} children={children}/>
  )
}
```

you can switch direction in which pages go
```
<BookViewer pages={pages} children={children} direction='ltr'/>
```
default is 'rtl' so `direction='rtl'` can be abbreviated