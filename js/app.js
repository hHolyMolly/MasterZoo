function formHandler() {
  const form = document.querySelector("[data-main-form]");

  const buttonSend = form.querySelector("[data-form-send]");

  const firstStep = () => {
    const steps = form.querySelectorAll("[data-form-step]");
    steps.forEach((step) => {
      if (step.getAttribute("data-form-step") == 1) {
        const checkboxs = step.querySelectorAll(".checkbox-item input[type='checkbox']");

        checkboxs.forEach((checkbox) => {
          checkbox.addEventListener("change", (e) => {
            const comment = step.querySelector("[data-comment-text]");

            if (Array.from(checkboxs).some((checkbox) => checkbox.checked)) {
              form.querySelector("[data-form-step='2']").style.display = "block";
            } else {
              form.querySelector("[data-form-step='2']").style.display = "none";
            }

            const buttonArrProp = step.querySelectorAll("[data-comment-variant] input[type='checkbox']");
            if (Array.from(buttonArrProp).some((checkbox) => checkbox.checked)) {
              comment.style.display = "block";
            } else {
              comment.style.display = "none";
            }
          });
        });
      }
    });
  };

  const secondStep = () => {
    const steps = form.querySelectorAll("[data-form-step]");
    steps.forEach((step) => {
      if (step.getAttribute("data-form-step") == 2) {
        const checkboxs = step.querySelectorAll(".checkbox-item input[type='checkbox']");

        checkboxs.forEach((checkbox) => {
          checkbox.addEventListener("change", (e) => {
            const comment = step.querySelector("[data-comment-text]");

            if (Array.from(checkboxs).some((checkbox) => checkbox.checked)) {
              form.querySelector("[data-form-step='3']").style.display = "block";
              buttonSend.style.display = "block";
            } else {
              form.querySelector("[data-form-step='3']").style.display = "none";
              buttonSend.style.display = "none";
            }

            const buttonArrProp = step.querySelectorAll("[data-comment-variant] input[type='checkbox']");
            if (Array.from(buttonArrProp).some((checkbox) => checkbox.checked)) {
              comment.style.display = "block";
            } else {
              comment.style.display = "none";
            }
          });
        });
      }
    });
  };

  if (form) {
    firstStep();
    secondStep();
  }

  var textareaEl = document.getElementsByTagName("textarea");

  for (var i = 0; i < textareaEl.length; i++) {
    textareaEl[i].addEventListener("input", onChangeTextarea, false);
  }

  function onChangeTextarea() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";

    this.scrollHeight >= 180 ? (this.style.overflow = "auto") : (this.style.overflow = "hidden");

    if (this.scrollHeight <= 40) this.style.height = "24px";
  }
}
formHandler();
