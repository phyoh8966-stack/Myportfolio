import { ArrowDown, Flower2 } from 'lucide-react';

export default function WelcomeCover({ data, onOpen }) {
  return (
    <div className="welcome-cover" role="dialog" aria-modal="true" aria-labelledby="cover-title">
      <img
        className="welcome-cover__image"
        src={data.gallery[0].src}
        alt=""
      />
      <div className="welcome-cover__veil" />
      <div className="welcome-cover__ornament" aria-hidden="true">
        <Flower2 />
      </div>
      <div className="welcome-cover__content">
        <p className="eyebrow eyebrow--light">{data.invitation.eyebrow}</p>
        <h1 id="cover-title" className="welcome-cover__names">
          {data.bride.name}
          <span>&amp;</span>
          {data.groom.name}
        </h1>
        <span className="welcome-cover__rule" />
        <p className="welcome-cover__date">{data.date.display}</p>
        <button className="button button--cover" type="button" onClick={onOpen}>
          Open invitation <ArrowDown size={16} strokeWidth={1.6} />
        </button>
        <p className="welcome-cover__hint">A little note, made just for you</p>
      </div>
      <span className="welcome-cover__corner welcome-cover__corner--tl" />
      <span className="welcome-cover__corner welcome-cover__corner--br" />
    </div>
  );
}
