$(document).ready(function () {
    var table = $('#elementosTable').DataTable({
        "destroy": true,
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No se encontraron registros",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "emptyTable": "No hay datos disponibles en la tabla"
        },
        dom: '<"top"<"row align-items-center"<"col-sm-6"l><"col-sm-6"f>>><"clear"><"tableContainer"t><"bottom"<"row"<"col-sm-6"i><"col-sm-6 d-flex justify-content-end"p>>>',
        buttons: []
    });

    // Estilo personalizado para la barra de búsqueda
    $('.dataTables_filter input').addClass('form-control').css({
        'width': '300px',
        'display': 'inline-block',
        'margin-left': '10px'
    });
    
    // Alinear verticalmente el selector de registros por página con la barra de búsqueda
    $('.dataTables_length').css({
        'display': 'flex',
        'align-items': 'center',
        'height': '100%'
    });
    
    // Ajustar el estilo del selector de registros por página
    $('.dataTables_length select').addClass('form-control form-control-sm').css({
        'width': 'auto',
        'margin-left': '5px',
        'margin-right': '5px'
    });
    
    // Añadir espacio entre la barra de búsqueda y la tabla
    $('<div class="spacer" style="margin-top: 10px;"></div>').insertAfter('.top');

    // Añadir espacio entre la tabla y la sección de paginación
    $('.bottom').css('margin-top', '5px');

    // Alinear la información de paginación y los controles
    $('.bottom .row').css({
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'space-between'
    });

    $('.dataTables_info, .dataTables_paginate').css({
        'padding': '0',
        'margin': '0'
    });

    $('.dataTables_info').css({
        'text-align': 'left'
    });

    $('.dataTables_paginate').css({
        'text-align': 'right'
    });
});