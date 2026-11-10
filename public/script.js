const input = document.querySelector("#date-input");
const submitButton = document.querySelector("#submit-button");
const result = document.querySelector("#result code");
const error = document.querySelector("#error");

async function convertDate(value = input.value.trim()) {
  const endpoint = value ? `/api/${encodeURIComponent(value)}` : "/api";
  error.textContent = "";
  submitButton.disabled = true;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    result.textContent = JSON.stringify(data, null, 2);
  } catch (requestError) {
    error.textContent = requestError.message || "Unable to reach the service.";
    result.textContent = JSON.stringify({ error: error.textContent }, null, 2);
  } finally {
    submitButton.disabled = false;
  }
}

submitButton.addEventListener("click", () => convertDate());
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") convertDate();
});
document.querySelectorAll("[data-example]").forEach((button) => {
  button.addEventListener("click", () => {
    input.value = button.dataset.example;
    convertDate(button.dataset.example);
  });
});
