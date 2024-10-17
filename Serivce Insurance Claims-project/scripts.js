// Show and hide sections
const fileClaimBtn = document.getElementById('fileClaimBtn');
const trackClaimsBtn = document.getElementById('trackClaimsBtn');
const chatbotBtn = document.getElementById('chatbotBtn');
const knowledgeBaseBtn = document.getElementById('knowledgeBaseBtn');

const claimFormSection = document.getElementById('claimFormSection');
const chatbotSection = document.getElementById('chatbotSection');
const knowledgeBaseSection = document.getElementById('knowledgeBaseSection');
const recentClaimsSection = document.getElementById('recentClaimsSection');

// Initialize an array to store claims
let claims = [
    { claimNumber: 'CLM001', status: 'In Review', dateSubmitted: '09/05/2024' },
    { claimNumber: 'CLM002', status: 'Approved', dateSubmitted: '08/25/2024' }
];

// Function to update the claims table
function updateClaimsTable() {
    const claimsTable = document.getElementById('claimsTable');
    claimsTable.innerHTML = ''; // Clear previous entries

    claims.forEach(claim => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${claim.claimNumber}</td>
            <td>${claim.status}</td>
            <td>${claim.dateSubmitted}</td>
        `;
        claimsTable.appendChild(row);
    });
}

// Event listeners for showing/hiding sections
fileClaimBtn.addEventListener('click', () => {
    claimFormSection.classList.toggle('hidden');
});

trackClaimsBtn.addEventListener('click', () => {
    recentClaimsSection.classList.toggle('hidden');
});

chatbotBtn.addEventListener('click', () => {
    chatbotSection.classList.toggle('hidden');
});

knowledgeBaseBtn.addEventListener('click', () => {
    knowledgeBaseSection.classList.toggle('hidden');
});

// Form handling
const claimForm = document.getElementById('claimForm');
const successMessage = document.getElementById('successMessage');

claimForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Form validation logic
    const policyNumber = document.getElementById('policyNumber').value;
    const incidentDate = document.getElementById('incidentDate').value;
    const incidentDescription = document.getElementById('incidentDescription').value;

    if (policyNumber && incidentDate && incidentDescription) {
        // Generate a unique claim number (simple increment)
        const claimNumber = `CLM00${claims.length + 1}`;
        
        // Create a new claim object
        const newClaim = {
            claimNumber,
            status: 'Submitted', // Initial status
            dateSubmitted: new Date(incidentDate).toLocaleDateString() // Format date
        };

        // Add the new claim to the claims array
        claims.push(newClaim);

        // Update the claims table
        updateClaimsTable();

        // Show success message
        successMessage.classList.remove('hidden');
        claimForm.reset(); // Reset form
    } else {
        alert('Please fill in all required fields.');
    }
});

// Chatbot integration (mockup)
document.getElementById('sendQuestion').addEventListener('click', () => {
    const userQuestion = document.getElementById('userQuestion').value;
    const chatbotResponse = document.getElementById('chatbotResponse');

    if (userQuestion.toLowerCase().includes('claim')) {
        chatbotResponse.textContent = 'Please click on the "Submit a Claim" button.';
    } else if (userQuestion.toLowerCase().includes('status')) {
        chatbotResponse.textContent = 'Please track your claim using the dashboard.';
    } else {
        chatbotResponse.textContent = 'I am here to help! Please ask your question.';
    }
});

// Knowledge base search (mockup)
document.getElementById('searchQuery').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const searchResults = document.getElementById('searchResults');

    searchResults.innerHTML = ''; // Clear previous results

    const sampleArticles = [
        'How to File a Claim',
        'Understanding Your Insurance Policy',
        'Common Claim Questions'
    ];

    sampleArticles.forEach(article => {
        if (article.toLowerCase().includes(query)) {
            const li = document.createElement('li');
            li.textContent = article;
            searchResults.appendChild(li);
        }
    });
});

// Initial table update
updateClaimsTable();
