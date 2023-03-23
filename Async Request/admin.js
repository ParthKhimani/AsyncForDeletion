const deleteUser = (btn) => {
    const user = btn.parentNode.querySelector('[name=delete]').value;
    const userElement = btn.closest("center");

    fetch('/deleteCustomerData/' + user, { method: 'delete' })
        .then(userElement.remove())
}