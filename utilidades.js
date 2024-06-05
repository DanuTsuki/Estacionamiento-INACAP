const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    document.getElementById('run').readOnly = false
    document.getElementById('btnSave').value = 'Guardar'
    document.getElementById('fecha_salida_container').classList.add('hidden')
}

const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '' && id !== 'fecha_salida') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    } else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'run') {
            if (!validaRun(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run no es válido</span>'
            }
        } else if (id == 'fecha_ingreso') {
            const fechaIngreso = new Date(input.value)
            const ahora = new Date()
            if (fechaIngreso > ahora) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">La fecha de ingreso no puede ser posterior a la fecha y hora actual</span>'
            }
        } else if (id == 'fecha_salida') {
            const fechaIngreso = new Date(document.getElementById('fecha_ingreso').value)
            const fechaSalida = new Date(input.value)
            if (fechaSalida && fechaIngreso > fechaSalida) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">La fecha de salida no puede ser anterior a la fecha de ingreso</span>'
            }
        }
    }
}
