import isString from 'lodash/isString';
import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';

const fieldsetBlocks = [
  'address'
];

/**
 * getItems - function which configures items array for final config
 * @param  {object} config - form configuration object
 * @param  {object} form - form section of config with items as array
 * @return {array} configured items array
 */
function getItems(config, form) {
  if (Array.isArray(config.schema)) {
    return configureFormItemsBySchema(config.schema, config);
  }

  return configureFormItemsWithoutSchema(form);
}

/**
 * formatFormFieldsItemsToArray - function check all cases in form config section and change items to array if it's
 * not an array and add key as name of array item
 * @param  {object} form - form section of json
 * @return {object} finalForm - new form config which include items as array
 */
function formatFormFieldsItemsToArray(form) {
  const finalForm = cloneDeep(form);

  Object.keys(finalForm)
    .filter(key => finalForm[key].items && !Array.isArray(finalForm[key].items))
    .forEach(key => {
      finalForm[key].items = map(finalForm[key].items, (item, name) => Object.assign({ name }, item));
    });

  return finalForm;
}

/**
 * configureFormItemsBySchema - function which check all items in schema and add items from form section to final config
 * @param  {object} items - schema section of json
 * @param  {object} config - schema section of json or container items array
 * @return {array} items for form creation
 */
function configureFormItemsBySchema(items, config) {
  return items.reduce((acc, containerItem) => {
    const formItem = config.form[containerItem];

    if (isString(containerItem)) {
      if (!formItem) {
        return acc;
      }

      acc.push(!fieldsetBlocks.includes(formItem.block)
        ? Object.assign({ name: containerItem }, formItem)
        : formItem);

      return acc;
    }

    containerItem.items = containerItem.items && configureFormItemsBySchema(containerItem.items, config);

    acc.push(containerItem);

    return acc;
  }, []);
}

/**
 * configureFormItemsWithoutSchema - function which add all items from form section to final config
 * @param  {object} form - form section of json
 * @return {array} items for form creation
 */
function configureFormItemsWithoutSchema(form) {
  return map(form, (item, name) => !fieldsetBlocks.includes(item.block)
    ? Object.assign({ name }, item)
    : item
  );
}

export default {
  createFormConfig(config) {
    const finalConfig = cloneDeep(config);

    finalConfig.form = formatFormFieldsItemsToArray(finalConfig.form);
    finalConfig.items = getItems(finalConfig, finalConfig.form);

    return finalConfig;
  },

  createModalConfig(config) {
    const finalConfig = cloneDeep(config);

    // allow users to create modal configuration without footer
    finalConfig.footer = Object.assign({ form: {}, schema: [] }, finalConfig.footer);

    const bodyJsonWithFormatedForm = finalConfig.body;
    const footerJsonWithFormattedForm = finalConfig.footer;

    bodyJsonWithFormatedForm.form = formatFormFieldsItemsToArray(finalConfig.body.form);
    finalConfig.body = getItems(finalConfig.body, bodyJsonWithFormatedForm.form);

    footerJsonWithFormattedForm.form = formatFormFieldsItemsToArray(finalConfig.footer.form);
    finalConfig.footer = getItems(finalConfig.footer, footerJsonWithFormattedForm.form);

    return finalConfig;
  },

  createListModalConfig(config) {
    const finalConfig = cloneDeep(config);

    finalConfig.items = finalConfig.modals.map(modal => this.createModalConfig(modal).body);

    return finalConfig;
  }
};
