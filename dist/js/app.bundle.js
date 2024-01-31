/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
document.addEventListener('DOMContentLoaded', function () {
  //** (Start) Checkout Step Collapse and Billing Collapse **//
  var collapseContents = document.querySelectorAll('[data-content-collapse]');
  var checkboxBilling = document.querySelectorAll('[data-billing]');
  function contentAttributeChange(mutationsList) {
    mutationsList.forEach(function (mutation) {
      if (mutation.attributeName === 'data-content-collapse') {
        var content = mutation.target;
        var isCollapse = content.getAttribute('data-content-collapse') === 'true';
        if (isCollapse) {
          content.style.height = "".concat(content.scrollHeight, "px");
          setTimeout(function () {
            content.style.height = 'auto';
          }, 600);
        } else {
          content.style.height = "".concat(content.scrollHeight, "px");
          setTimeout(function () {
            content.style = '';
          }, 700);
        }
      }
    });
  }
  var observerContentCollapse = new MutationObserver(contentAttributeChange);
  if (collapseContents.length > 0) {
    collapseContents.forEach(function (content) {
      var isCollapse = content.getAttribute('data-content-collapse') === 'true';
      if (isCollapse) {
        content.style.height = "".concat(content.scrollHeight, "px");
        setTimeout(function () {
          content.style.height = 'auto';
        }, 600);
      }
      observerContentCollapse.observe(content, {
        attributes: true
      });
    });
  }
  if (checkboxBilling.length > 0) {
    checkboxBilling.forEach(function (checkbox) {
      var input = checkbox.querySelector('.checkbox');
      checkbox.addEventListener('change', function () {
        var content = checkbox.previousElementSibling;
        var isChecked = input.checked;
        content.setAttribute('data-content-collapse', isChecked ? 'false' : 'true');
        setTimeout(function () {
          checkbox.setAttribute('data-billing', isChecked ? 'true' : 'false');
        }, isChecked ? 900 : 400);
        contentAttributeChange([{
          target: content
        }]);
      });
    });
  }
  //** (End) Checkout Step Collapse and Billing Collapse **//

  //** (Start) Checkout Content Back **//
  var mainCollapse = document.querySelectorAll('[data-edit-collapse]');
  if (mainCollapse.length > 0) {
    mainCollapse.forEach(function (edit) {
      var previous = edit.previousElementSibling;
      var back = edit.querySelector('[data-edit-back]');
      if (back) {
        back.addEventListener('click', function () {
          edit.setAttribute('data-content-collapse', 'false');
          setTimeout(function () {
            previous.setAttribute('data-content-collapse', 'true');
          }, 600);
        });
      }
    });
  }
  //** (End) Checkout Content Back **//

  //** (Start) Checkout Step Collapse **//
  var checkoutSteps = document.querySelectorAll('[data-step-collapse]');
  function stepAttributeChange(mutationsList) {
    mutationsList.forEach(function (mutation) {
      if (mutation.attributeName === 'data-step-collapse') {
        var step = mutation.target;
        var isCollapse = step.getAttribute('data-step-collapse') === 'true';
        var contentCollapse = step.querySelector('[data-content-collapse]');
        if (contentCollapse) {
          contentCollapse.setAttribute('data-content-collapse', isCollapse);
        }
      }
    });
  }
  var observerStepCollapse = new MutationObserver(stepAttributeChange);
  if (checkoutSteps.length > 0) {
    checkoutSteps.forEach(function (step) {
      observerStepCollapse.observe(step, {
        attributes: true
      });
    });
  }
  //** (End) Checkout Step Collapse **//

  //** (Start) Checkout Step Collapse Open Button **//
  var completeSteps = document.querySelectorAll('[data-complete-collapse]');
  if (completeSteps.length > 0) {
    completeSteps.forEach(function (complete) {
      var openCollapse = complete.querySelector('[data-open-collapse]');
      var contentCollapse = complete.querySelector('[data-content-collapse]');
      var isCompleted = complete.getAttribute('data-complete-collapse') === 'true';
      if (isCompleted) {
        if (openCollapse) {
          openCollapse.addEventListener('click', function () {
            complete.setAttribute('data-complete-collapse', 'false');
            contentCollapse.setAttribute('data-content-collapse', 'true');
          });
        }
      }
      var observerCompleteStep = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-complete-collapse') {
            var newIsCompleted = complete.getAttribute('data-complete-collapse') === 'true';
            if (contentCollapse) {
              contentCollapse.setAttribute('data-content-collapse', !newIsCompleted);
            } else {
              contentCollapse.setAttribute('data-content-collapse', newIsCompleted);
            }
          }
        });
      });
      observerCompleteStep.observe(complete, {
        attributes: true
      });

      //** (Start) Checkout Step Gift Card **//
      var checkoutFormGifts = complete.querySelectorAll('[data-form-gift]');
      if (checkoutFormGifts.length > 0) {
        checkoutFormGifts.forEach(function (form) {
          var input = form.querySelector('input');
          var submit = form.querySelector('button[type="submit"]');
          if (submit) {
            submit.addEventListener('click', function (event) {
              if (input && input.required && input.value.trim() === '') {
                event.preventDefault();
                input.classList.add('is-error');
                input.addEventListener('input', function () {
                  if (input.classList.contains('is-error')) {
                    input.classList.remove('is-error');
                  }
                });
                return;
              }
              event.preventDefault();
              submit.classList.add('is-active');
              setTimeout(function () {
                submit.textContent = 'successful';
                if (input) {
                  var successPlaceholder = input.dataset.successPlaceholder;
                  if (successPlaceholder) {
                    input.value = '';
                    input.readOnly = true;
                    input.placeholder = successPlaceholder;
                  }
                }
                closeCollapse.forEach(function (closes) {
                  var isFalse = closes.getAttribute('data-close-collapse') === 'false';
                  if (isFalse) {
                    closes.setAttribute('data-close-collapse', 'true');
                  }
                });
              }, 1000);
            });
          }
        });
      }

      //** (Start) Checkout Step Close Collapse **//
      var closeCollapse = complete.querySelectorAll('[data-close-collapse]');
      if (closeCollapse.length > 0) {
        closeCollapse.forEach(function (closes) {
          var btn = closes.querySelector('button');
          if (btn) {
            btn.addEventListener('click', function () {
              if (isCompleted) {
                complete.setAttribute('data-complete-collapse', isCompleted);
              } else {
                complete.setAttribute('data-complete-collapse', !isCompleted);
              }
            });
          }
        });
      }
      //** (End) Checkout Step Close Collapse **//

      //** (End) Checkout Step Gift Card **//
    });
  }
  //** (End) Checkout Step Collapse Open Button **//

  //** (Start) Checkout Step Shipping Method **//
  var toggleMethodButtons = document.querySelectorAll('.btn-toggle-method');
  function handleButtonClick(event) {
    toggleMethodButtons.forEach(function (button) {
      button.classList.remove('is-active');
    });
    event.currentTarget.classList.add('is-active');
  }
  if (toggleMethodButtons.length > 0) {
    toggleMethodButtons.forEach(function (button) {
      button.addEventListener('click', handleButtonClick);
    });
  }
  //** (Start) Checkout Step Shipping Method **//

  //** (Start) Checkout Payment Buttons **//
  var paymentButtons = document.querySelectorAll('.btn-payment-method');
  var targetCollapse = document.querySelectorAll('[data-target-collapse]');
  if (paymentButtons.length > 0) {
    paymentButtons.forEach(function (button) {
      var getID = button.getAttribute('id');
      if (targetCollapse.length > 0) {
        targetCollapse.forEach(function (collapse) {
          var targetID = collapse.getAttribute('data-target-collapse');
          var contentCollapse = collapse.getAttribute('data-content-collapse');
          if (targetID === getID) {
            if (contentCollapse === 'true') {
              button.classList.add('is-active');
            }
          }
          button.addEventListener('click', function () {
            targetID = collapse.getAttribute('data-target-collapse');
            contentCollapse = collapse.getAttribute('data-content-collapse');
            if (targetID === getID) {
              if (contentCollapse === 'false') {
                targetCollapse.forEach(function (otherCollapse) {
                  var otherContentCollapse = otherCollapse.getAttribute('data-content-collapse');
                  if (otherContentCollapse === 'true') {
                    otherCollapse.setAttribute('data-content-collapse', 'false');
                    var otherButtonID = otherCollapse.getAttribute('data-target-collapse');
                    var otherButton = document.getElementById(otherButtonID);
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
    });
  }
  //** (End) Checkout Payment Buttons **//
});
/******/ })()
;