import { getData, getDocumento, remove, save, update } from './firebase.js'
let id = 0

document.getElementById('btnSave').addEventListener('click', (event) => {
    event.preventDefault()
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const fechaIngreso = new Date(document.getElementById('fecha_ingreso').value)
        const fechaSalida = document.getElementById('fecha_salida').value ? new Date(document.getElementById('fecha_salida').value) : ''
        const ahora = new Date()

        if (fechaIngreso > ahora) {
            Swal.fire('Error', 'La fecha de ingreso no puede ser posterior a la fecha y hora actual', 'error')
            document.getElementById('fecha_ingreso').classList.add('is-invalid')
            document.getElementById('e-fecha_ingreso').innerHTML = '<span class="badge bg-danger">La fecha de ingreso no puede ser posterior a la fecha y hora actual</span>'
            return
        }

        if (fechaSalida && fechaIngreso > fechaSalida) {
            Swal.fire('Error', 'La fecha de salida no puede ser anterior a la fecha de ingreso', 'error')
            document.getElementById('fecha_salida').classList.add('is-invalid')
            document.getElementById('e-fecha_salida').innerHTML = '<span class="badge bg-danger">La fecha de salida no puede ser anterior a la fecha de ingreso</span>'
            return
        }

        const estacionamiento = {
            run: document.getElementById('run').value,
            nombre: document.getElementById('nombre').value,
            patente: document.getElementById('patente').value,
            marca: document.getElementById('marca').value,
            modelo: document.getElementById('modelo').value,
            fecha_ingreso: document.getElementById('fecha_ingreso').value,
            fecha_salida: fechaSalida ? document.getElementById('fecha_salida').value : ''
        }
        if (id == 0) {
            save(estacionamiento)
            Swal.fire('Guardado', '', 'success')
        } else {
            update(id, estacionamiento)
        }
        id = 0
        limpiar()
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getData((datos) => {
        let tabla = ''
        datos.forEach((doc) => {
            const estacionamiento = doc.data()
            tabla += `<tr>
                <td>${estacionamiento.run}</td>
                <td>${estacionamiento.nombre}</td>
                <td>${estacionamiento.patente}</td>
                <td>${estacionamiento.marca}</td>
                <td>${estacionamiento.modelo}</td>
                <td>${estacionamiento.fecha_ingreso}</td>
                <td>${estacionamiento.fecha_salida}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const doc = await getDocumento(btn.id)
                const estacionamiento = doc.data()

                document.getElementById('run').value = estacionamiento.run
                document.getElementById('nombre').value = estacionamiento.nombre
                document.getElementById('patente').value = estacionamiento.patente
                document.getElementById('marca').value = estacionamiento.marca
                document.getElementById('modelo').value = estacionamiento.modelo
                document.getElementById('fecha_ingreso').value = estacionamiento.fecha_ingreso
                document.getElementById('fecha_salida').value = estacionamiento.fecha_salida

                id = doc.id
                document.getElementById('run').readOnly = true
                document.getElementById('btnSave').value = 'Editar'
                document.getElementById('fecha_salida_container').classList.remove('hidden')
            })
        })
    })
})
