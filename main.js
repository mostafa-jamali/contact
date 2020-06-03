
renderTable();
function remove_contact(id) {
    let contactList = JSON.parse(localStorage.getItem('contactList'));
    contactList = contactList.filter((item) => item.id != id)
    localStorage.setItem('contactList', JSON.stringify(contactList))
    renderTable();
}
function renderTable() {
    const contactList = JSON.parse(localStorage.getItem('contactList'));
    if (!contactList) {
        localStorage.setItem('contactList', JSON.stringify([]))
        return;
    }
    const tbody2 = document.getElementsByTagName('tbody');
    if (tbody2.length > 0) {
        tbody2[0].remove();
    }

    const table = document.getElementById('contact_table');

    const tbody = document.createElement("TBODY");
    contactList.map((contact) => {
        const tr = document.createElement("TR");
        tr.innerHTML = `<td>${contact.id}</td><td>${contact.name}</td><td>${contact.lastName}</td>
        <td>${contact.phone}</td><td>${contact.email}</td><td>${contact.address}</td>
        <td>${contact.birthday}</td><td>${contact.details}</td>
        <td> <button onclick="delete_contact(${contact.id})" class="btn btn-danger"> <i class='fa fa-trash'></i></button>
        <button class="btn btn-primary"> <i class='fa fa-edit'></i></button></td>`;
        tbody.appendChild(tr);
    })
    table.appendChild(tbody);

}

function show_form() {
    const el = document.getElementById('form')
    el.classList.add("show");
}

function hide_form() {
    const el = document.getElementById('form');
    el.classList.remove("show");
}
document.getElementById("contact_form").addEventListener("submit", function (event) {
    event.preventDefault();
    const contactList = JSON.parse(localStorage.getItem('contactList'));
    const new_contact_date = new FormData(event.target);
    let new_contact = {};
    for (item of new_contact_date.entries()) {
        new_contact[item[0]] = item[1]
    }
    console.log(new_contact);
    contactList.push(new_contact);
    localStorage.setItem('contactList', JSON.stringify(contactList))
    hide_form();
    renderTable();

});

function delete_contact(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            remove_contact(id)
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}
