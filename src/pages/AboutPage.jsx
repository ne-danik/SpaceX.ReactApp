import { useEffect, useState } from 'react'
import useSpacexService from '../services/useSpacexService';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState([]);
  const { process, setProcess, getCompanyInfo } = useSpacexService();

  useEffect(() => {
    onRequest()
  }, [])

  const onRequest = () => {
    getCompanyInfo()
      .then(onAboutInfoLoaded)
      .then(() => setProcess('success'))
  }

  const onAboutInfoLoaded = (data) => {
    setAboutData(data)
  }

  return (
    <>
      <div className="container">
        <h2>About</h2>

        <div>
          <div>
            <h3>Name</h3>
            <span>{aboutData.name}</span>
          </div>
          <div>
            <h3></h3>
            <span>{}</span>
          </div>
          <div>
            <h3></h3>
            <span>{}</span>
          </div>
          <div>
            <h3></h3>
            <span>{}</span>
          </div>
          <div>
            <h3></h3>
            <span></span>
          </div>
          <div>
            <h3></h3>
            <span></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage;