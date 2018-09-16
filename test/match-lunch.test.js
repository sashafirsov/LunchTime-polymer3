import { generateLunchGroup, bookLunchGroup } from '../src/match-lunch.js';

suite('match-lunch tests', function () {
    const  self = { id:17 };
    const folk1 = { id:1  }
    ,     folk2 = { id:2  }
    ,     folk3 = { id:3  }
    ,     folk4 = { id:4  }
    ,     folk5 = { id:5  }
    ,     folk6 = { id:6  };
    const rand = Math.random;


    teardown( ()=> Math.random = rand );

    test('lunch alone when no team yet :(', function () {
        let      team = [ self ]
        ,   luncheons = [];

        let table = generateLunchGroup( team, luncheons, self );

        assert.equal( table.length, 1 );
        assert.equal( table[0], self  );

        bookLunchGroup( table, luncheons );

        assert.equal( luncheons.length, 1 );
        assert.equal( luncheons[0][0], self );
    });
    test('lunch with same people with team of 3', function () {
        let      team = [ self, folk1, folk2 ]
        ,   luncheons = [];

        let table = generateLunchGroup( team, luncheons, self );

        assert.equal( table.length, 3 );
        assert.equal( table.includes(self ), true  );
        assert.equal( table.includes(folk1), true  );
        assert.equal( table.includes(folk2), true  );

        bookLunchGroup( table, luncheons );

        assert.equal( luncheons.length, 1 );
        assert.equal( luncheons[0].length, 3 );
        assert.equal( luncheons[0].includes(self ), true  );
        assert.equal( luncheons[0].includes(folk1), true  );
        assert.equal( luncheons[0].includes(folk2), true  );
    });
    test('random generation check by table size 3,4,5', function () {
        let      team = [ self, folk1, folk2, folk3, folk4, folk5, folk6 ]
        ,   luncheons = [];

        Math.random = ()=>0.1; // guaranteed 3 people on table
        let table = generateLunchGroup( team, luncheons, self );
                    bookLunchGroup( table, luncheons );

        assert.equal( luncheons.length, 1 );
        assert.equal( table.length, 3 );
        assert.equal( luncheons[0], table );

        Math.random = ()=>0.5; // guaranteed 4 people on table
        let table2 = generateLunchGroup( team, luncheons, self );
                     bookLunchGroup( table2, luncheons );

        assert.equal( luncheons.length, 2 );
        assert.equal( luncheons[1],table2 );
        assert.equal( table2.length, 4 );

        Math.random = ()=>0.9; // guaranteed 5 people on table
        let table3 = generateLunchGroup( team, luncheons, self );
                     bookLunchGroup( table3, luncheons );

        assert.equal( luncheons.length, 3 );
        assert.equal( luncheons[2],table3 );
        assert.equal( table3.length, 5 );
    });
    test('team of 4, table of 3 twice with left out on 2nd table', function () {
        let      team = [ self, folk1, folk2, folk3 ]
        ,   luncheons = [];

        Math.random = ()=>0.1; // guaranteed 3 people on table
        let table = generateLunchGroup( team, luncheons, self );

        assert.equal( table.length, 3 );
        assert.equal( table.includes(self ), true  );
        assert.equal( table.filter( f=> f.id !== self.id ).length, 2, "2 people on table in addition to self"  );

        bookLunchGroup( table, luncheons );

        assert.equal( luncheons.length, 1 );
        assert.equal( luncheons[0].length, 3 );
        assert.equal( luncheons[0].includes(self ), true  );

        // ensure unengaged in 1st round is picked in 2nd
        const leftOut = team.filter( f => ! luncheons[0].find( engaged => engaged.id === f.id ) );
        assert.equal( leftOut.length, 1 );

        const unengaged = leftOut[0];

        let table2 = generateLunchGroup( team, luncheons, self );

        assert.equal( table2.length, 3 );
        assert.equal( table2.includes( self      ), true  );
        assert.equal( table2.includes( unengaged ), true  );

        bookLunchGroup( table2, luncheons );

        assert.equal( luncheons.length, 2 );
        assert.equal( luncheons[1].length, 3 );
        assert.equal( luncheons[1].includes( self ), true  );
        assert.equal( luncheons[1].includes( unengaged ), true  );
    });
});
