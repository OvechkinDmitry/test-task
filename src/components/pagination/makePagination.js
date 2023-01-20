export let makePagination = (callback) => {
    window.addEventListener("scroll", () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 5)
                if(document.querySelector('.card')){
                    let inputs = [...document.querySelectorAll("input")]
                    if (inputs.every(el => el.value === ""))
                        callback()
                }
        },
        { passive: true }
    );
}