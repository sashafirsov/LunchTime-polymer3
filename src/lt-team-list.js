/**
 * team list with `selected` property
 */

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';

import './shared-styles.js';

class LtTeamList extends PolymerElement {
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

      
      <div class="team-list">
        <paper-radio-group selected="{{selectedId}}">
          <template is="dom-repeat" items="[[team]]">
            <paper-radio-button name="[[item.id]]" >
                [[item.nickname]]
                <img src="[[item.imageUrl]]" />
            </paper-radio-button>         
          </template>
        </paper-radio-group>
        
      </div>
    `;
    }

    static get properties() {
        return {
              nickname: { type:String, notify: true },
              imageUrl: { type:String, notify: true },
            selectedId: { type:String, observer: '_idChanged', notify: true },
              selected: { type:Object , notify: true },
                  team: { type: Array },
        };
    }
    ready() {
        if( !this.selected )
            this.selected = this.team[ this.team.length - 1 ];
        this.nickname = this.selected.nickname;
        this.imageUrl = this.selected.imageUrl;

        super.ready();
    }

    _idChanged( id ) {
        const o = this.team.find( el=> el.id === id );
        Object.assign( this, o );
        this.set('selected', o);
    }
}

window.customElements.define('lt-team-list', LtTeamList);
