import { useEffect, useState } from 'react'
import useSpacexService from '../../services/useSpacexService';
// styles
import './aboutPage.scss';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState([]);
  const { process, setProcess, getCompanyInfo } = useSpacexService();

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
    getCompanyInfo()
      .then(onAboutInfoLoaded)
      .then(() => setProcess('success'))
  }

  const onAboutInfoLoaded = (data) => {
    setAboutData(data)
  }

  return (
    <>
      <section className="section about">
        <div className="container">
          <h2 className="section__title">About</h2>
          <p className="about__summary">{summary}</p>

          <div className="about__text-block">
            <h3 className="about__title">Company Info</h3>
            <div className="about__fields">
              <p className="about__field">
                <span className="field__title">Name:</span>
                <span className="field__value">{name}</span>
              </p>
              <p className="about__field">
                <span className="field__title">Founded:</span>
                <span className="field__value">{founded}</span>
              </p>
              <p className="about__field">
                <span className="field__title">Employees:</span>
                <span className="field__value">{employees}</span>
              </p>
              <p className="about__field">
                <span className="field__title">Vehicles:</span>
                <span className="field__value">{vehicles}</span>
              </p>
              <p className="about__field">
                <span className="field__title">Launch sites:</span>
                <span className="field__value">{launchSites}</span>
              </p>
              <p className="about__field">
                <span className="field__title">Test sites:</span>
                <span className="field__value">{testSites}</span>
              </p>
              <p className="about__field">
                <span className="field__title">Valuation:</span>
                <span className="field__value">${valuation}</span>
              </p>
            </div>
          </div>

          <div className="about__text-block">
            <h3 className="about__title">Board</h3>
            <div className="about__fields">
              <p className="about__field">
                <span className="field__title">CEO, CTO & Founder:</span>
                <span className="field__value">{ceo}</span>
              </p>
              <p className="about__field">
                <span className="field__title">COO:</span>
                <span className="field__value">{coo}</span>
              </p>
              <p className="about__field">
                <span className="field__title">Propulsion CTO:</span>
                <span className="field__value">{ctoPropulsion}</span>
              </p>
            </div>
          </div>

          <div className="about__text-block">
            <h3 className="about__title">Headquarters</h3>
            <div className="about__fields">
              <p className="about__field">
                <span className="field__title">Address:</span>
                <span className="field__value">{address}</span>
              </p>
              <p className="about__field">
                <span className="field__title">State:</span>
                <span className="field__value">{state}</span>
              </p>
              <p className="about__field">
                <span className="field__title">City:</span>
                <span className="field__value">{city}</span>
              </p>
            </div>
          </div>

          {links ? (
            <div className="about__text-block">
              <h3 className="about__title">Links</h3>
              <div className="about__fields">
                <p className="about__field">
                  <a href={links.website} rel="nofollow" target="_blank" className="external-link">
                    SpaceX.com
                    <svg className="external-link__icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.33333 3.33333C8.96514 3.33333 8.66667 3.03486 8.66667 2.66667C8.66667 2.29848 8.96514 2 9.33333 2H13.3333C13.5101 2 13.6797 2.07024 13.8047 2.19526C13.9298 2.32029 14 2.48986 14 2.66667L14 6.66667C14 7.03486 13.7015 7.33333 13.3333 7.33333C12.9651 7.33333 12.6667 7.03486 12.6667 6.66667L12.6667 4.27614L6.4714 10.4714C6.21106 10.7318 5.78894 10.7318 5.5286 10.4714C5.26825 10.2111 5.26825 9.78894 5.5286 9.52859L11.7239 3.33333H9.33333ZM2 4.66667C2 3.93029 2.59695 3.33333 3.33333 3.33333H6.66667C7.03486 3.33333 7.33333 3.63181 7.33333 4C7.33333 4.36819 7.03486 4.66667 6.66667 4.66667H3.33333V12.6667H11.3333V9.33333C11.3333 8.96514 11.6318 8.66667 12 8.66667C12.3682 8.66667 12.6667 8.96514 12.6667 9.33333V12.6667C12.6667 13.403 12.0697 14 11.3333 14H3.33333C2.59695 14 2 13.403 2 12.6667V4.66667Z"
                        fill="#0044FF" />
                    </svg>
                  </a>
                </p>
                <p className="about__field">
                  <a href={links.flickr} rel="nofollow" target="_blank" className="external-link">
                    Flickr
                    <svg className="external-link__icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.33333 3.33333C8.96514 3.33333 8.66667 3.03486 8.66667 2.66667C8.66667 2.29848 8.96514 2 9.33333 2H13.3333C13.5101 2 13.6797 2.07024 13.8047 2.19526C13.9298 2.32029 14 2.48986 14 2.66667L14 6.66667C14 7.03486 13.7015 7.33333 13.3333 7.33333C12.9651 7.33333 12.6667 7.03486 12.6667 6.66667L12.6667 4.27614L6.4714 10.4714C6.21106 10.7318 5.78894 10.7318 5.5286 10.4714C5.26825 10.2111 5.26825 9.78894 5.5286 9.52859L11.7239 3.33333H9.33333ZM2 4.66667C2 3.93029 2.59695 3.33333 3.33333 3.33333H6.66667C7.03486 3.33333 7.33333 3.63181 7.33333 4C7.33333 4.36819 7.03486 4.66667 6.66667 4.66667H3.33333V12.6667H11.3333V9.33333C11.3333 8.96514 11.6318 8.66667 12 8.66667C12.3682 8.66667 12.6667 8.96514 12.6667 9.33333V12.6667C12.6667 13.403 12.0697 14 11.3333 14H3.33333C2.59695 14 2 13.403 2 12.6667V4.66667Z"
                        fill="#0044FF" />
                    </svg>
                  </a>
                </p>
                <p className="about__field">
                  <a href={links.twitter} rel="nofollow" target="_blank" className="external-link">
                    Twitter
                    <svg className="external-link__icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.33333 3.33333C8.96514 3.33333 8.66667 3.03486 8.66667 2.66667C8.66667 2.29848 8.96514 2 9.33333 2H13.3333C13.5101 2 13.6797 2.07024 13.8047 2.19526C13.9298 2.32029 14 2.48986 14 2.66667L14 6.66667C14 7.03486 13.7015 7.33333 13.3333 7.33333C12.9651 7.33333 12.6667 7.03486 12.6667 6.66667L12.6667 4.27614L6.4714 10.4714C6.21106 10.7318 5.78894 10.7318 5.5286 10.4714C5.26825 10.2111 5.26825 9.78894 5.5286 9.52859L11.7239 3.33333H9.33333ZM2 4.66667C2 3.93029 2.59695 3.33333 3.33333 3.33333H6.66667C7.03486 3.33333 7.33333 3.63181 7.33333 4C7.33333 4.36819 7.03486 4.66667 6.66667 4.66667H3.33333V12.6667H11.3333V9.33333C11.3333 8.96514 11.6318 8.66667 12 8.66667C12.3682 8.66667 12.6667 8.96514 12.6667 9.33333V12.6667C12.6667 13.403 12.0697 14 11.3333 14H3.33333C2.59695 14 2 13.403 2 12.6667V4.66667Z"
                        fill="#0044FF" />
                    </svg>
                  </a>
                </p>
                <p className="about__field">
                  <a href={links.elonTwitter} rel="nofollow" target="_blank" className="external-link">
                    Elon Twitter
                    <svg className="external-link__icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.33333 3.33333C8.96514 3.33333 8.66667 3.03486 8.66667 2.66667C8.66667 2.29848 8.96514 2 9.33333 2H13.3333C13.5101 2 13.6797 2.07024 13.8047 2.19526C13.9298 2.32029 14 2.48986 14 2.66667L14 6.66667C14 7.03486 13.7015 7.33333 13.3333 7.33333C12.9651 7.33333 12.6667 7.03486 12.6667 6.66667L12.6667 4.27614L6.4714 10.4714C6.21106 10.7318 5.78894 10.7318 5.5286 10.4714C5.26825 10.2111 5.26825 9.78894 5.5286 9.52859L11.7239 3.33333H9.33333ZM2 4.66667C2 3.93029 2.59695 3.33333 3.33333 3.33333H6.66667C7.03486 3.33333 7.33333 3.63181 7.33333 4C7.33333 4.36819 7.03486 4.66667 6.66667 4.66667H3.33333V12.6667H11.3333V9.33333C11.3333 8.96514 11.6318 8.66667 12 8.66667C12.3682 8.66667 12.6667 8.96514 12.6667 9.33333V12.6667C12.6667 13.403 12.0697 14 11.3333 14H3.33333C2.59695 14 2 13.403 2 12.6667V4.66667Z"
                        fill="#0044FF" />
                    </svg>
                  </a>
                </p>
              </div>
            </div>
          ) : null}

          <p style={{ textAlign: 'center' }}>This is not an official SpaceX website.</p>

        </div>
      </section>
    </>
  )
}

export default AboutPage;