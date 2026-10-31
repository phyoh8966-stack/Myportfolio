import { Heart } from 'lucide-react';

export default function LoveStory({ story }) {
  return (
    <section className="section story-section" id="story">
      <div className="section-heading reveal">
        <p className="eyebrow">The story so far</p>
        <h2>A little bit of us</h2>
        <p>Three little moments in a story we’re still writing.</p>
      </div>
      <div className="story-timeline">
        {story.map((moment, index) => (
          <article className={`story-moment reveal${index % 2 ? ' story-moment--reverse' : ''}`} key={moment.title}>
            <div className="story-moment__image-wrap">
              <img src={moment.image} alt="" loading="lazy" />
            </div>
            <div className="story-moment__copy">
              <span className="story-moment__marker" aria-hidden="true">
                <Heart size={15} fill="currentColor" />
              </span>
              <p className="eyebrow">{moment.date}</p>
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
