import s from './s.module.scss'

function Footer() {
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.409042786275!2d13.372464412236024!3d52.50793613700613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sStarta%20Institute%20by%20Tel-Ran!5e0!3m2!1suk!2sde!4v1747242275605!5m2!1suk!2sde"

  return (
    <footer className={s.footer}>

      <iframe
        className={s.map}
        src={mapSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin"
        allowFullScreen
      />

    </footer>
  )
};

export default Footer;