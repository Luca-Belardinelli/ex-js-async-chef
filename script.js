async function getChefBirthday(id) {
    // prima chiamata API per prendere la ricetta
    let ricettaId
    try {
        const ricetta = await fetch(`https://dummyjson.com/recipes/${id}`);
        ricettaId = await ricetta.json();
        // console.log(ricetta);
    } catch (error) {
        throw new Error("Non è stato possibile trovare la ricetta");
    }

    // seconda chiamata API per prendere la data dello chef
    let chefData
    try {
        const chef = await fetch(`https://dummyjson.com/users/${ricettaId.userId}`);
        chefData = await chef.json();
        // console.log(chef);
    } catch (error) {
        throw new Error("Non è stato possibile trovare lo Chef");
    }

    // formattazione data tramite libreria 
    return dayjs(chefData.birthDate).format('DD/MM/YYYY');
}

// IIFE
(async () => {
    try {
        const birthday = await getChefBirthday(12);
        console.log("Data di nascita dello chef è:", birthday);
    } catch (error) {
        console.error("Errore:", error.message);
    } finally {
        console.log("Fine");
    }
})();