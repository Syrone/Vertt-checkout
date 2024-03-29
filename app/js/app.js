

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
						content.style.height = 'auto';
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
					content.style.height = 'auto';
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
	//** (End) Checkout Step Collapse and Billing Collapse **//

	//** (Start) Checkout Content Back **//
	const mainCollapse = document.querySelectorAll('[data-edit-collapse]')

	if (mainCollapse.length > 0) {
		mainCollapse.forEach((edit) => {
			const previous = edit.previousElementSibling
			const back = edit.querySelector('[data-edit-back]')
			if (back) {
				back.addEventListener('click', () => {
					edit.setAttribute('data-content-collapse', 'false')
					setTimeout(() => {
						previous.setAttribute('data-content-collapse', 'true')
					}, 600);
				})
			}
		})
	}
	//** (End) Checkout Content Back **//

	//** (Start) Checkout Step Collapse **//
	const checkoutSteps = document.querySelectorAll('[data-step-collapse]')

	function stepAttributeChange(mutationsList) {
		mutationsList.forEach((mutation) => {
			if (mutation.attributeName === 'data-step-collapse') {
				const step = mutation.target;
				const isCollapse = step.getAttribute('data-step-collapse') === 'true';
				const contentCollapse = step.querySelector('[data-content-collapse]');

				if (contentCollapse) {
					contentCollapse.setAttribute('data-content-collapse', isCollapse);
				}
			}
		});
	}

	const observerStepCollapse = new MutationObserver(stepAttributeChange);

	if (checkoutSteps.length > 0) {
		checkoutSteps.forEach((step) => {
			observerStepCollapse.observe(step, { attributes: true });
		})
	}
	//** (End) Checkout Step Collapse **//

	//** (Start) Checkout Step Collapse Open Button **//
	const completeSteps = document.querySelectorAll('[data-complete-collapse]')

	if (completeSteps.length > 0) {
		completeSteps.forEach((complete) => {
			const openCollapse = complete.querySelector('[data-open-collapse]')
			const contentCollapse = complete.querySelector('[data-content-collapse]')

			const isCompleted = complete.getAttribute('data-complete-collapse') === 'true'

			if (isCompleted) {

				if (openCollapse) {
					openCollapse.addEventListener('click', () => {
						complete.setAttribute('data-complete-collapse', 'false')
						contentCollapse.setAttribute('data-content-collapse', 'true')
					})
				}
			}

			const observerCompleteStep = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (
						mutation.type === 'attributes' &&
						mutation.attributeName === 'data-complete-collapse'
					) {
						const newIsCompleted = complete.getAttribute('data-complete-collapse') === 'true';
						if (contentCollapse) {
							contentCollapse.setAttribute('data-content-collapse', !newIsCompleted)
						} else {
							contentCollapse.setAttribute('data-content-collapse', newIsCompleted)
						}
					}
				});
			});

			observerCompleteStep.observe(complete, { attributes: true });

			//** (Start) Checkout Step Gift Card **//
			const checkoutFormGifts = complete.querySelectorAll('[data-form-gift]')

			if (checkoutFormGifts.length > 0) {

				checkoutFormGifts.forEach((form) => {
					const input = form.querySelector('input')
					const submit = form.querySelector('button[type="submit"]')

					if (submit) {
						submit.addEventListener('click', (event) => {

							if (input && input.required && input.value.trim() === '') {
								event.preventDefault();
								input.classList.add('is-error');

								input.addEventListener('input', () => {
									if (input.classList.contains('is-error')) {
										input.classList.remove('is-error');
									}
								});

								return;
							}

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

								closeCollapse.forEach((closes) => {
									const isFalse = closes.getAttribute('data-close-collapse') === 'false'
				
									if (isFalse) {
										closes.setAttribute('data-close-collapse', 'true')
									}
								})
							}, 1000);
						});
					}
				})
			}

			//** (Start) Checkout Step Close Collapse **//
			const closeCollapse = complete.querySelectorAll('[data-close-collapse]')
			if (closeCollapse.length > 0) {
				closeCollapse.forEach((closes) => {
					const btn = closes.querySelector('button')

					if (btn) {
						btn.addEventListener('click', () => {
							if (isCompleted) {
								complete.setAttribute('data-complete-collapse', isCompleted)
							} else {
								complete.setAttribute('data-complete-collapse', !isCompleted)
							}
						})
					}
				})
			}
			//** (End) Checkout Step Close Collapse **//
			
			//** (End) Checkout Step Gift Card **//
		})
	}
	//** (End) Checkout Step Collapse Open Button **//

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

	//** (Start) Checkout Payment Buttons **//
	const paymentButtons = document.querySelectorAll('.btn-payment-method')
	const targetCollapse = document.querySelectorAll('[data-target-collapse]')

	if (paymentButtons.length > 0) {
		paymentButtons.forEach((button) => {
			const getID = button.getAttribute('id')

			if (targetCollapse.length > 0) {
				targetCollapse.forEach((collapse) => {
					let targetID = collapse.getAttribute('data-target-collapse');
					let contentCollapse = collapse.getAttribute('data-content-collapse');

					if (targetID === getID) {
						if (contentCollapse === 'true') {
							button.classList.add('is-active');
						}
					}

					button.addEventListener('click', () => {
						targetID = collapse.getAttribute('data-target-collapse');
						contentCollapse = collapse.getAttribute('data-content-collapse');

						if (targetID === getID) {
							if (contentCollapse === 'false') {
								targetCollapse.forEach((otherCollapse) => {
									const otherContentCollapse = otherCollapse.getAttribute('data-content-collapse');
									if (otherContentCollapse === 'true') {
										otherCollapse.setAttribute('data-content-collapse', 'false');
										const otherButtonID = otherCollapse.getAttribute('data-target-collapse');
										const otherButton = document.getElementById(otherButtonID);
										if (otherButton) {
											otherButton.classList.remove('is-active');
										}
									}
								});

								collapse.setAttribute('data-content-collapse', 'true');
								button.classList.add('is-active');
							} else {
								collapse.setAttribute('data-content-collapse', 'false');
								button.classList.remove('is-active');
							}
						}
					});
				});
			}
		})
	}
	//** (End) Checkout Payment Buttons **//
})
