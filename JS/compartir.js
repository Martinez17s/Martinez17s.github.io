// Function to retrieve favorite quotes from local storage
function getFavoriteQuotes() {
    const favoritesData = localStorage.getItem('favoritos');
    // Return parsed favorites data or an empty array if no data exists
    return favoritesData ? JSON.parse(favoritesData) : [];
}
// Function to format favorite quotes for email
function formatFavoriteQuotesForEmail(favorites) {
    let formattedData = '';
    favorites.forEach(quote => {
        formattedData += `Nombre: ${quote.nombre}\n`;
        formattedData += `Fecha: ${quote.fecha}\n`;
        formattedData += `Compra: ${quote.compra}\n`;
        formattedData += `Venta: ${quote.venta}\n`;
        formattedData += '---\n';
    });
    return formattedData;
}
// Event listener for form submission
document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        // Get favorite quotes and format them for email
        const favoriteQuotes = getFavoriteQuotes();
        const formattedQuotes = formatFavoriteQuotesForEmail(favoriteQuotes);
        // Set the formatted quotes as the value of a hidden input field
        document.getElementById('user_quotes').value = formattedQuotes
        // Update button text to indicate sending
        btn.value = 'Sending...';
        // Email service and template IDs
        const serviceID = 'default_service';//
        const templateID = 'template_zhqn7oi';
        // Send email using emailjs library
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                // Reset button text and show success alert
                btn.value = 'Send Email';
                alert('Sent!');
            }, (err) => {
                // Reset button text and show error alert
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
    });
// Get the button element
const btn = document.getElementById('button');

// Function to show an email popup
function showPopup() {
    document.getElementById('emailPopup').style.display = 'block';
}

// Function to close the email popup
function closePopup() {
    document.getElementById('emailPopup').style.display = 'none';
}

// Event listener to show the email popup when a share button is clicked
document.getElementById('share-btn').addEventListener('click', showPopup);