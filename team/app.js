const dialog = document.querySelector('#contact-dialog');
document.querySelectorAll('[data-contact]').forEach(button => {
  button.addEventListener('click', () => dialog.showModal());
});
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
