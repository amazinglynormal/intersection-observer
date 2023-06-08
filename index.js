let boxContainer = document.querySelector(".boxContainer");
let lastBox = document.querySelector(".boxContainer > .box:last-child");

let groupNum = 1;

function newBoxes(groupNum, observer) {
  for (let i = 0; i < 5; i++) {
    const newBox = document.createElement("div");
    const boxContent = document.createTextNode(groupNum);
    newBox.appendChild(boxContent);
    newBox.classList.add("box");
    if (i == 4) {
      observer.observe(newBox);
    }
    boxContainer.appendChild(newBox);
  }
}

let observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("bg-red");
        newBoxes(groupNum, observer);
        groupNum++;
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
    rootMargin: "0px 0px -200px 0px",
  }
);

observer.observe(lastBox);
