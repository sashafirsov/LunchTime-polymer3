export function generateLunchGroup( team, luncheons, seeker )
{
    const candidates = team.filter( f=> f.id !== seeker.id )
    ,      unengaged = []
    ,        engaged = []
    ,            ret = [seeker];

    // set to engaged if folk was in luncheon with seeker, otherwise to unengaged
    candidates.forEach( folk =>  (  luncheons.find( table => table.find( chair => folk.id === chair.id ) && table.find( chair => chair.id === seeker.id ) )
                                    ? engaged
                                    : unengaged
                                 ).push( folk ) );

    const tableSize = Math.floor( 3 + 3*Math.random() ) ; // 3 to 5
    for( let i =1; i<tableSize; i++ ){
        const pool = unengaged.length ? unengaged : engaged;
        if( !pool.length )
            break;
        ret.push( pool.splice( pool.length * Math.random(), 1 )[0] ); // add randomly extracted from pool
    }

    return ret;
}
export function bookLunchGroup( table, luncheons )
{
    luncheons.unshift( table );
}

