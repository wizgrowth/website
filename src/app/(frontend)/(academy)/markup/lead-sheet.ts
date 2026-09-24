// Generated from design/academy/digital-marketing-course.html by design/academy/generate.mjs.
// The enquiry sheet every academy page's buttons open; rendered once by the layout.
export const LEAD_SHEET = `<dialog class="lead-sheet" id="academy-lead" aria-labelledby="academy-lead-title">
  <div class="lead-card">
    <aside class="lead-intro">
      <div>
        <div class="eyebrow">WIZGROWTH / ACADEMY</div>
        <h2>Start with<br><span>a hello.</span></h2>
        <p>No long application. Tell us who you are and what you are interested in.</p>
      </div>
      <div class="lead-mini">LIVE / MENTORED / KERALA<br>WE REPLY ON WHATSAPP</div>
    </aside>
    <div class="lead-form-wrap">
      <button class="lead-close" type="button" data-lead-close aria-label="Close enquiry form"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      <div class="lead-form-head">
        <div class="eyebrow">YOUR ENQUIRY</div>
        <h3 id="academy-lead-title">A few details. That’s it.</h3>
      </div>
      <form class="lead-form" id="academy-lead-form" novalidate>
        <div class="lead-field"><label for="lead-name">Your name</label><input id="lead-name" name="name" autocomplete="name" placeholder="Your name" required maxlength="100"></div>
        <div class="lead-field"><label for="lead-phone">WhatsApp number</label><input id="lead-phone" name="phone" autocomplete="tel" inputmode="tel" placeholder="+91 98765 43210" required maxlength="24"></div>
        <div class="lead-field full"><label for="lead-course">What are you interested in?</label><select id="lead-course" name="course"><option>Not sure yet</option><option>Digital Marketing Course with AI</option><option>Advanced Digital Marketing Mentorship</option><option>Digital Marketing for Business Owners</option></select></div>
        <div class="lead-field full"><label for="lead-note">Anything we should know? <span style="opacity:.55">Optional</span></label><textarea id="lead-note" name="note" maxlength="500" placeholder="Your background, goal, or a question..."></textarea></div>
        <div class="lead-error" id="lead-error" role="alert" aria-live="polite"></div>
        <button class="lead-submit" type="submit">Continue on WhatsApp <svg class="arrow" aria-hidden="true"><use href="#arrow-up"></use></svg></button>
        <p class="lead-note">This opens WhatsApp with your details filled in. Nothing is sent until you tap Send.</p>
      </form>
    </div>
  </div>
</dialog>`;
