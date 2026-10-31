import { ArrowUpRight, MapPin } from 'lucide-react';

export default function Location({ venue }) {
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(venue.address)}&output=embed`;

  return (
    <section className="location-section" id="location">
      <div className="location-section__map">
        <iframe
          title={`Map showing ${venue.name}`}
          src={mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="location-card reveal">
        <span className="detail-card__icon">
          <MapPin size={21} strokeWidth={1.5} />
        </span>
        <p className="eyebrow">Meet us here</p>
        <h2>{venue.name}</h2>
        <p className="location-card__address">{venue.address}</p>
        <a
          className="button button--sage"
          href={venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
        >
          Get directions <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
