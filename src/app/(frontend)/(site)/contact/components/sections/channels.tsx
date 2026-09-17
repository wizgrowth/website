import { CONTACT, WA_BOOK_CALL, WaIcon } from '@/components/wg';

export function Channels() {
  return (
    <section className="shell section-tight" aria-label="Contact channels">
      <div className="channel-grid">
        <div className="channel">
          <p className="microlabel green">Fastest</p>
          <h3>WhatsApp</h3>
          <p>
            Replies within business hours, usually much faster. Tell us what you’re working on and
            we’ll take it from there.
          </p>
          <a href={WA_BOOK_CALL} className="btn btn-wa">
            <WaIcon /> WhatsApp us
          </a>
        </div>
        <div className="channel">
          <p className="microlabel green">Direct</p>
          <h3>Call</h3>
          <p>
            Mon–Fri 9am–8pm, Sat–Sun 10am–5pm IST. If we miss you, we call back the same working
            day.
          </p>
          <a href={CONTACT.phoneHref} className="btn btn-primary">
            Call {CONTACT.phoneDisplay}
          </a>
        </div>
        <div className="channel">
          <p className="microlabel green">Written</p>
          <h3>Email</h3>
          <p>Best for briefs, RFPs and anything with attachments. We reply within one business day.</p>
          <a href={CONTACT.emailHref} className="btn btn-secondary">
            {CONTACT.email}
          </a>
        </div>
      </div>
    </section>
  );
}
