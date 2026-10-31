import { Flower2 } from 'lucide-react';

export default function Invitation({ data }) {
  return (
    <section className="section invitation-section" id="invitation">
      <div className="invitation-card reveal">
        <span className="invitation-card__corner invitation-card__corner--tl" />
        <span className="invitation-card__corner invitation-card__corner--tr" />
        <span className="invitation-card__corner invitation-card__corner--bl" />
        <span className="invitation-card__corner invitation-card__corner--br" />
        <Flower2 className="invitation-card__flower" size={25} strokeWidth={1} />
        <p className="eyebrow">{data.invitation.eyebrow}</p>
        <p className="invitation-card__message">{data.invitation.message}</p>
        <p className="invitation-card__burmese" lang="my">
          {data.invitation.burmese}
        </p>
        <div className="invitation-card__families">
          <div>
            <p className="eyebrow">Together with the family of</p>
            <h3>{data.bride.name}</h3>
            <p>
              {data.bride.parents[0]} <span>&amp;</span> {data.bride.parents[1]}
            </p>
          </div>
          <span className="invitation-card__ampersand" aria-hidden="true">
            &amp;
          </span>
          <div>
            <p className="eyebrow">And the family of</p>
            <h3>{data.groom.name}</h3>
            <p>
              {data.groom.parents[0]} <span>&amp;</span> {data.groom.parents[1]}
            </p>
          </div>
        </div>
        <p className="invitation-card__date">{data.date.display}</p>
        <p className="invitation-card__closing">{data.invitation.closing}</p>
      </div>
    </section>
  );
}
