// docsSidebars.js

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const docsSidebars = {
  docs: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Tokens',
      items: [
        'Tokens/calculation-tokens',
        'Tokens/submit-form-tokens',
      ],
    },
    // Add more categories or individual documents here
  ],
};

module.exports = docsSidebars;