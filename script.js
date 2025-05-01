document.addEventListener("DOMContentLoaded", function () {
    // Initialize sliders
    document.querySelectorAll(".slider-container").forEach(slider => {
        let images = slider.querySelectorAll("img");
        if (images.length > 0) {
            images.forEach(img => img.style.display = "none"); // Hide all images
            images[0].style.display = "block"; // Show first image
        }
    });

    // Add event listeners to "View Details" buttons
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const projectId = this.closest('.project').getAttribute('onclick').split("'")[1];
            openProjectDetails(projectId);
            event.stopPropagation(); // Prevent project card click
        });
    });
});

function showSection(sectionId) {
    document.querySelectorAll('.content').forEach(section => {
        section.style.display = 'none';
    });

    let targetSection = document.getElementById(sectionId);
    targetSection.style.display = 'block';

    // Ensure scrolling works even if section was hidden
    targetSection.scrollIntoView({ behavior: 'smooth' });
}


// Function to move the slider
function moveSlide(direction, sliderId, event) {
    let slider = document.getElementById(sliderId);
    let images = slider.querySelectorAll("img");
    let totalImages = images.length;

    let currentIndex = Array.from(images).findIndex(img => img.style.display === "block");

    // Hide all images
    images.forEach(img => img.style.display = "none");

    // Calculate new index
    let newIndex = (currentIndex + direction + totalImages) % totalImages;
    images[newIndex].style.display = "block";

    if (event) {
        event.stopPropagation(); // Prevent project click when using slider buttons
    }
}

function scrollToSection(sectionId) {
    let section = document.getElementById(sectionId);

    if (section) {
        console.log(`Scrolling to ${sectionId}`);
        section.style.display = "block";
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.log(`Section ${sectionId} not found!`);
    }
}

function openProjectDetails(projectId) {
    const overlay = document.getElementById('project-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const project = getProjectData(projectId); // Function to fetch project data

    if (project) {
        modalTitle.textContent = project.title;
        modalContent.innerHTML = `
            <p>${project.summary}</p>
            <div class="modal-images">
                ${project.images.map(image => `<img src="images/${image}" alt="${project.title} Image">`).join('')}
            </div>
            <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
            <p><a href="${project.codeLink}" target="_blank">View Code on Kaggle</a></p>
        `;
        overlay.style.display = 'block';
    }
}

function closeProjectDetails() {
    const overlay = document.getElementById('project-overlay');
    overlay.style.display = 'none';
}

function getProjectData(projectId) {
    // In a real application, this data would likely come from an array or an API.
    // For this example, we'll hardcode the data.
    const projectsData = {
        'titanic': {
            title: 'Sales Forecasting & Optimization',
            summary: 'My project focuses on sales forecasting and optimization, where we predict future sales trends using data-driven models and optimize inventory and pricing strategies to maximize revenue. This helps businesses make smarter, proactive decisions based on accurate forecasts.',
            images: ['sales_forecasting/dashboard1.png','sales_forecasting/dashboard2.png','sales_forecasting/dashboard3.png','sales_forecasting/dashboard4.png'], // Use larger images
            technologies: ['Python', 'Pandas','Seaborn','Plotly', 'Scikit-learn','Prophet','ARIMA','SARIMA'],
            codeLink: 'https://www.kaggle.com/code/moustafabasheer/depi-graduation-project'
        },
        'diabetes': {
            title: 'Diabetes Classification',
            summary: 'Developed a classification model to predict the likelihood of diabetes based on various health parameters. Focused on data preprocessing, feature selection, and training a robust classification model.',
            images: ['diabetes/dashboard.png'], // Use larger images
            technologies: ['Python', 'Pandas', 'Scikit-learn', 'Classification'],
            codeLink: 'https://www.kaggle.com/code/moustafabasheer/diabetes-prediction-model'
        },
        'salary': {
            title: 'Customer Churn Analysis',
            summary: 'In this project, I perform Customer Chain Analysis to study the entire customer journey, identify key touchpoints, and uncover opportunities to enhance satisfaction and drive better business outcomes.',
            images: ['customer_chain/dashboard.png'], // Use larger images
            technologies: ['Python', 'Pandas','Seaborn','Plotly', 'Scikit-learn'],
            codeLink: 'https://www.kaggle.com/code/moustafabasheer/customer-churn-analysis'
        },
        'boston': {
            title: 'Netflix Analysis',
            summary: 'In this project, I analyze the Netflix dataset, which contains detailed information about movies and TV shows available on the platform. The goal is to explore trends, content types, and key patterns to better understand Netflix’s offerings.',
            images: ['netflix/dashboard.png'], // Use larger images
            technologies: ['Python', 'Pandas','Seaborn','Poltly', 'Scikit-learn'],
            codeLink: 'https://www.kaggle.com/code/moustafabasheer/netflix-dataset-analysis'
        },
        'cancer': {
            title: 'Heart Failure Analysis',
            summary: 'In my project, I analyzed patient health data to uncover key factors linked to heart failure. Through detailed data exploration and modeling, I aimed to enhance early detection and risk assessment.',
            images: ['heart_failure/dashboard.png'], // Use larger images
            technologies: ['Python', 'Pandas', 'Scikit-learn', 'Classification'],
            codeLink: 'https://www.kaggle.com/code/moustafabasheer/heart-failure-prediction'
        }
        // Add data for other projects here with larger image filenames and summaries
    };
    return projectsData[projectId];
}

// Prevent slider buttons from triggering the project open function
const sliderButtons = document.querySelectorAll('.project .slider button');
sliderButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

// Modify the project article onclick to only trigger if the view details button wasn't clicked
const projectArticles = document.querySelectorAll('.project');
projectArticles.forEach(article => {
    const viewDetailsButton = article.querySelector('.view-details-btn');
    article.addEventListener('click', function() {
        if (!viewDetailsButton || !viewDetailsButton.matches(':hover')) {
            const projectId = this.getAttribute('onclick').split("'")[1];
            openProjectDetails(projectId);
        }
    });
});