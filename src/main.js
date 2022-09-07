window.onload = () => {
    let bg = document.querySelector(".main_hansot .main_hansot_bg");
    console.log(bg);
    bg.addEventListener("mouseenter", (event) => {
        event.target.classList.add("on");
        console.log("mouseenter");
    });
    bg.addEventListener("mouseleave", (event) => {
        event.target.classList.remove("on");
        console.log("mouseleave");
    });
};

