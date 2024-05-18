document.addEventListener('DOMContentLoaded', () => {
    const data = generateMockData(100); // Generate mock data for testing
    let currentPage = 1;
    const rowsPerPage = 10;
    let filteredData = data;

    const table = document.getElementById('data-table');
    const searchInput = document.getElementById('search-input');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    const idFilter = document.getElementById('id-filter');
    const nameFilter = document.getElementById('name-filter');
    const ageFilter = document.getElementById('age-filter');
    const emailFilter = document.getElementById('email-filter');

    // Function to generate mock data
    function generateMockData(size) {
        const mockData = [];
        for (let i = 1; i <= size; i++) {
            mockData.push({
                id: i,
                name: `Name ${i}`,
                age: Math.floor(Math.random() * 60) + 20,
                email: `name${i}@example.com`
            });
        }
        return mockData;
    }

    // Function to populate filter dropdowns
    function populateFilters(data) {
        const uniqueIds = [...new Set(data.map(row => row.id))];
        const uniqueNames = [...new Set(data.map(row => row.name))];
        const uniqueAges = [...new Set(data.map(row => row.age))];
        const uniqueEmails = [...new Set(data.map(row => row.email))];

        populateFilter(idFilter, uniqueIds);
        populateFilter(nameFilter, uniqueNames);
        populateFilter(ageFilter, uniqueAges);
        populateFilter(emailFilter, uniqueEmails);
    }

    // Helper function to populate individual filter
    function populateFilter(filterElement, uniqueValues) {
        uniqueValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            filterElement.appendChild(option);
        });
    }

    // Function to render table rows
    function renderTableRows(data) {
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.id}</td>
                <td>${row.name}</td>
                <td>${row.age}</td>
                <td>${row.email}</td>
            `;
            tbody.appendChild(tr);
        });

        pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(data.length / rowsPerPage)}`;

        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === Math.ceil(data.length / rowsPerPage);
    }

    // Function to sort table column
    function sortTable(column, order) {
        filteredData.sort((a, b) => {
            if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        renderTableRows(filteredData);
    }

    // Function to filter table rows based on search input and dropdown filters
    function filterTableRows() {
        const query = searchInput.value.toLowerCase();
        const idValue = idFilter.value;
        const nameValue = nameFilter.value.toLowerCase();
        const ageValue = ageFilter.value;
        const emailValue = emailFilter.value.toLowerCase();

        filteredData = data.filter(row =>
            (idValue === "" || row.id.toString() === idValue) &&
            (nameValue === "" || row.name.toLowerCase().includes(nameValue)) &&
            (ageValue === "" || row.age.toString() === ageValue) &&
            (emailValue === "" || row.email.toLowerCase().includes(emailValue)) &&
            (
                row.name.toLowerCase().includes(query) ||
                row.age.toString().includes(query) ||
                row.email.toLowerCase().includes(query)
            )
        );
        currentPage = 1;
        renderTableRows(filteredData);
    }

    // Event listeners
    table.querySelectorAll('thead th').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.getAttribute('data-column');
            const order = th.getAttribute('data-order');
            th.setAttribute('data-order', order === 'asc' ? 'desc' : 'asc');
            sortTable(column, order);
        });
    });

    searchInput.addEventListener('input', filterTableRows);

    idFilter.addEventListener('change', filterTableRows);
    nameFilter.addEventListener('change', filterTableRows);
    ageFilter.addEventListener('change', filterTableRows);
    emailFilter.addEventListener('change', filterTableRows);

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTableRows(filteredData);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
            currentPage++;
            renderTableRows(filteredData);
        }
    });

    // Initial render
    populateFilters(data);
    renderTableRows(filteredData);
});
