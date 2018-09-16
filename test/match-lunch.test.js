import { generateLunchGroup, bookLunchGroup } from '../src/match-lunch.js';

suite('match-lunch tests', function () {
    const self = { id:17 };
    const folk1 = { id:1 }
    ,     folk2 = { id:2 }
    ,     folk3 = { id:3 }
    ,     folk4 = { id:4 }
    ,     folk5 = { id:5 }
    ,     folk6 = { id:6 };
    const clone = a => JSON.parse(JSON.stringify(a));

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
});
