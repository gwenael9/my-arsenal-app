export function toUpOne(str: string) {
    return str.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
}

export function formaterDate(dateString: string): string {
    const [jour, mois, annee] = dateString.split('/');
    const moisEnLettres = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const moisIndex = parseInt(mois, 10) - 1; 
    const moisEnLettresAbrege = moisEnLettres[moisIndex]
    return `Le ${jour} ${moisEnLettresAbrege} ${annee}`;
}