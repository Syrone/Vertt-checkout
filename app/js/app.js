

document.addEventListener('DOMContentLoaded', () => {

	const collapseContents = document.querySelectorAll('[data-content-collapse]')
	const checkboxBilling = document.querySelectorAll('[data-billing]')

	function contentAttributeChange(mutationsList) {
		mutationsList.forEach((mutation) => {
			if (mutation.attributeName === 'data-content-collapse') {
				const content = mutation.target;
				const isCollapse = content.getAttribute('data-content-collapse') === 'true';

				if (isCollapse) {
					content.style.maxHeight = `${content.scrollHeight}px`;
					setTimeout(() => {
						content.style.maxHeight = '100%';
					}, 600);
				} else {
					content.style.maxHeight = `${content.scrollHeight}px`;
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
				content.style.maxHeight = `${content.scrollHeight}px`;
				setTimeout(() => {
					content.style.maxHeight = '100%';
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
				}, isChecked ? 850 : 450);
				contentAttributeChange([{ target: content }]);
			});
		});
	}

})
