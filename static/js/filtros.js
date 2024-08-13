document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    renderTable();
});

function initializeEventListeners() {
    var searchInput = document.getElementById('searchInput');
    var estadoFilter = document.getElementById('estadoFilter');
    var itemsPerPageSelect = document.getElementById('itemsPerPage');

    if (searchInput) {
        console.log("Elemento searchInput encontrado");
        searchInput.addEventListener('input', filtrarTabla);
    } else {
        console.log("Elemento searchInput no encontrado");
    }

    if (estadoFilter) {
        console.log("Elemento estadoFilter encontrado");
        estadoFilter.addEventListener('change', filtrarTabla);
    } else {
        console.log("Elemento estadoFilter no encontrado");
    }

    if (itemsPerPageSelect) {
        console.log("Elemento itemsPerPage encontrado");
        itemsPerPageSelect.addEventListener('change', function() {
            itemsPerPage = parseInt(this.value, 10);
            currentPage = 1;
            renderTable();
        });
    } else {
        console.log("Elemento itemsPerPage no encontrado");
    }

    document.querySelectorAll('th[data-sort]').forEach(function(header) {
        header.addEventListener('click', sortTable);
    });
}

function confirmarEliminacion(id, producto) {
    document.getElementById('elementoProducto').textContent = producto;
    const actionUrl = `/eliminarelementos/${id}/`;
    document.getElementById('formEliminar').action = actionUrl;
    document.getElementById('confirmarModal').style.display = 'block';
}

function confirmarEliminacion2(id, username, numero) {
    document.getElementById('historiaUsername').textContent = username;
    document.getElementById('historiaNumero').textContent = numero;
    const actionUrl = `/eliminarhistorias/${id}/`;
    document.getElementById('formEliminar').action = actionUrl;
    document.getElementById('confirmarModal').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('confirmarModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('confirmarModal')) {
        cerrarModal();
    }
}

function filtrarTabla() {
    console.log("Función filtrarTabla() ejecutada");

    var searchValue = document.getElementById('searchInput').value.toLowerCase();
    var estadoValue = document.getElementById('estadoFilter').value.toLowerCase();
    console.log("Estado seleccionado:", estadoValue);

    var table = document.getElementById('elementosTable');
    var rows = table.querySelector('tbody').getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var match = false;
        var estadoCell = rows[i].querySelector('td[data-sort="estado"]');

        console.log("Estado en la celda:", estadoCell ? estadoCell.innerText : "No encontrado");

        if (estadoValue === "" || (estadoCell && estadoCell.innerText.toLowerCase() === estadoValue)) {
            for (var j = 0; j < cells.length - 1; j++) {
                if (cells[j].innerText.toLowerCase().indexOf(searchValue) > -1) {
                    match = true;
                    break;
                }
            }
        }

        rows[i].style.display = match ? '' : 'none';
    }
    renderTable();
}

function sortTable() {
    var sortKey = this.getAttribute('data-sort');
    var table = document.getElementById('elementosTable');
    var tbody = table.querySelector('tbody');
    var rows = Array.from(tbody.querySelectorAll('tr'));

    var sortOrder = this.dataset.order === 'asc' ? 'desc' : 'asc';
    this.dataset.order = sortOrder;

    rows.sort(function(rowA, rowB) {
        var cellA = rowA.querySelector('td[data-sort="' + sortKey + '"]').innerText;
        var cellB = rowB.querySelector('td[data-sort="' + sortKey + '"]').innerText;

        if (sortKey === 'cantidad') {
            cellA = parseFloat(cellA);
            cellB = parseFloat(cellB);
        }

        if (cellA < cellB) {
            return sortOrder === 'asc' ? -1 : 1;
        } else if (cellA > cellB) {
            return sortOrder === 'asc' ? 1 : -1;
        } else {
            return 0;
        }
    });

    rows.forEach(function(row) {
        tbody.appendChild(row);
    });

    updateSortIcons(this, sortOrder);
}

function updateSortIcons(header, sortOrder) {
    document.querySelectorAll('th[data-sort] i').forEach(function(icon) {
        icon.classList.remove('fa-arrow-up', 'fa-arrow-down');
        icon.classList.add('fa-arrow-down-short-wide');
    });
    var icon = header.querySelector('i');
    icon.classList.remove('fa-arrow-down-short-wide');
    icon.classList.add(sortOrder === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down');
    icon.classList.add('animate');
    setTimeout(() => icon.classList.remove('animate'), 300);
}

let currentPage = 1;
let itemsPerPage = parseInt(document.getElementById('itemsPerPage').value, 10);

function renderTable() {
    const table = document.getElementById('elementosTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    const visibleRows = rows.filter(row => row.style.display !== 'none');
    const totalRows = visibleRows.length;
    const totalPages = Math.ceil(totalRows / itemsPerPage);

    // Ocultar todas las filas
    rows.forEach(row => row.style.display = 'none');

    // Mostrar solo las filas de la página actual
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    visibleRows.slice(start, end).forEach(row => row.style.display = '');

    // Renderizar los controles de paginación
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    if (totalPages > 1) {
        const createButton = (text, page, isDisabled) => {
            const button = document.createElement('a');
            button.textContent = text;
            button.href = '#';
            button.className = `page-link ${isDisabled ? 'disabled' : ''}`;
            button.addEventListener('click', (event) => {
                event.preventDefault();
                if (!isDisabled) {
                    currentPage = page;
                    renderTable();
                }
            });
            return button;
        };

        paginationContainer.appendChild(createButton('«', currentPage - 1, currentPage === 1));

        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.appendChild(createButton(i, i, i === currentPage));
        }

        paginationContainer.appendChild(createButton('»', currentPage + 1, currentPage === totalPages));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var itemsPerPageSelect = document.getElementById('itemsPerPage');
    if (itemsPerPageSelect) {
        itemsPerPage = parseInt(itemsPerPageSelect.value, 10);
    }
});