import Icon from "../UI/Icon";
import s from "./s.module.scss";

const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.409042786275!2d13.372464412236024!3d52.50793613700613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sStarta%20Institute%20by%20Tel-Ran!5e0!3m2!1suk!2sde!4v1747242275605!5m2!1suk!2sde";

function Footer() {

  return (
    <footer className={s.footer}>

      <h2 className="section-title">Contact</h2>

      <address className={s.contact}>

        <div className={s.contactBlock}>
          <h3 className={s.contactTitle}>Phone</h3>
          <a
            className={s.contactInfo}
            href="tel:+499999999999"
            target="_blank"
            rel="noreferrer"
            aria-label="phone"
          >
            +49 999 999 99 99
          </a>
        </div>
        <div className={s.contactBlock}>
          <h3 className={s.contactTitle}>Socials</h3>
          <ul className={s.social}>
            <li>
              <a
                className={s.socialIcon}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Icon id="instagram" />
              </a>
            </li>
            <li>
              <a
                className={s.socialIcon}
                href="https://www.whatsapp.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <Icon id="whatsapp" />
              </a>
            </li>
          </ul>
        </div>

        <div className={s.contactBlock}>
          <h3 className={s.contactTitle}>Address</h3>
          <a
            className={s.contactInfo}
            href="https://maps.app.goo.gl/QUyL5bcfK9RJUkpGA"
            target="_blank"
            rel="noreferrer"
            aria-label="address"
          >
            Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland
          </a>
        </div>

        <div className={s.contactBlock}>
          <h3 className={s.contactTitle}>Working Hours</h3>
          <p className={s.contactInfo}>24 hours a day</p>
        </div>

        <iframe
          className={s.map}
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin"
          allowFullScreen
        />
      </address>

    </footer>
  );
};

export default Footer;
