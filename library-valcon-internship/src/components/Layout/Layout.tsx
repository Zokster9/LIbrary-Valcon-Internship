import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import MobileSidebar from '../MobileSidebar/MobileSidebar'
import './Layout.css'

const Layout = () => {
  return (
    <div className='Layout'>
      <Header />
      <div className='card'>Layout Component</div>
      <MobileSidebar />
      <Footer />
    </div>
  )
}

export default Layout
