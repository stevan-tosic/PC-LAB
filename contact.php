<?php @require_once 'includes/header.php'; ?>

    <section class="section-main single">
      <div class="wrapper">

        <h1 class="single-title">Kontakt</h1>

        <div id="map-canvas"></div>

        <section class="box-set contact-data">

          <div class="box box-5-10">
            <h3>Kontakt informacije</h3>

            <span class="c-label">Telefoni:</span>
            <span class="c-data">011/0000-000</span>
            <span class="c-label">&nbsp;</span>
            <span class="c-data">069/401-22-88</span>
            <span class="c-label">E-mail:</span>
            <span class="c-data"><a href="mailto:pclab011@gmail.com">pclab011@gmail.com</a></span>
            <span class="c-label">Skype:</span>
            <span class="c-data">pclab011</span>
          </div>
  
          <div class="box box-5-10 cf-box">
            <h3>Pošalji poruku</h3>

            <span class="c-loading"></span>
            <span class="c-success"></span>
            <span class="c-error"></span>

            <form class="contact-form single-cf">
              <div class="c-input-wrapper r">
                <input class="c-text c-input req" type="text" name="name" maxlength="32" placeholder="Ime" data-error="Niste upisali ime">
              </div>
              <div class="c-input-wrapper r">
                <input class="c-text c-input req" type="text" name="email" maxlength="60" placeholder="E-mail" data-error="Niste upisali e-mail adresu">
              </div>
              <div class="c-input-wrapper">
                <input class="c-text c-input" type="text" name="subject" maxlength="100" placeholder="Naslov">
              </div>
              <div class="c-input-wrapper r">
                <span class="c-counter"></span>
                <textarea class="c-input req" name="content" maxlength="500" placeholder="Poruka" data-error="Niste upisali poruku"></textarea>
              </div>
              <input class="c-submit" type="submit" name="submit" value="Pošalji">
            </form>
          </div>

        </section>

      </div>
    </section>


<?php @require_once 'includes/footer.php'; ?>