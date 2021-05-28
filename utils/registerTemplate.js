const registerTemplate = ({ name, lastname, verificationCode }) => `
  <html>
  <head></head>
  <body>
<h3>¡Hola ${name} ${lastname}. Garacias por registrarte!</h3>
      <a href="http://localhost:8080/api/auth/verificationCode/${verificationCode}">Click aqui para confirmar tu registro!</a>    
       
      
  </body>
  </html>
    `;
module.exports = { registerTemplate };
