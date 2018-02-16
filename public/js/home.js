'use strict'

$(document).ready(() => {
    var pathInfo = {
        url: '',
        class: '',
        type: ''
    };
    $('#students').click(e => {
        e.preventDefault();
        pathInfo.class = "students";
        getData('/educativo/students', "students_teachers");
    })
    $('#teachers').click(e => {
        e.preventDefault();
        pathInfo.class = "teachers";
        getData('/educativo/teachers', "students_teachers");
    })
    $('#courses').click(e => {
        e.preventDefault();
        pathInfo.class = "courses";
        getData('/educativo/courses', "courses");
    })

    $(".add_entity").change(function () {
        
        if ($(this).val() < 4 && $(this).val() > 0) {
            if ($(this).val() == 1) {
                $('.modal-title').text('Add New Student')
                $('.students_teachers').css({ 'display': 'block' })
                $('.courses').css({ 'display': 'none' })
                pathInfo.url = "/educativo/students";
                pathInfo.class = "students";
            }
            if ($(this).val() == 2) {
                $('.modal-title').text('Add New Teacher')
                $('.students_teachers').css({ 'display': 'block' })
                $('.courses').css({ 'display': 'none' })
                pathInfo.url = "/educativo/teachers";
                pathInfo.class = "teachers";
            }
            if ($(this).val() == 3) {
                $('.modal-title').text('Add New Course')
                $('.courses').css({ 'display': 'block' })
                $('.students_teachers').css({ 'display': 'none' })
                pathInfo.url = "/educativo/courses";
                pathInfo.class = "courses";
            }
            pathInfo.type = 'insert';
            $('#openModal').modal()
            $(".add_entity option:first").prop('selected', true);
        }
    })

    $(document).on('click', '.edit', function () {
        pathInfo.type = 'update';
        $('.save_changes').val($(this).val())
        if (pathInfo.class === "students") {
            $('.modal-title').text('Updated Student');
            dataModal($(this));
            pathInfo.url = "/educativo/students/:id";
        }
        else if (pathInfo.class === "teachers") {
            $('.modal-title').text('Updated Teacher');
            dataModal($(this));
            pathInfo.url = "/educativo/teachers/:id";
        }
        else if (pathInfo.class === "courses") {
            $('.modal-title').text('Updated Course');
            dataModal($(this));
            pathInfo.url = "/educativo/courses/:id";
        }
        $('#openModal').modal()
    })

    /**
     * save database and update
     */
    $('.save_changes').click(() => {
        let info = {};
        if (pathInfo.class === "students" || pathInfo.class === "teachers") {
            info = {
                identificacion: $('.Identification').val(),
                nombres: $('.Names').val(),
                apellidos: $('.LastName').val(),
                genero: $('.Gender').val()
            }
        } else if (pathInfo.class === "courses") {
            info = {
                codigo: $('.Code').val(),
                nombre: $('.Name').val(),
                observaciones: $('.Observation').val()
            }
        }
        if (pathInfo.type == "insert") {
            $.post(pathInfo.url, info, data => {
                if (data.message !== '') {
                    Swal(data)
                    title(pathInfo.class)
                    reset();
                }
            })
        } else {
            info.id = $('.save_changes').val()
            $.ajax({
                url: pathInfo.url,
                type: 'put',
                data: info,
                success: data => {
                    if (data.message !== '') {
                        Swal(data)
                        title(pathInfo.class)
                    }
                }
            });
        }
    })

    /**
     * Delete info
     */
    $(document).on('click', '.remove', function () {
        let id = $(this).val();
        if (pathInfo.class === "students") {
            pathInfo.url = "/educativo/students/:id";
        }
        else if (pathInfo.class === "teachers") {
            pathInfo.url = "/educativo/teachers/:id";
        }
        else if (pathInfo.class === "courses") {
            pathInfo.url = "/educativo/courses/:id";
        }
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            $.ajax({
                url: pathInfo.url,
                type: 'delete',
                data: { id: id },
                success: data => {
                    if (data.message !== '') {
                        Swal(data)
                        title(pathInfo.class)
                    }
                }
            });
        }, function (dismiss) {
            if (dismiss === 'cancel') {
                return false;
            }
        })
    })

    function returnData() {
        if (pathInfo.class === "students") {
            pathInfo.url = "/educativo/students";
        }
        else if (pathInfo.class === "teachers") {
            pathInfo.url = "/educativo/teachers";
        }
        else if (pathInfo.class === "courses") {
            pathInfo.url = "/educativo/courses";
        }
        return pathInfo.url;
    }

    function dataModal(parent) {
        if (pathInfo.class === "students" || pathInfo.class === "teachers") {
            $('.Identification').val($.trim(parent.parent().parent().find(".identi_").text()))
            $('.Names').val($.trim(parent.parent().parent().find(".names_").text()))
            $('.LastName').val($.trim(parent.parent().parent().find(".lastnames_").text()))
            $('.Gender').val($.trim(parent.parent().parent().find(".gender_").text())).attr('selected', 'selected')
            $('.students_teachers').css({ 'display': 'block' })
            $('.courses').css({ 'display': 'none' })
        } else if (pathInfo.class === "courses") {
            $('.Code').val($.trim(parent.parent().parent().find(".code_").text()))
            $('.Name').val($.trim(parent.parent().parent().find(".name_").text()))
            $('.Observation').val($.trim(parent.parent().parent().find(".observation_").text()))
            $('.students_teachers').css({ 'display': 'none' })
            $('.courses').css({ 'display': 'block' })
        }
    }

    function reset() {
        $('.Identification').val('')
        $('.Names').val('')
        $('.LastName').val('')
        $('.Code').val('')
        $('.Name').val('')
        $('.Observation').val('')
    }

    function title(title) {
        $('#title').text(title);
    }

    function Swal(data) {
        $('#openModal').modal('hide')
        swal({
            title: '',
            text: data.message,
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        }).then(function () {
            getData(returnData(), pathInfo.class);
        })
    }


    function getData(url, type) {
        $.get(url, data => {
            let thead = "", tbody = "";
            if (pathInfo.class === "students" || pathInfo.class === "teachers") {
                thead = `<thead>
                <tr>
                <th>
                    Identification
                </th>
                <th>
                    Name
                </th>
                <th>
                    LastName
                </th>
                <th>
                    Gender
                </th>
                <th>
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </th>
                <th>
                    <i class="fa fa-window-close" aria-hidden="true"></i>
                </th>
            </tr></thead>`;
            } else {
                thead = `<thead><tr>
                <th>
                    Code
                </th>
                <th>
                    Name
                </th>
                <th>
                    Observation
                </th>
                <th>
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </th>
                <th>
                    <i class="fa fa-window-close" aria-hidden="true"></i>
                </th>
            </tr></thead>`;
            }
            tbody += `<tbody>`;
            $.each(data, (key, value) => {
                tbody += `<tr>`;
                if (pathInfo.class === "students" || pathInfo.class === "teachers") {
                    tbody += `
                        <td class="identi_">
                            ${value.identificacion}
                        </td>
                        <td class="names_">
                            ${value.nombres}
                        </td>
                        <td class="lastnames_">
                            ${value.apellidos}
                        </td>
                        <td class="gender_">
                            ${value.genero}
                        </td>`;
                } else {
                    tbody += `
                        <td class="code_">
                            ${value.codigo}
                        </td>
                        <td class="name_">
                            ${value.nombre}
                        </td>
                        <td class="observation_">
                            ${value.observaciones}
                        </td>`;
                }
                tbody += `
                    <td>
                        <button type="button" class="btn btn-outline-warning edit" value="${value._id}">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-danger remove" value="${value._id}">
                            <i class="fa fa-window-close" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>`;
            });
            tbody += `</tbody>`;
            $('#tbl_edu').html(thead + tbody)
            title(pathInfo.class)
        });
    }
})