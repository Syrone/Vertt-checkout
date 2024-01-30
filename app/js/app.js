

document.addEventListener('DOMContentLoaded', () => {

	//** (Start) Checkout Step Collapse and Billing Collapse **//
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
					}, 700);
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
	//** (Start) Checkout Step Collapse and Billing Collapse **//


	//** (Start) Checkout Step Shipping Method **//
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
	//** (Start) Checkout Step Shipping Method **//

	//** (Start) Checkout Step Gift Card **//
	const checkoutFormGifts = document.querySelectorAll('.checkout-form-gift')

	if (checkoutFormGifts.length > 0) {
		checkoutFormGifts.forEach((form) => {
			const input = form.querySelector('input')
			const submit = form.querySelector('button[type="submit"]')

			if (submit) {
				submit.addEventListener('click', (event) => {
					event.preventDefault();
		
					submit.classList.add('is-active');
					setTimeout(() => {
						submit.textContent = 'successful';

						if (input) {
							const successPlaceholder = input.dataset.successPlaceholder;
					
							if (successPlaceholder) {
								input.value = '';
								input.readOnly = true;
								input.placeholder = successPlaceholder;
							}
						}
					}, 1000);
				});
			}
		})
	}
	//** (End) Checkout Step Gift Card **//
})
