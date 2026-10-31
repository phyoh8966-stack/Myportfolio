import { useState } from 'react';
import { Check, Copy, QrCode, Share2, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function ShareInvitation({ names }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');
  const invitationUrl = typeof window !== 'undefined' ? window.location.href : '';

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopied(true);
      setMessage('Invitation link copied.');
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setMessage('Could not copy the link. Please copy it from your browser address bar.');
    }
  }

  async function shareLink() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${names.bride.name} & ${names.groom.name} — Wedding Invitation`,
          text: 'We would love for you to celebrate with us.',
          url: invitationUrl,
        });
        setMessage('Invitation shared.');
      } catch (error) {
        if (error.name !== 'AbortError') setMessage('The invitation could not be shared.');
      }
      return;
    }
    await copyLink();
  }

  return (
    <>
      <button className="share-trigger" type="button" onClick={() => setIsOpen(true)}>
        Share the invitation <Share2 size={15} />
      </button>
      {isOpen && (
        <div
          className="share-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div className="share-modal__card">
            <button
              className="share-modal__close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close share dialog"
            >
              <X size={19} />
            </button>
            <span className="detail-card__icon">
              <QrCode size={20} />
            </span>
            <p className="eyebrow">A little something to share</p>
            <h2 id="share-title">Pass the love along</h2>
            <p>Scan the code or share the invitation with someone special.</p>
            <div className="share-modal__qr">
              <QRCodeSVG value={invitationUrl} size={180} level="H" includeMargin />
            </div>
            <div className="share-modal__actions">
              <button className="button button--sage" type="button" onClick={copyLink}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy link'}
              </button>
              <button className="button button--outline" type="button" onClick={shareLink}>
                <Share2 size={15} /> Share
              </button>
            </div>
            {message && <p className="share-modal__message" role="status">{message}</p>}
          </div>
        </div>
      )}
    </>
  );
}
