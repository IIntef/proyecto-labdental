document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeDatePicker();
    renderTable();
});

function initializeEventListeners() {
    var searchInput = document.getElementById('searchInput');
    var tipodocFilter = document.getElementById('tipodocFilter');
    var estadoFilter = document.getElementById('estadoFilter');
    var itemsPerPageSelect = document.getElementById('itemsPerPage');

    if (searchInput) {
        console.log("Elemento searchInput encontrado");
        searchInput.addEventListener('input', filtrarTabla);
    } else {
        console.log("Elemento searchInput no encontrado");
    }

    if (tipodocFilter) {
        console.log("Elemento tipodocFilter encontrado");
        tipodocFilter.addEventListener('change', filtrarTabla);
    } else {
        console.log("Elemento tipodocFilter no encontrado");
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

    var dateFilter = document.getElementById('dateFilter');
    if (dateFilter) {
        console.log("Elemento dateFilter encontrado");
        dateFilter.addEventListener('change', filtrarTabla);
    } else {
        console.log("Elemento dateFilter no encontrado");
    }

    document.querySelectorAll('th[data-sort]').forEach(function(header) {
        header.addEventListener('click', sortTable);
    });

    
}

function initializeDatePicker() {
    flatpickr("#dateFilter", {
        dateFormat: "d-m-Y",
        locale: "es",
        onChange: function(selectedDates, dateStr, instance) {
            filtrarTabla();
        },
        monthSelectorType: 'static'
    });
}

function compareDates(cellDate, filterDate) {
    // Convertir la fecha de la celda (e.g. "30 de agosto de 2024") a un objeto Date
    var cellDateParts = cellDate.split(' de ');
    var day = parseInt(cellDateParts[0], 10);
    var month = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'].indexOf(cellDateParts[1].toLowerCase());
    var year = parseInt(cellDateParts[2], 10);
    var cellDateObj = new Date(year, month, day);

    // Convertir la fecha del filtro (ahora en formato DD-MM-YYYY)
    var filterDateParts = filterDate.split('-');
    var filterDateObj = new Date(filterDateParts[2], filterDateParts[1] - 1, filterDateParts[0]);

    // Comparar las fechas ignorando la hora
    return cellDateObj.toDateString() === filterDateObj.toDateString();
}

function confirmarEliminacion(id, producto) {
    document.getElementById('elementoProducto').textContent = producto;
    const actionUrl = `/eliminarelementos/${id}/`;
    document.getElementById('formEliminar').action = actionUrl;
    document.getElementById('confirmarModal').style.display = 'block';
}

function confirmarEliminacion2(id, nombre, documento) {
    // Asegúrate de que estos elementos existan en el DOM
    const historiaNombreElement = document.getElementById('historiaNombre');
    const historiaDocumentoElement = document.getElementById('historiaDocumento');
    
    if (historiaNombreElement && historiaDocumentoElement) {
        historiaNombreElement.textContent = nombre;
        historiaDocumentoElement.textContent = documento;
    } else {
        console.error('No se encontraron los elementos historiaNombre o historiaDocumento');
    }
    
    const actionUrl = `/eliminarhistorias/${id}/`;
    console.log('Form action set to:', actionUrl);  // Verifica que la URL se genera correctamente
    
    // Asegúrate de que el formulario de eliminación existe
    const formEliminar = document.getElementById('formEliminar');
    if (formEliminar) {
        formEliminar.action = actionUrl;
    } else {
        console.error('No se encontró el formulario formEliminar');
    }
    
    // Mostrar el modal
    const modal = document.getElementById('confirmarModal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        console.error('No se encontró el modal confirmarModal');
    }
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
    var tipodocValue = document.getElementById('tipodocFilter')?.value.toLowerCase() || '';
    var estadoValue = document.getElementById('estadoFilter')?.value.toLowerCase() || '';
    var dateValue = document.getElementById('dateFilter').value;

    console.log("Documento seleccionado:", tipodocValue);
    console.log("Estado seleccionado:", estadoValue);
    console.log("Fecha seleccionada:", dateValue);

    var table = document.getElementById('elementosTable');
    var rows = table.querySelector('tbody').getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var match = true; // Changed from false to true
        var tipodocCell = rows[i].querySelector('td[data-sort="tipodoc"]');
        var estadoCell = rows[i].querySelector('td[data-sort="estado"]');
        var fechaCell = rows[i].querySelector('td[data-sort="fecha_historia"]');

        // Check if the cell content includes the filter value, instead of exact match
        var tipodocMatch = tipodocValue === "" || (tipodocCell && tipodocCell.innerText.toLowerCase().includes(tipodocValue));
        var estadoMatch = estadoValue === "" || (estadoCell && estadoCell.innerText.toLowerCase().includes(estadoValue));
        var dateMatch = dateValue === "" || (fechaCell && compareDates(fechaCell.innerText, dateValue));
        console.log("Comparando estado:", estadoValue, "con celda:", estadoCell.innerText);

        // Text search
        var textMatch = false;
        for (var j = 0; j < cells.length - 1; j++) {
            if (cells[j].innerText.toLowerCase().includes(searchValue)) {
                textMatch = true;
                break;
            }
        }

        // Combine all conditions
        match = tipodocMatch && estadoMatch && dateMatch && textMatch;

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