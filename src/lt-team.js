/**
 * team list with add and change member ability
 */

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';

import './shared-styles.js';

class LtTeam extends PolymerElement {
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
        paper-radio-button img{ display: block }
        .team-list{ text-align: center }
        paper-radio-button { --layout-inline_-_display:none }
        .team-list label{ max-width: 10em }
        .team-list paper-radio-button[checked]{ box-shadow: inset 0 0 3em green }
        .team-list paper-radio-button{ border: dashed 2px transparent }
        .team-list paper-radio-button:focus{ border:dashed silver 2px }
      </style>

      <div class="card">
        <img src="[[imageUrl]]" />
        <div class="circle">3</div>
        <h1>Who am I?   </h1>
        <paper-input always-float-label label="Name"               name="name"      value="{{name}}"    ></paper-input>
        <paper-input always-float-label label="Avatar Image URL"   name="image-url" value="{{imageUrl}}"></paper-input>
        <paper-button raised on-click="_save"    > Update     </paper-button>
        <paper-button raised on-click="_create"  > Create     </paper-button>
        
      </div>
      <div class="team-list">
        <paper-radio-group selected="{{selectedId}}">
          <template is="dom-repeat" items="{{team}}">
            <paper-radio-button name="[[item.id]]" >
                [[item.name]]
                <img src="[[item.imageUrl]]" />
            </paper-radio-button>         
          </template>
        </paper-radio-group>
        
      </div>
    `;
    }

    static get properties() {
        return {
            name: String,
            imageUrl: String,
            selectedId: { type:String, observer: '_idChanged'},
            team: {
                type: Array,
                value: function(){
                    return [
                        { id: 1, name: 'Snow '      , imageUrl: 'http://www.stickpng.com/assets/images/5874d04142e4d628738559ee.png'},
                        { id: 2, name: 'Sneeze'     , imageUrl: 'http://www.stickpng.com/assets/images/5874d0a042e4d628738559f0.png'},
                        { id: 3, name: 'Bashful'    , imageUrl: 'http://www.stickpng.com/assets/images/5874d0ac42e4d628738559f1.png'},
                        { id: 4, name: 'Dopey'      , imageUrl: 'http://www.stickpng.com/assets/images/5874d0cb42e4d628738559f2.png'},
                        { id: 5, name: 'Grumpy'     , imageUrl: 'http://www.stickpng.com/assets/images/5874d0d642e4d628738559f3.png'},
                        { id: 6, name: 'Sleepy'     , imageUrl: 'http://www.stickpng.com/assets/images/5874d02942e4d628738559ec.png'},
                        { id: 7, name: 'Doc'        , imageUrl: 'http://www.stickpng.com/assets/images/5874cfce42e4d628738559e7.png'},
                        { id: 8, name: 'Happy'      , imageUrl: 'http://www.stickpng.com/assets/images/5874d00c42e4d628738559ea.png'}
                    ];
                }
            },
        };
    }
    _idChanged( id ) {
        Object.assign( this, this.team.find( el=> el.id === id ) );
    }
    _save(){
        const i = this.team.findIndex( el => el.id === this.selectedId );
        this.set(`team.${i}.name`       , this.name     );
        this.set(`team.${i}.imageUrl`   , this.imageUrl );
    }
    _create(){
        const o = { id: this.team.length, name: this.name, imageUrl: this.imageUrl };
        this.unshift( 'team', o );
        this.selectedId = o.id;
    }
}

window.customElements.define('lt-team', LtTeam);
