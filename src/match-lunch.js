export default ( team, seeker ) => team.filter( el=> el.id != seeker.id && seeker.coffeeBreaks.includes(el.id) );

