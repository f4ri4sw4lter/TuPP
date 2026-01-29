<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Recuperación de contraseña</title>
    <style>
        body { font-family: Arial, Helvetica, sans-serif; background:#f6f9fc; color:#333; }
        .container { max-width:600px; margin:24px auto; background:#fff; padding:24px; border-radius:8px; box-shadow:0 4px 14px rgba(0,0,0,0.08);} 
        h1 { font-size:18px; margin-bottom:8px; }
        p { margin:8px 0; }
        .token { display:inline-block; font-weight:700; background:#f1f5f9; padding:8px 12px; border-radius:6px; letter-spacing:2px; font-size:18px; }
        .footer { margin-top:18px; font-size:12px; color:#666; }
        .btn { display:inline-block; margin-top:12px; padding:10px 14px; background:#558fc9; color:#fff; text-decoration:none; border-radius:6px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Recuperación de contraseña</h1>
        <p>Hola {{ $name }},</p>
        <p>Hemos recibido una solicitud para recuperar la contraseña de tu cuenta. Para mayor seguridad, hemos cambiado temporalmente tu contraseña por un token de acceso. Usa el siguiente token para iniciar sesión y luego cambia tu contraseña desde la aplicación.</p>
        <p class="token">{{ $token }}</p>
        <p>Si no solicitaste este cambio, por favor contacta con el soporte o ignora este correo.</p>
        <p class="footer">Este token expira en 60 minutos. Si no puedes iniciar sesión, solicita una nueva recuperación.</p>
    </div>
</body>
</html>
