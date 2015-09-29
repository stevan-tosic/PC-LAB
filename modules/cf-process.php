<?php
$name    = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING));
$email   = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
$sub     = trim(filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING));
$content = trim(filter_input(INPUT_POST, 'content', FILTER_SANITIZE_STRING));
$sbt     = trim(filter_input(INPUT_POST, 'sbt', FILTER_SANITIZE_NUMBER_INT));

if(isset($name, $email, $content, $sbt)) {
   $setZone  = new DateTime("now", new DateTimeZone('Europe/Belgrade'));
   $date     = $setZone->format("d M Y");
   $time     = $setZone->format("H:i");
   $ip       = $_SERVER['REMOTE_ADDR'];

   $to       = 'toskadv@gmail.com';

   $subject  = isset($sub) ? $sub : 'Kontakt sa sajta.';

   $headers  = 'From: ' . ' <'. $email .'> ' . "\r\n";
   $headers .= 'Reply-To: ' . ' <'. $email .'> ' . "\r\n";
   $headers .= 'MIME-Version: 1.0' . "\r\n";
   $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

   $message  = '<html>
	              <body>
	                <table align="center" width="600" height="600" cellpadding="0" cellspacing="0" style="background: #fefefe; border: 4px solid #7bb5b3; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-family: Verdana, Geneva, sans-serif; font-size: 12px;">
	                  <tr>
	                    <td valign="top" width="600" height="100" colspan="3">
                          <img src="http://pclab.rs/images/mail-bg.png" alt="PC Lab" width="600" height="100" border="0">
	                    </td>
	                  </tr>
	                  <tr valign="top">
	                    <th align="left" valign="top" height="15" width="100" style="padding: 10px;">Ime :</th>
	                    <td align="left" valign="top" height="15" colspan="2" style="padding: 10px;">' . $name . '</td>
	                  </tr>
	                  <tr valign="top">
	                    <th align="left" valign="top" height="15" width="100" style="padding: 10px;">E-mail :</th>
	                    <td align="left" valign="top" height="15" colspan="2" style="padding: 10px;">' . $email . '</td>
	                  </tr>
                      <tr valign="top">
	                    <th align="left" valign="top" height="15" width="100" style="padding: 10px;">Naslov :</th>
	                    <td align="left" valign="top" height="15" colspan="2" style="padding: 10px;">' . $subject . '</td>
	                  </tr>
	                  <tr valign="top">
	                    <th align="left" valign="top" width="100" height="350" style="padding: 10px; vertical-align: top;">Poruka :</th>
	                    <td align="left" valign="top" width="350" height="350" colspan="2" style="padding: 10px;">' . $content . '</td>
	                  </tr>
	                  <tr>
	                    <td align="center" valign="middle" width="150" height="20" style="border-right: 1px solid #7bb5b3; border-top: 1px solid #7bb5b3; padding: 10px;">Date: ' . $date . '</td>
	                    <td align="center" valign="middle" width="150" height="20" style="border-right: 1px solid #7bb5b3; border-top: 1px solid #7bb5b3; padding: 10px;">Time: ' . $time . ' h </td>
	                    <td align="center" valign="middle" width="300" height="20" style="border-top: 1px solid #7bb5b3; padding: 10px;">IP address: ' . $ip . '</td>
	                 </tr>
                   </table>
	             </body>
               </html>';

   if(mail($to, $subject, $message, $headers)) {
      echo 'Vaša poruka je poslata';
   }
   else {
      echo 'Došlo je do greške prilikom slanja poruke, <br> pokušajte ponovo.';
   }
}
?>