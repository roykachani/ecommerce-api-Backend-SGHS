const purchasesTemplate = ({
  name,
  lastname,
  idOperation,
  total,
  products,
  id,
}) => `
  <html>
  <head></head>
  <body>
<h2>¡Hola ${name} ${lastname}. Garacias por tu compra!</h3>
<h3>Tu tickect de operacion es: ${idOperation}</h3>
      <a href="http://localhost:8080/api/purchase/${id}">Click aqui para ver el estado de tu compra!</a>    
      
      
  </body>
  </html>
    `;
module.exports = { purchasesTemplate };
