import Fieldset from '../fieldset/fieldset';
import Factory from '../factory';
import './address.css';

import Bloodhound from 'typeahead.js';
import merge from 'lodash/merge';
import compact from 'lodash/compact';
import pickBy from 'lodash/fp/pickBy';
import toArray from 'lodash/fp/toArray';
import join from 'lodash/fp/join';
import flow from 'lodash/fp/flow';

export default class Address extends Fieldset {
  constructor(config) {
    const items = config.items || [];
    const finalConfig = Object.assign(
      {
        layout: [1, 3]
      },
      config,
      {
        regions: '',
        items: [
          merge({
            block: 'input',
            placeholder: 'введите адрес в свободной форме',
            name: 'address'
          }, items.find(item => 'address' === item.name) || {}),
          merge({
            block: 'input',
            placeholder: 'дом',
            name: 'house'
          }, items.find(item => 'house' === item.name) || {}),
          merge({
            block: 'input',
            placeholder: 'корпус',
            name: 'block'
          }, items.find(item => 'block' === item.name) || {}),
          merge({
            block: 'input',
            placeholder: 'квартира',
            name: 'flat'
          }, items.find(item => 'flat' === item.name) || {})
        ]
      }
    );

    super(finalConfig);
  }

  afterRender() {
    const addressAutocomplete = this.getItemByName('address') || {};

    if (!addressAutocomplete.el) {
      return;
    }

    this.addressAutocompleteInput = addressAutocomplete.el.find('input');

    if (0 === this.addressAutocompleteInput.length) {
      return;
    }

    const address = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: this.config.url,
        prepare: (query, settings) => this.prepareSettings(query, settings),
        transform: resp => resp.suggestions
      }
    });
    address.initialize();

    this.addressAutocompleteInput
      .typeahead({
        minLength: this.config.autocompleteMinLength || 2,
        highlight: this.config.highlight || true
      }, {
        name: 'address',
        displayKey: 'value',
        source: address.ttAdapter()
      })
      .on('typeahead:selected', (obj, selected) => this.onAddressSelected(selected));

    this.el.find('.tt-menu').css('z-index', 200);
    super.afterRender();
  }

  get value() {
    return Object.assign(super.value[this.name] || super.value, { address: this.addressAutocompleteInput.typeahead('val') });
  }

  prepareSettings(query, settings) {
    settings = merge({
      type: 'POST',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        query: query || '',
        count: 20,
        locations: []
      }
    }, settings, this.config.settings);

    settings.url = `${settings.url}?regions=${settings.data.locations.join(',')}&q=${query}`;
    settings.data.locations = settings.data.locations.map(region => ({ region }));
    settings.data = JSON.stringify(settings.data);

    return settings;
  }

  onAddressSelected(selected) {
    selected = selected || {};
    selected.data = selected.data || {};

    this.setAddressPartValue('house', selected.data.house);
    this.setAddressPartValue('block', selected.data.block);
    this.setAddressPartValue('flat', selected.data.flat);

    const autocompleteValue = compact([
      this.formatCity(selected.data),
      selected.data.street_with_type || ''
    ])
      .join(', ');

    this.addressAutocompleteInput.typeahead('val', autocompleteValue);
    this.addressAutocompleteInput.val(autocompleteValue);
  }

  formatCity(addressData) {
    return flow(
      pickBy((data, key) => {
        return data && (['area_with_type', 'city_with_type', 'settlement_with_type'].includes(key) ||
          'region_with_type' === key && data !== addressData.city_with_type);
      }),
      toArray,
      join(', ')
    )(addressData);
  }

  setAddressPartValue(fieldName, value) {
    const field = this.getItemByName(fieldName);

    if (!field) {
      return;
    }
    field.value = value;
  }
}

Factory.register('address', Address);
