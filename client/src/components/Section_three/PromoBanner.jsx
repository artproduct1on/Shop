import s from './PromoBanner.module.scss';
import Button from '../UI/Button';
import section1Image from '../../assets/img/section1.svg';

const PromoBanner = () => {
 return (
    <section className={s.bannerContainer}>
      <div 
        className={s.backgroundImage}
        style={{ backgroundImage: `url(${section1Image})` }}
        aria-hidden="true"
      />
      
      <div className={s.content}>
        <h1 className={s.sectionTitle}>
          Amazing Discounts <br/>
         on Garden Products!</h1>

        <Button
          to="/all-sales"
          name="Check out"
          className={s.promoButton}
        />
      </div>
    </section>
  );
};

export default PromoBanner;