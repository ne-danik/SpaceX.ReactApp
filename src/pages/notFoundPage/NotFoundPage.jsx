import { Link } from "react-router-dom";
// styles
import './notFoundPage.scss';

const NotFoundPage = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="not_found">
          <p className="not_found__code">404</p>
          <p className="not_found__message">Page not found</p>
          <p><Link to="/" className="btn btn_blue_color">Back to Main page</Link></p>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage;