/**
 * team list with add and change member ability
 */

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';

import './shared-styles.js';

class LtCoffee extends PolymerElement {
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
                <h1>Lets get coffee with someone random </h1>
                <div>
                    <paper-radio-button>
                        <div> [[seeker.nickname]]</div>
                        <img src="[[seeker.imageUrl]]"/>
                    </paper-radio-button>
                    <paper-radio-button>
                        <div></div>
                        <img src="http://www.stickpng.com/assets/images/5a01907e7ca233f48ba62720.png"/>
                    </paper-radio-button>
                    <paper-radio-button>
                        <div> [[selected.nickname]]</div>
                        <img src="[[selected.imageUrl]]"/>
                    </paper-radio-button>
                </div>
            
                <paper-button raised on-click="_save"> Lets go!</paper-button>
            </div>
            <lt-team-list selected="{{selected}}" team="[[team]]" ></lt-team-list>        
        `;
    }

    static get properties() {
        return {
            seeker: Object,
            selected: Object,
            team: Array,
        };
    }

    ready() {
        if (!this.selected)
            this.selected = this.team[this.team.length - 1];

        super.ready();
    }



    _save() {
        let i = this.team.indexOf(this.selected);
        this.set(`selected.nickname`, this.nickname);
        this.set(`selected.imageUrl`, this.imageUrl);
        this.notifyPath(`team.${i}.nickname`, this.nickname);
        this.notifyPath(`team.${i}.imageUrl`, this.imageUrl);
    }

}

window.customElements.define('lt-coffee', LtCoffee);
