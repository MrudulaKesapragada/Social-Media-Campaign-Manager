document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENT SELECTION ---
    const API_URL = 'http://localhost:3000/api/campaigns';
    const createCampaignBtn = document.getElementById('create-campaign-btn');
    const modalOverlay = document.getElementById('campaign-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const campaignForm = document.getElementById('campaign-form');
    const campaignListBody = document.getElementById('campaign-list-body');
    const navLinks = document.querySelectorAll('aside nav a');
    const views = document.querySelectorAll('.view-section');
    const statCards = document.querySelectorAll('.stats-cards .card');

    // --- MODAL HANDLING ---
    createCampaignBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'flex';
    });
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });

    // --- API & DOM RENDERING ---
    function addCampaignToDOM(campaign) {
        const tableRow = document.createElement('tr');
        tableRow.setAttribute('data-id', campaign._id);
        const formattedDate = new Date(campaign.scheduleDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
        const status = new Date(campaign.scheduleDate) > new Date() ? 'Scheduled' : 'Published';
        const statusClass = status.toLowerCase();
        tableRow.innerHTML = `
            <td>${campaign.name}</td>
            <td>${campaign.platform}</td>
            <td>${formattedDate}</td>
            <td><span class="status ${statusClass}">${status}</span></td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        campaignListBody.appendChild(tableRow);
    }

    async function loadCampaigns() {
        try {
            const response = await fetch(API_URL);
            const campaigns = await response.json();
            campaignListBody.innerHTML = '';
            campaigns.forEach(addCampaignToDOM);
        } catch (error) {
            console.error('Error loading campaigns:', error);
        }
    }

    campaignForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const campaignData = {
            name: document.getElementById('campaign-name').value,
            platform: document.getElementById('platform').value,
            content: document.getElementById('campaign-content').value,
            scheduleDate: document.getElementById('schedule-date').value
        };
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(campaignData)
            });
            const newCampaign = await response.json();
            addCampaignToDOM(newCampaign);
            campaignForm.reset();
            modalOverlay.style.display = 'none';
        } catch (error) {
            console.error('Error creating campaign:', error);
        }
    });

    campaignListBody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const row = e.target.closest('tr');
            const campaignId = row.getAttribute('data-id');
            try {
                await fetch(`${API_URL}/${campaignId}`, { method: 'DELETE' });
                row.remove();
            } catch (error) {
                console.error('Error deleting campaign:', error);
            }
        }
    });

    // --- NAVIGATION LOGIC ---
    function switchView(targetViewId, targetLinkId) {
        if (targetViewId && targetLinkId) {
            navLinks.forEach(item => item.classList.remove('active'));
            views.forEach(view => view.classList.remove('active-view'));
            document.getElementById(targetViewId).classList.add('active-view');
            document.getElementById(targetLinkId).classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetViewId = link.id.replace('nav-', '') + '-view';
            const targetLinkId = link.id;
            switchView(targetViewId, targetLinkId);
        });
    });

    statCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardId = card.id;
            let targetViewId = '', targetLinkId = '';
            if (cardId.includes('campaigns') || cardId.includes('upcoming') || cardId.includes('completed')) {
                targetViewId = 'campaigns-view';
                targetLinkId = 'nav-campaigns';
            } else if (cardId.includes('engagement')) {
                targetViewId = 'analytics-view';
                targetLinkId = 'nav-analytics';
            }
            switchView(targetViewId, targetLinkId);
        });
    });

    // --- INITIAL LOAD ---
    loadCampaigns();
});