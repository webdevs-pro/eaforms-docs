// tutorialsSidebars.js

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const tutorialsSidebars = {
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
      type: 'category',
      label: 'Tutorials',
      items: [
        'Tutorials/multi-step-forms',
      ],
    },
    // Add more tutorials here as needed
  ],
};

module.exports = tutorialsSidebars;