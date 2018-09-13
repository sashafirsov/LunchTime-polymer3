/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
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
        <paper-input always-float-label label="Name"                name="name"     value="{{name}}"    ></paper-input>
        <paper-input always-float-label label="Avatar Image URL"   name="image-url" value="{{imageUrl}}"></paper-input>
        <paper-button raised onclick="submitForm()">Save</paper-button><br/>
        
      </div>
      [[selectedId]]
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
            selectedId: String,
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
}

window.customElements.define('lt-team', LtTeam);
