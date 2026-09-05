// =====================================================
// CENTORO - API CONFIGURATION
// =====================================================

const API_CONFIG = {
    BASE_URL: 'http://localhost:8080/api',
    AUTH_TOKEN_KEY: 'centoro_portal_token',
    USER_KEY: 'centoro_portal_user'
};

const ApiService = {
    getToken() {
        return localStorage.getItem(API_CONFIG.AUTH_TOKEN_KEY);
    },

    setToken(token) {
        localStorage.setItem(API_CONFIG.AUTH_TOKEN_KEY, token);
    },

    getUser() {
        const user = localStorage.getItem(API_CONFIG.USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    setUser(user) {
        localStorage.setItem(API_CONFIG.USER_KEY, JSON.stringify(user));
    },

    logout() {
        localStorage.removeItem(API_CONFIG.AUTH_TOKEN_KEY);
        localStorage.removeItem(API_CONFIG.USER_KEY);
        window.location.href = 'portal.html';
    },

    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }
        return headers;
    },

    async request(endpoint, method = 'GET', body = null) {
        const url = API_CONFIG.BASE_URL + endpoint;
        const options = {
            method: method,
            headers: this.getHeaders()
        };
        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 401) {
                    this.logout();
                }
                throw new Error(data.message || 'Request failed');
            }
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // =============================================
    // AUTH
    // =============================================
    login(username, password) {
        return this.request('/auth/login', 'POST', { username, password });
    },

    register(name, username, email, password) {
        return this.request('/auth/register', 'POST', { name, username, email, password });
    },

    // =============================================
    // CLIENTS
    // =============================================
    getClients() {
        return this.request('/clients');
    },

    getClient(id) {
        return this.request('/clients/' + id);
    },

    createClient(client) {
        return this.request('/clients', 'POST', client);
    },

    updateClient(id, client) {
        return this.request('/clients/' + id, 'PUT', client);
    },

    deleteClient(id) {
        return this.request('/clients/' + id, 'DELETE');
    },

    // =============================================
    // STAFF
    // =============================================
    getStaff() {
        return this.request('/staff');
    },

    getStaffMember(id) {
        return this.request('/staff/' + id);
    },

    createStaff(staff) {
        return this.request('/staff', 'POST', staff);
    },

    updateStaff(id, staff) {
        return this.request('/staff/' + id, 'PUT', staff);
    },

    deleteStaff(id) {
        return this.request('/staff/' + id, 'DELETE');
    },

    // =============================================
    // PROJECTS
    // =============================================
    getProjects() {
        return this.request('/projects');
    },

    getProject(id) {
        return this.request('/projects/' + id);
    },

    createProject(project) {
        return this.request('/projects', 'POST', project);
    },

    updateProject(id, project) {
        return this.request('/projects/' + id, 'PUT', project);
    },

    deleteProject(id) {
        return this.request('/projects/' + id, 'DELETE');
    },

    // =============================================
    // INVOICES
    // =============================================
    getInvoices() {
        return this.request('/invoices');
    },

    getInvoice(id) {
        return this.request('/invoices/' + id);
    },

    createInvoice(invoice) {
        return this.request('/invoices', 'POST', invoice);
    },

    recordPayment(invoiceId, payment) {
        return this.request('/invoices/' + invoiceId + '/payment', 'POST', payment);
    },

    deleteInvoice(id) {
        return this.request('/invoices/' + id, 'DELETE');
    },

    // =============================================
    // JOB CARDS
    // =============================================
    getJobCards() {
        return this.request('/jobcards');
    },

    getJobCard(id) {
        return this.request('/jobcards/' + id);
    },

    createJobCard(jobCard) {
        return this.request('/jobcards', 'POST', jobCard);
    },

    updateJobCard(id, jobCard) {
        return this.request('/jobcards/' + id, 'PUT', jobCard);
    },

    deleteJobCard(id) {
        return this.request('/jobcards/' + id, 'DELETE');
    },

    // =============================================
    // VOUCHERS
    // =============================================
    getVouchers() {
        return this.request('/vouchers');
    },

    getVoucher(id) {
        return this.request('/vouchers/' + id);
    },

    createVoucher(voucher) {
        return this.request('/vouchers', 'POST', voucher);
    },

    redeemVoucher(id) {
        return this.request('/vouchers/' + id + '/redeem', 'POST');
    },

    deleteVoucher(id) {
        return this.request('/vouchers/' + id, 'DELETE');
    },

    // =============================================
    // MUSIC
    // =============================================
    getTracks() {
        return this.request('/music/tracks');
    },

    getPacks() {
        return this.request('/music/packs');
    },

    getSamples() {
        return this.request('/music/samples');
    },

    createTrack(track) {
        return this.request('/music/tracks', 'POST', track);
    },

    createPack(pack) {
        return this.request('/music/packs', 'POST', pack);
    },

    createSample(sample) {
        return this.request('/music/samples', 'POST', sample);
    },

    // =============================================
    // DASHBOARD
    // =============================================
    getDashboardStats() {
        return this.request('/dashboard/stats');
    },

    // =============================================
    // WEBSITE PAGES (NEW - For Website Builder)
    // =============================================
    getWebsitePages() {
        return this.request('/website/pages');
    },

    getWebsitePage(id) {
        return this.request('/website/pages/' + id);
    },

    createWebsitePage(page) {
        return this.request('/website/pages', 'POST', page);
    },

    updateWebsitePage(id, page) {
        return this.request('/website/pages/' + id, 'PUT', page);
    },

    publishWebsitePage(id) {
        return this.request('/website/pages/' + id + '/publish', 'POST');
    },

    deleteWebsitePage(id) {
        return this.request('/website/pages/' + id, 'DELETE');
    },

    // =============================================
    // CONTENT (NEW - For Music/Images/Videos)
    // =============================================
    getAllContent() {
        return this.request('/content');
    },

    getContentByType(type) {
        return this.request('/content/' + type);
    },

    getFeaturedContent() {
        return this.request('/content/featured');
    },

    uploadMusic(file, metadata) {
        const formData = new FormData();
        formData.append('file', file);
        if (metadata) {
            Object.keys(metadata).forEach(key => {
                formData.append(key, metadata[key]);
            });
        }
        return this.upload('/content/music', formData);
    },

    uploadImage(file, title) {
        const formData = new FormData();
        formData.append('file', file);
        if (title) formData.append('title', title);
        return this.upload('/content/image', formData);
    },

    deleteContent(id) {
        return this.request('/content/' + id, 'DELETE');
    },

    // =============================================
    // CURRENCY & MARKETS (NEW)
    // =============================================
    getCurrencyRates() {
        return this.request('/currency/rates');
    },

    getTimeZones() {
        return this.request('/currency/timezones');
    },

    getMarketData() {
        return this.request('/markets/data');
    },

    getSeries() {
        return Promise.all([
            this.request('/series/friday'),
            this.request('/monthly-offers')
        ]).then(([friday, monthly]) => ({
            success: true,
            data: {
                fridayDrops: friday.data || [],
                monthlyOffers: monthly.data || []
            }
        }));
    },

    // =============================================
    // COMPANY SETTINGS (NEW)
    // =============================================
    getCompanySettings() {
        return this.request('/settings/company');
    },

    updateCompanySettings(settings) {
        return this.request('/settings/company', 'PUT', settings);
    },

    // =============================================
    // STAFF BONUSES & WARNINGS (NEW)
    // =============================================
    getStaffBonuses(staffId) {
        return staffId ? this.request('/staff/bonuses/staff/' + staffId) : this.request('/staff/bonuses');
    },

    createStaffBonus(bonus) {
        return this.request('/staff/bonuses', 'POST', bonus);
    },

    getStaffWarnings(staffId) {
        return staffId ? this.request('/staff/warnings/staff/' + staffId) : this.request('/staff/warnings');
    },

    createStaffWarning(warning) {
        return this.request('/staff/warnings', 'POST', warning);
    },

    // =============================================
    // QUOTES (NEW)
    // =============================================
    getQuotes() {
        return this.request('/quotes');
    },

    getQuotesByClient(clientId) {
        return this.request('/quotes/client/' + clientId);
    },

    createQuote(quote) {
        return this.request('/quotes', 'POST', quote);
    },

    updateQuote(id, quote) {
        return this.request('/quotes/' + id, 'PUT', quote);
    },

    deleteQuote(id) {
        return this.request('/quotes/' + id, 'DELETE');
    },

    // =============================================
    // FILE UPLOAD (Helper)
    // =============================================
    async upload(endpoint, formData) {
        const url = API_CONFIG.BASE_URL + endpoint;
        const token = this.getToken();

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Upload failed');
        }
        return data;
    }
};