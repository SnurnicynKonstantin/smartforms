import isString from 'lodash/isString';
import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';

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
  const fieldsetBlocks = [
    'address'
  ];

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

export default {
  createFormConfig(config) {
    const finalConfig = cloneDeep(config);

    finalConfig.form = formatFormFieldsItemsToArray(finalConfig.form);
    finalConfig.items = configureFormItemsBySchema(finalConfig.schema, finalConfig);

    return finalConfig;
  },

  createModalConfig(config) {
    const finalConfig = cloneDeep(config);
    const bodyJsonWithFormatedForm = finalConfig.body;
    const footerJsonWithFormattedForm = finalConfig.footer;

    bodyJsonWithFormatedForm.form = formatFormFieldsItemsToArray(finalConfig.body.form);
    finalConfig.body = configureFormItemsBySchema(finalConfig.body.schema, bodyJsonWithFormatedForm);
    footerJsonWithFormattedForm.form = formatFormFieldsItemsToArray(finalConfig.footer.form);
    finalConfig.footer = configureFormItemsBySchema(finalConfig.footer.schema, footerJsonWithFormattedForm);

    return finalConfig;
  }
};
