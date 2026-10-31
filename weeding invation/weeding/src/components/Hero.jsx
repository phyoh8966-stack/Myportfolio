import { ArrowDown } from 'lucide-react';

export default function Hero({ data }) {
  return (
    <section className="hero" id="home" aria-label="Wedding announcement">
      <img
        className="hero__image"
        src={data.heroImage}
        alt="A romantic wedding celebration surrounded by flowers"
      />
      <div className="hero__shade" />
      <div className="hero__content">
        <p className="eyebrow eyebrow--light">We’re getting married</p>
        <h1>
          {data.bride.name} <i>&amp;</i> {data.groom.name}
        </h1>
        <p className="hero__subtitle">{data.copy.subtitle}</p>
        <span className="hero__divider" />
        <p className="hero__date">{data.date.display}</p>
      </div>
      <a className="hero__scroll" href="#invitation" aria-label="Scroll to invitation">
        <span>Scroll to discover</span>
        <ArrowDown size={16} />
      </a>
      <span className="hero__vertical" aria-hidden="true">
        {data.date.short}
      </span>
    </section>
  );
}
