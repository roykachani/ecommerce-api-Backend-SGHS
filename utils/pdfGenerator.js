const pdf = require('html-pdf');

const createTickets = (name, total, products) => {
	const html = generateHTML(products, total, name);
	pdf.create(html).toFile(`./tickets/${name}.pdf`, (err, res) => {
		if (err) throw new Error('No se pudo crear el archivo pdf');
	});
};

const generateHTML = (name, total, products) =>
	`<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
</head>
    <h2>Ticket de compra</h2>
    <h5>${name}</h5>
    
     
    <h2>${total}</h2>
</html>
`;

module.exports = { createTickets };
