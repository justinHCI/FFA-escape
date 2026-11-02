document.querySelectorAll("form.puzzle").forEach(function (form) {
  var message = form.querySelector(".message");
  var answer = form.dataset.answer;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var correct;

    if (form.dataset.type === "checkbox") {
      var picked = Array.from(form.querySelectorAll("input:checked"))
        .map(function (c) { return c.value; })
        .sort()
        .join(",");
      correct = picked === answer.split(",").sort().join(",");
    } else {
      var guess = form.querySelector("input[type=text]").value.trim().toLowerCase();
      correct = guess === answer;
    }

    if (correct) {
      message.className = "message ok";
      message.textContent = "Correct! The door creaks open...";
      setTimeout(function () { window.location.href = form.dataset.next; }, 800);
    } else {
      message.className = "message fail";
      message.textContent = "Wrong! Mwahahaha! Try again, if you dare.";
      form.classList.remove("shake");
      void form.offsetWidth;
      form.classList.add("shake");
    }
  });
});
