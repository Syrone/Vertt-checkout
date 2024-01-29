

document.addEventListener('DOMContentLoaded', () => {

	const collapseSteps = document.querySelectorAll('[data-step-collapse]')

	function handleAttributeChange(mutationsList) {
		mutationsList.forEach((mutation) => {
			if (mutation.attributeName === 'data-step-collapse') {
				const step = mutation.target;
				const isCollapse = step.getAttribute('data-step-collapse') === 'true';
	
				if (isCollapse) {
					step.style.maxHeight = `${step.scrollHeight}px`;
					setTimeout(() => {
						step.style.maxHeight = '100%';
					}, 600);
				} else {
					step.style.maxHeight = `${step.scrollHeight}px`;
					setTimeout(() => {
						step.style = '';
					}, 600);
				}
			}
		});
	}
	
	const observerStepCollapse = new MutationObserver(handleAttributeChange);
	
	if (collapseSteps.length > 0) {
		collapseSteps.forEach((step) => {

			const isCollapse = step.getAttribute('data-step-collapse') === 'true';

			if (isCollapse) {
				step.style.maxHeight = `${step.scrollHeight}px`;
				setTimeout(() => {
					step.style.maxHeight = '100%';
				}, 600);
			}

			observerStepCollapse.observe(step, { attributes: true });
		});
	}

})
