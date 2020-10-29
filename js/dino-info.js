function replaceAnimal(divId, dinoName) {
    setTimeout(function () {
        let animal = this.getAnimal(dinoName.toString());
        console.log("replaceAnimal animal ", animal)
        const isHuman = animal.isHuman && dinoName.toString().toLowerCase() === "human";
        console.log("isHuman ", isHuman)
        //Root div
        const rootElement = document.querySelector(`#${divId}`);
        //Core data
        if (rootElement) {
            const factP = rootElement.getElementsByClassName("dino-info-fact")[0];
            const title = rootElement.getElementsByClassName("dino-info-title")[0];
            title.innerHTML = animal.name ? animal.name : '';
            factP.innerHTML = animal.fact ? animal.fact : '';
            //Height weight data
            const heightP = rootElement.getElementsByClassName("dino-info-height")[0];
            const weightP = rootElement.getElementsByClassName("dino-info-weight")[0];
            heightP.innerHTML = humanifyHeight(animal.height);
            weightP.innerHTML = commafy(animal.weight) + " lbs";
            //Where when diet Data
            const whereP = rootElement.getElementsByClassName("dino-info-where")[0];
            const whenP = rootElement.getElementsByClassName("dino-info-when")[0];
            const dietP = rootElement.getElementsByClassName("dino-info-diet")[0];
            whereP.innerHTML = animal.where ? animal.where : '';
            whenP.innerHTML = animal.when ? animal.when : '';
            dietP.innerHTML = animal.diet ? animal.diet : '';
            if (isHuman) {
                whenP.hidden = true;
                whereP.hidden = true;
                factP.hidden = true;
                // title.innerHTML = "Homo Spaien";
            }
            try {
                const url = animal.imgUrl();
                console.log("url " + url);
                const img = rootElement.getElementsByClassName("dino-info-img")[0];
                img.src = url;
                img.alt = `${animal.name} from ${animal.where}`
            } catch (e) {
                console.error("Could not find img " + e.toString())
            }
        } else {
            // for (let item of document.getElementsByClassName("grid-item")) {
            //     item.hidden = true;
            // }
        }
    }, 1500)

}