import { useEffect, useState } from 'react'
// hooks
import useSpacexService from '../../services/spasexService';
// components
import { Skeleton } from '../../components/Skeleton/Skeleton';
// styles
import './aboutPage.scss';
import { ExternalLink } from '../../components/AppLinks/AppLinks';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState([]);
  const { setProcess, clearError, getCompanyInfo } = useSpacexService();

  const {
    address,
    city,
    state,
    name,
    founder,
    founded,
    employees,
    summary,
    links,
    vehicles,
    launchSites,
    testSites,
    valuation,
    ceo,
    coo,
    ctoPropulsion,
  } = aboutData;

  useEffect(() => {
    onRequest()
  }, [])

  const onRequest = () => {
    clearError();
    getCompanyInfo()
      .then(setAboutData)
      .then(() => setProcess('success'))
  }

  return (
    <>
      <section className="section about">
        <div className="container">
          <h2 className="section__title">About</h2>
          <p className="about__summary">
            {summary ? summary : (
              <>
                <Skeleton />
                <Skeleton width={'60%'} />
              </>
            )}
          </p>

          <div className="about__text-block">
            <h3 className="about__title">Company Info</h3>
            <div className="about__fields">
              <p className="about__field">
                <span className="field__title">Name:</span>
                <span className="field__value">
                  {name ? name : <Skeleton width="100px" />}
                </span>
              </p>
              <p className="about__field">
                <span className="field__title">Founder:</span>
                <span className="field__value">
                  {founder ? founder : <Skeleton width="100px" />}
                </span>
              </p>
              <p className="about__field">
                <span className="field__title">Founded:</span>
                <span className="field__value">
                  {founded ? founded : <Skeleton width="100px" />}
                </span>
              </p>
              <p className="about__field">
                <span className="field__title">Employees:</span>
                <span className="field__value">
                  {employees ? employees : <Skeleton width="100px" />}
                </span>
              </p>
              <p className="about__field">
                <span className="field__title">Vehicles:</span>
                <span className="field__value">
                  {vehicles ? vehicles : <Skeleton width="100px" />}
                </span>
              </p>
              <p className="about__field">
                <span className="field__title">Launch sites:</span>
                <span className="field__value">
                  {launchSites ? launchSites : <Skeleton width="100px" />}
                </span>
              </p>
              <p className="about__field">
                <span className="field__title">Test sites:</span>
                <span className="field__value">
                  {testSites ? testSites : <Skeleton width="100px" />}
                </span>
              </p>
              <p className="about__field">
                <span className="field__title">Valuation:</span>
                <span className="field__value">
                  {valuation ? `$${valuation}` : <Skeleton width="100px" />}
                </span>
              </p>
            </div>
          </div>

          <div className="about__text-block">
            <h3 className="about__title">Board</h3>
            <div className="about__fields">
              <p className="about__field">
                <span className="field__title">CEO, CTO & Founder:</span>
                <span className="field__value">
                  {ceo ? ceo : <Skeleton width="100px" />}
                </span>
              </p>
              <p className="about__field">
                <span className="field__title">Propulsion CTO:</span>
                <span className="field__value">
                  {ctoPropulsion ? ctoPropulsion : <Skeleton width="100px" />}
                </span>
              </p>
              <p className="about__field">
                <span className="field__title">COO:</span>
                <span className="field__value">
                  {coo ? coo : <Skeleton width="100px" />}
                </span>
              </p>
            </div>
          </div>

          <div className="about__text-block">
            <h3 className="about__title">Headquarters</h3>
            <div className="about__fields">
              <p className="about__field">
                <span className="field__title">Address:</span>
                <span className="field__value">
                  {address ? address : <Skeleton width="100px" />}
                </span>
              </p>

              <p className="about__field">
                <span className="field__title">State:</span>
                <span className="field__value">
                  {state ? state : <Skeleton width="100px" />}
                </span>
              </p>

              <p className="about__field">
                <span className="field__title">City:</span>
                <span className="field__value">
                  {city ? city : <Skeleton width="100px" />}
                </span>
              </p>
            </div>
          </div>

          <div className="about__text-block">
            <h3 className="about__title">Links</h3>
            <div className="about__fields">
              {links ? (
                <>
                  <p className="about__field">
                    <ExternalLink url={links.website} label="SpaceX.com" />
                  </p>
                  <p className="about__field">
                    <ExternalLink url={links.flickr} label="Flickr" />
                  </p>
                  <p className="about__field">
                    <ExternalLink url={links.twitter} label="Twitter" />
                  </p>
                  <p className="about__field">
                    <ExternalLink url={links.elonTwitter} label="Elon Twitter" />
                  </p>
                </>
              ) : <Skeleton width="100px" />}
            </div>
          </div>

          <p style={{ textAlign: 'center' }}>This is not an official SpaceX website.</p>

        </div>
      </section>
    </>
  )
}

export default AboutPage;