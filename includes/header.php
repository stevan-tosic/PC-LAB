<!doctype html>

<html lang="sr">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="author" content="M Design & Development">
  
  <title></title>

  <link rel="author" href="http://mdesdev.net">
  <link rel="shortcut icon" href="images/favicon.ico">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/jquery-ui-1.11.4.css">
  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Lato:300,400,700">

  <!--[if IE 9]>
    <script src="js/html5.js"></script>
    <link rel="stylesheet" href="css/style_ie9.css">
  <![endif]-->

</head>

<body spellcheck="false">

  <div id="content">

    <header>
  
      <div class="wrapper header">
  
        <a href="index.php" class="logo"><strong>PC</strong> lab</a>
  
      </div>

      <nav id="main-nav" class="nav-default">
        <span class="nav-switch"></span>
        <ul class="main-ul">
          <li <?php if(basename($_SERVER['SCRIPT_FILENAME']) == 'index.php') echo 'class="active"'; ?>><a href="index.php">POČETNA</a></li>
          <li <?php if(basename($_SERVER['SCRIPT_FILENAME']) == 'about.php') echo 'class="active"'; ?>><a href="about.php">O NAMA</a></li>
          <li <?php if(basename($_SERVER['SCRIPT_FILENAME']) == 'services.php') echo 'class="active"'; ?>><a href="services.php">USLUGE</a>
            <div class="ul-wrapper s-center">
              <ul class="submenu">
                <li><a href="diagnostics.php">DIJAGNOSTIKA</a></li>
                <li><a href="os.php">INSTALACIJA OPERATIVNIH SISTEMA</a></li>
                <li><a href="repair.php">POPRAVKA SISTEMSKIH FAJLOVA</a></li>
                <li><a href="maintenance.php">ODRŽAVANJE RAČUNARSKIH SISTEMA</a></li>
                <li><a href="optimization.php">OPTIMIZACIJA SISTEMA ZA GEJMING</a></li>
                <li><a href="configurations.php">SASTAVLJANJE PC KONFIGURACIJA</a></li>
              </ul>
            </div>
          </li>
          <li <?php if(basename($_SERVER['SCRIPT_FILENAME']) == 'news.php') echo 'class="active"'; ?>><a href="news.php">NOVOSTI</a></li>
          <li <?php if(basename($_SERVER['SCRIPT_FILENAME']) == 'contact.php') echo 'class="active"'; ?>><a href="contact.php">KONTAKT</a></li>
          <li <?php if(basename($_SERVER['SCRIPT_FILENAME']) == 'faq.php') echo 'class="active"'; ?>><a href="faq.php">FAQ</a></li>
          <li class="social">
            <span><a href="https://www.facebook.com/pclab011" target="_blank" class="facebook" data-tooltip="Facebook"></a></span>
            <span><a href="#" target="_blank" class="twitter" data-tooltip="Twitter"></a></span>
            <span><a href="#" target="_blank" class="google" data-tooltip="Google+"></a></span>
            <span><a href="#" target="_blank" class="youtube" data-tooltip="YouTube"></a></span>
            <span><a href="#" target="_blank" class="vimeo" data-tooltip="Vimeo"></a></span>
            <span><a href="#" target="_blank" class="instagram" data-tooltip="Instagram"></a></span>
            <span><a href="#" target="_blank" class="pinterest" data-tooltip="Pinterest"></a></span>
          </li>
        </ul>
      </nav>
  
    </header>