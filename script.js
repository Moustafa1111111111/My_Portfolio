function showSection(sectionId) {
    // Hide all sections
    let sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}
