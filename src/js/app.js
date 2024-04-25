function formHandler() {
  const formArr = document.querySelectorAll("[data-main-form]");

  formArr.forEach((form) => {
    const buttonSend = form.querySelector("[data-form-send]");

    if (form) {
      const toggleArr = form.querySelectorAll(".action-first__input, .checkbox-item input");

      let selectedArr = [];

      const comments = form.querySelectorAll("[data-comment-text]");

      toggleArr.forEach((toggle, idx) => {
        toggle.addEventListener("change", (e) => {
          const { target } = e;

          const index = selectedArr.indexOf(idx);

          if (target.checked && index === -1) {
            selectedArr.push(idx);
          } else if (!target.checked && index !== -1) {
            selectedArr.splice(index, 1);
          }

          if (selectedArr.length > 0) {
            buttonSend.style.display = "inline-flex";
          } else {
            buttonSend.style.display = "none";
          }

          const el = toggle.parentElement.querySelector("[data-comment-variant]");

          comments.forEach((comment) => {
            comment.style.display = "none";

            const commentVariant = el.getAttribute("data-comment-variant");
            const commentText = comment.getAttribute("data-comment-text");

            if (el) {
              if (commentVariant === commentText) {
                comment.style.display = "flex";
              } else {
                comment.style.display = "none";
              }
            } else {
              comment.style.display = "none";
            }
          });
        });
      });

      const actionEl = document.querySelector("[data-section-action]");
      const thanksEl = document.querySelector("[data-section-thanks]");

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        try {
          actionEl.remove();
          thanksEl.style.display = "block";
          document.querySelector(".page").classList.add("centered");
        } catch (err) {
          console.log(err);

          window.alert("Что-то пошло не так :(");
        }
      });
    }
  });

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
