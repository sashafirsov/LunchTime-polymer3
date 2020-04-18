/**
 * team list with add and change member ability
 */

import {PolymerElement, html} from 'https://cdn.xml4jquery.com/web-elements-loader/build/esm-unbundled/node_modules/@polymer/polymer/polymer-element.js';
import 'https://cdn.xml4jquery.com/web-elements-loader/build/esm-unbundled/node_modules/@polymer/paper-input/paper-input.js';
import 'https://cdn.xml4jquery.com/web-elements-loader/build/esm-unbundled/node_modules/@polymer/paper-button/paper-button.js';
import 'https://cdn.xml4jquery.com/web-elements-loader/build/esm-unbundled/node_modules/@polymer/paper-radio-button/paper-radio-button.js';
import 'https://cdn.xml4jquery.com/web-elements-loader/build/esm-unbundled/node_modules/@polymer/paper-radio-group/paper-radio-group.js';

import './shared-styles.js';
import {generateLunchGroup, bookLunchGroup} from './match-lunch.js';

class LtLunch extends PolymerElement {
    static get template() {
        return html`
            <style include="shared-styles">
                :host {
                    display: block;
                    padding: 10px;
                }
                img{ max-width: 10em;max-height: 10em; }
                .card img{ float: right }
                label{ display: inline-block }
            </style>
    
            <div class="card" style="text-align: center">
                <h1>Lets get a random group to go eat lunch </h1>
                <lt-team-list team="[[lunchCandidates]]" ></lt-team-list>  
            
                <paper-button raised on-click="_save"   > Lets go!</paper-button>
                <paper-button raised on-click="_shuffle"> Shuffle </paper-button>
            </div>
            <template is="dom-if" if="{{candidateLunches.length}}">
                <hr/>  
                <h3>Past lunch groups</h3>    
                
                <template is="dom-repeat" items="[[candidateLunches]]" >
                    <div class="card">
                        <lt-team-list team="[[item]]" ></lt-team-list>
                    </div>     
                </template>
            </template>
            <template is="dom-if" if="{{unengaged.length}}">
                <h3>Unengaged yet folks</h3>    
                <lt-team-list team="[[unengaged]]" ></lt-team-list>
            </template>       
        `;
    }

    static get properties() {
        return {
            seeker: {type:Object, observer: '_seekerChanged'},
            team: Array,
            lunchCandidates: Array,
            luncheons: {type:Array,value:[], notify: true },
            candidateLunches: {type:Array,value:[]},
            unengaged: {type:Array,value:[]}
        };
    }

    ready() {
        this._seekerChanged();
        super.ready();
    }

    updateLuncheons(){
        this.candidateLunches = this.luncheons.filter( table=>table.find(chair=> chair.id === this.seeker.id) ).reverse();
        this.unengaged = this.team.filter( f=> !this.luncheons.find( table=>table.find( chair=> chair.id === f.id )
                                                                         && table.find( chair=> chair.id === this.seeker.id ) )
                                         );
    }

    _seekerChanged(){
        this.lunchCandidates = generateLunchGroup( this.team, this.luncheons, this.seeker );
        this.updateLuncheons();
    }

    _shuffle(){
        this._seekerChanged();
    }

    _save() {
        this.push( 'luncheons', this.lunchCandidates );
        this._shuffle();
    }

}

window.customElements.define('lt-lunch', LtLunch);
