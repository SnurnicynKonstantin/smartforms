import Base from '../base/base';
import template from './search.jade';
import Factory from '../factory';
import Bloodhound from 'typeahead.js';
import './search.css';

export default class Search extends Base {
  get templateFn() {
    return template;
  }

  afterRender() {
    super.afterRender();
    const search = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: this.config.url,
        prepare: (query, settings) => this.prepareSettings(query, settings),
        transform: resp => resp.suggestions
      }
    });
    search.initialize();

    this.searchAutocompleteInput = this.el.find('input');
    this.searchAutocompleteInput
      .typeahead({
        minLength: this.config.autocompleteMinLength || 2,
        highlight: this.config.highlight || true
      }, {
        name: 'suppliers',
        displayKey: 'value',
        source: search.ttAdapter()
      })
      .on('typeahead:selected', (obj, selected) => this.onItemSelected(selected));

    this.el.find('.tt-menu').css('z-index', 200);
  }

  prepareSettings(query, settings) {
    settings = Object.assign({
      type: 'POST',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    }, settings, this.config.settings);

    settings.url = `${settings.url}?q=${query}`;
    settings.data = JSON.stringify(settings.data);

    return settings;
  }

  onItemSelected(selected) {
    console.log(selected);
  }
}

Factory.register('search', Search);
