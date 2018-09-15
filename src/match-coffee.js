export function matchCoffee( team, seeker )
{
    return team.filter( el=> el.id != seeker.id && !seeker.coffeeBreaks.includes(el.id) );
}
export function bookCoffee( team, seeker, pair )
{
    seeker.coffeeBreaks.push( pair  .id );
    pair  .coffeeBreaks.push( seeker.id );
    return matchCoffee( team, seeker );
}

