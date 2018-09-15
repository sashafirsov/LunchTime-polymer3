export function matchCofee( team, seeker )
{
    return team.filter( el=> el.id != seeker.id && !seeker.coffeeBreaks.includes(el.id) );
}
export function bookCofee( team, seeker, pair )
{
    seeker.coffeeBreaks.push( pair  .id );
    pair  .coffeeBreaks.push( seeker.id );
    return matchCofee( team, seeker );
}

