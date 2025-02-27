// sidebars.js

const sidebars = {
  // Docs sidebar (manually organized)
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
  
  // Tutorials sidebar (manually organized)
  tutorials: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'install',
      label: 'Installation',
    },
    {
      type: 'doc',
      id: 'multi-step-forms',
      label: 'Multi-step Forms',
    },
    // Add more categories or individual tutorials here
  ],
};

module.exports = sidebars;