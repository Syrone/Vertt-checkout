

document.addEventListener('DOMContentLoaded', () => {

	const collapseContents = document.querySelectorAll('[data-content-collapse]')
	const checkboxBilling = document.querySelectorAll('[data-billing]')

	function contentAttributeChange(mutationsList) {
		mutationsList.forEach((mutation) => {
			if (mutation.attributeName === 'data-content-collapse') {
				const content = mutation.target;
				const isCollapse = content.getAttribute('data-content-collapse') === 'true';

				if (isCollapse) {
					content.style.height = `${content.scrollHeight}px`;
					setTimeout(() => {
						content.style.height = '100%';
					}, 600);
				} else {
					content.style.height = `${content.scrollHeight}px`;
					setTimeout(() => {
						content.style = '';
					}, 600);
				}
			}
		});
	}

	const observerContentCollapse = new MutationObserver(contentAttributeChange);

	if (collapseContents.length > 0) {
		collapseContents.forEach((content) => {

			const isCollapse = content.getAttribute('data-content-collapse') === 'true';

			if (isCollapse) {
				content.style.height = `${content.scrollHeight}px`;
				setTimeout(() => {
					content.style.height = '100%';
				}, 600);
			}

			observerContentCollapse.observe(content, { attributes: true });
		});
	}

	if (checkboxBilling.length > 0) {
		checkboxBilling.forEach((checkbox) => {
			const input = checkbox.querySelector('.checkbox')
			checkbox.addEventListener('change', () => {
				const content = checkbox.previousElementSibling;
				const isChecked = input.checked;
				content.setAttribute('data-content-collapse', isChecked ? 'false' : 'true');
				setTimeout(() => {
					checkbox.setAttribute('data-billing', isChecked ? 'true' : 'false');
				}, isChecked ? 900 : 400);
				contentAttributeChange([{ target: content }]);
			});
		});
	}


	const toggleMethodButtons = document.querySelectorAll('.btn-toggle-method');

	function handleButtonClick(event) {
		toggleMethodButtons.forEach((button) => {
			button.classList.remove('is-active');
		});

		event.currentTarget.classList.add('is-active');
	}

	if (toggleMethodButtons.length > 0) {
		toggleMethodButtons.forEach((button) => {
			button.addEventListener('click', handleButtonClick);
		});
	}
})
