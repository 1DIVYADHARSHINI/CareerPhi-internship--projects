// Temporary job data
const jobs = [
    { id: 1, title: "frontend Developer", type: "Full-time", location: "chennai" },
    { id: 2, title: "backend Developer", type: "Part-time", location: "salem" },
    { id: 3, title: "software Developer", type: "part-time", location: "coimbatore" },
    { id: 4, title: "web developer", type: "Full-time", location: "madurai" },
    { id: 5, title: "full Stack Developer", type: "Full-time", location: "bangalore" },
];
let favorites = [];

// Function to display jobs based on filters
function displayJobs(filteredJobs) {
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = '';

    filteredJobs.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.classList.add('job-item');
        jobItem.innerHTML = `
            <h3>${job.title}</h3>
            <p>Type: ${job.type}</p>
            <p class="location">Location: ${job.location}</p>
            <button onclick="saveJob(${job.id})">Save</button>
        `;
        jobList.appendChild(jobItem);
    });
}

// Function to filter and search jobs
function searchJobs() {
    const keyword = document.getElementById('keyword').value.toLowerCase();
    const jobType = document.getElementById('jobType').value;
    const location = document.getElementById('location').value;

    const filteredJobs = jobs.filter(job => {
        return (
            (job.title.toLowerCase().includes(keyword) || keyword === '') &&
            (job.type === jobType || jobType === '') &&
            (job.location === location || location === '')
        );
    });

    displayJobs(filteredJobs);
}

// Function to save favorite jobs
function saveJob(id) {
    const job = jobs.find(job => job.id === id);
    if (!favorites.includes(job)) {
        favorites.push(job);
        displayFavorites();
    }
}

// Function to display saved favorite jobs
function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '<h2>Saved Jobs</h2>';

    favorites.forEach(favorite => {
        const favItem = document.createElement('div');
        favItem.classList.add('job-item');
        favItem.innerHTML = `
            <h3>${favorite.title}</h3>
            <p>Type: ${favorite.type}</p>
            <p class="location">Location: ${favorite.location}</p>
        `;
        favoritesList.appendChild(favItem);
    });
}

// Attach search function to button
document.getElementById('searchBtn').addEventListener('click', searchJobs);

// Display all jobs initially
displayJobs(jobs);
