export function nameLength (names) {
    let namesLength = names.split('.')[0].split(' ')[0];
    if(namesLength.length > 10){
        namesLength = namesLength.slice(0, 10) + '...';
    }
    return namesLength;
}